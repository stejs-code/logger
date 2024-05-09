import type { RequestHandler } from "@builder.io/qwik-city"
import { Context } from "~/app/context"
import { deleteSession } from "~/app/session"

export const onRequest: RequestHandler = async (event) => {
    const ctx = new Context(event)

    const session = event.sharedMap.get("session")
    if (session) {
        event.cookie.delete("session", { path: "/" })

        await deleteSession(ctx, session.id)
    }

    throw event.redirect(302, "/auth/login")
}
