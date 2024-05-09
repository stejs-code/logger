import { Context } from "~/app/context"
import type { RequestHandler } from "@builder.io/qwik-city"
import { routeLoader$ } from "@builder.io/qwik-city"
import type { Session } from "~/app/session"
import { deleteSession, getSession } from "~/app/session"
import { initializeRedisIfItIsUndefined } from "~/app/redis"

export const onRequest: RequestHandler = async (ev) => {
    // TODO: secured paths

    await initializeRedisIfItIsUndefined(ev.env)

    const ctx = new Context(ev)

    const sessionId = ev.cookie.get("session")?.value

    if (sessionId) {
        try {
            ev.sharedMap.set("session", await getSession(ctx, sessionId))
        } catch (e) {
            // Reset session
            console.log(`Forcing session reset, id: ${sessionId}`)

            await deleteSession(ctx, sessionId)
            ev.cookie.delete("session")
        }
    }
}

export const useAuthSession = routeLoader$(({ sharedMap }) => {
    return sharedMap.get("session") as Session | null
})