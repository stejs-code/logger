import type { RequestEvent } from "@builder.io/qwik-city/middleware/request-handler"
import { getUserByApiKey } from "~/app/user/get"
import { Context } from "~/app/context"

export async function authenticate(ev: RequestEvent) {
    const key = ev.request.headers.get("Authorization")?.slice("Bearer ".length)

    if (!key)
        throw ev.json(401, {
            success: false as const,
            message: "Please provide Authorization header",
        })

    const user = await getUserByApiKey(new Context(ev), key)

    if (user.success) {
        ev.sharedMap.set("user", user)
        return user
    }

    throw ev.json(401, {
        success: false as const,
        message: "unknown api key",
    })
}
