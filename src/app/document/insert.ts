import type { Context } from "~/app/context"
import { index } from "~/app/context"
import type { Document } from "~/app/document/main"
import { zDocument } from "~/app/document/main"
import { defer } from "~/components/utils/utils"
import { ZodError } from "zod"

export function insert(
    ctx: Context,
    app: string,
    docs: Omit<Document, "id" | "app">[]
) {
    try {
        const documents = docs.map((i) =>
            zDocument.parse({
                ...i,
                app: app,
                time: i.time ?? new Date(),
                id: app + "-" + crypto.randomUUID(),
            })
        )

        defer(async () => {
            try {
                await ctx.elastic.bulk({
                    operations: documents.flatMap((i) => [
                        {
                            index: {
                                _index: index("log-document"),
                                _id: i.id,
                            },
                        },
                        {
                            ...i,
                            id: undefined,
                        },
                    ]),
                })
            } catch (e) {
                console.log(e)
            }
        })
        return { success: true as const }
    } catch (e) {
        if (e instanceof ZodError) {
            return {
                success: false as const,
                location: "insert",
                message: e.message,
            }
        }

        if (e instanceof Error) {
            return { success: false as const, message: e.message }
        }

        return { success: false as const, message: "unknown" }
    }
}
