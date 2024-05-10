import type { Context } from "~/app/context"
import { index } from "~/app/context"
import { ZodError } from "zod"
import type { User } from "~/app/user/main"
import { zUser } from "~/app/user/main"

export async function getUserByApiKey(ctx: Context, api_key: string) {
    try {
        const response = await ctx.elastic.search({
            index: index("log-user"),
            query: {
                term: {
                    api_key: api_key,
                },
            },
        })

        if (!response.hits.hits.length) {
            return { success: false as const, message: "Not found" }
        }

        return {
            ...zUser.parse({
                ...(response.hits.hits[0]._source as User),
                id: response.hits.hits[0]._id,
            }),
            success: true as const,
        }
    } catch (e) {
        console.log(e)
        if (e instanceof ZodError) {
            return {
                success: false as const,
                location: "authentication",
                message: e.format()._errors.join("; "),
            }
        }

        if (e instanceof Error) {
            return { success: false as const, message: e.message }
        }

        return { success: false as const, message: "unknown" }
    }
}
