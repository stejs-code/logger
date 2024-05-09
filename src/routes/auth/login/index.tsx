import {component$, useTask$} from "@builder.io/qwik"
import type {RequestHandler} from "@builder.io/qwik-city"
import {Form, routeAction$, useLocation, useNavigate,} from "@builder.io/qwik-city"
import {TextInput} from "~/components/ui/form/textInput"
import {Button} from "~/components/ui/button"
import {Context, index} from "~/app/context"
import {addOneDay} from "~/components/utils/utils"
import {isDev} from "@builder.io/qwik/build"
import {postSession} from "~/app/session";
import {z} from "zod";
import type {User} from "~/app/user/main";
import {Encrypt} from "~/app/user/main";

export default component$(() => {
    const action = useAuthSignIn()
    const navigate = useNavigate()
    const location = useLocation()

    useTask$(({track}) => {
        track(() => action.value?.status)
        if (action.value?.status === "success") {
            navigate(new URL(location.url).searchParams.get("next") || "/")
        }
    })

    return (
        <Form action={action} class="m-auto w-full max-w-2xl px-4 lg:mt-8">
            <h1 class="mb-6 mt-4 scroll-m-20 text-3xl font-extrabold tracking-normal lg:text-4xl">
                Login
            </h1>
            <TextInput
                name={"name"}
                error={
                    action.value?.status === "fail" ? action.value.message : ""
                }
                label={"Name"}
            />
            <TextInput
                type={"password"}
                name={"password"}
                error={
                    action.value?.status === "fail" ? action.value.message : ""
                }
                label={"Password"}
            />
            <Button type={"submit"}>Login</Button>
        </Form>
    )
})

export const onGet: RequestHandler = (ev) => {
    if (ev.sharedMap.get("session")) {
        throw ev.redirect(307, "/")
    }
}

export const useAuthSignIn = routeAction$(async (data, event) => {
    const ctx = new Context(event)
    const {elastic} = ctx

    const result = z.object({
        name: z.string(),
        password: z.string()
    }).safeParse(data)

    if (!result.success) {
        console.log(result.error)
        return {
            status: "fail",
            message: ":(",
        }
    }

    const response = await elastic.search<User>({
        index: index("log-user"),
        query: {
            term: {"name.keyword": result.data.name}
        },
    })

    if (response.hits.hits.length === 0)
        return {
            status: "fail",
            message: "Not found",
        }

    const user = {
        ...response.hits.hits[0]._source as User,
        id: response.hits.hits[0]._id
    }

    if (!user.password || !(await Encrypt.comparePassword(result.data.password, user.password))) {
        return {
            status: "fail",
            message: "Wrong password",
        }
    }

    const session = await postSession(ctx, {
        user: {
            ...user,
            password: "**secret**",
        },
    })

    event.cookie.set("session", session.id, {
        expires: addOneDay(),
        secure: !isDev,
        path: "/",
    })

    return {
        status: "success",
    }
})
