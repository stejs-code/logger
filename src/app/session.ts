import { z } from "zod"
import type { Context } from "~/app/context"
import type { RequestHandler } from "@builder.io/qwik-city"
import { isDev } from "@builder.io/qwik/build"
import { zUser } from "~/app/user/main"
import { defer } from "~/components/utils/utils"

export const zSession = z.object({
    id: z.string().uuid(),
    user: zUser,
})

export type Session = z.infer<typeof zSession>

export async function getSession(
    { redis }: Context,
    id: string
): Promise<Partial<Session>> {
    const response = await redis.get(`log-session:${id}`)

    if (!response) throw new Error("Relace nenalezena")

    const untypedSession = JSON.parse(response)

    const parse = zSession.safeParse(untypedSession)

    if (!parse.success) {
        console.log(parse.error.errors)
        console.error(`Session with incorrect type, id: ${id}`)

        // It's already bad, but life goes on, so deal with it :(
        return untypedSession as Session
    }

    return parse.data
}

export async function postSession(ctx: Context, data: Partial<Session>) {
    const { redis } = ctx

    const previousDocument: Partial<Session> =
        data.id !== undefined ? await getSession(ctx, data.id) : {}
    const id = data.id ?? crypto.randomUUID()

    const session = {
        ...previousDocument,
        ...data,
        id: id,
    }

    await redis.set(
        `log-session:${id}`,
        JSON.stringify(session, null, isDev ? 4 : 0)
    )
    await redis.EXPIRE(`log-session:${id}`, 60 * 60 * 24, "NX")

    defer(async () => {
        if (data.user) {
            const response = await redis.get(`log-user-session:${data.user.id}`)

            await redis.set(
                `log-user-session:${data.user.id}`,
                JSON.stringify(
                    Array.from(
                        new Set([...(response ? JSON.parse(response) : []), id])
                    )
                )
            )
        }
    })

    return session
}

export async function deleteSession({ redis }: Context, id: string) {
    return await redis.del(`log-session:${id}`)
}

export const authenticateRoute: RequestHandler = (ev) => {
    if (!ev.sharedMap.get("session")) {
        throw ev.redirect(302, `/auth/login?next=${ev.url.pathname}`)
    }
}
