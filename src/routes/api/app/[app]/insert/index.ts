import type { RequestHandler } from "@builder.io/qwik-city"
import { authenticate } from "~/app/authenticate"
import { Context } from "~/app/context"
import { z, ZodError } from "zod"
import { insert } from "~/app/document/insert"

export const onPost: RequestHandler = async (ev) => {
    await authenticate(ev)

    try {
        const ctx = new Context(ev)
        const body = z
            .array(z.any())
            .min(1)
            .parse(await ev.request.json())

        const app = ev.params.app

        const response = insert(ctx, app, body)

        if (response.success) {
            ev.json(200, response)
            return
        }

        ev.json(500, response)
    } catch (e) {
        console.log(e)
        if (e instanceof ZodError) {
            throw ev.json(400, {
                success: false,
                location: "body parsing",
                message: e.format()._errors.join("; "),
            })
        }

        if (e instanceof Error) {
            throw ev.json(500, { success: false, message: e.message })
        }

        throw ev.json(500, { success: false, message: "unknown" })
    }
}
