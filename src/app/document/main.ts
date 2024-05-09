import { z } from "zod"

export const zLevel = z.union([
    z.literal("log"),
    z.literal("notice"),
    z.literal("warn"),
    z.literal("error"),
])

export const zDocument = z.object({
    id: z.string(),
    locator: z.string().optional(),
    level: zLevel.default("log"),
    app: z.string(),
    time: z.date().optional(),
    data: z.record(z.string(), z.any()),
})

export type Document = z.infer<typeof zDocument>
