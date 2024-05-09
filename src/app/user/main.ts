import {z} from "zod"
import * as bcrypt from 'bcrypt';

export const zUser = z.object({
    id: z.string(),
    name: z.string(),
    api_key: z.string(),
    password: z.string().optional(),
})

export type User = z.infer<typeof zUser>

export const Encrypt = {
    cryptPassword: (password: string) =>
        bcrypt.genSalt(10)
            .then((salt => bcrypt.hash(password, salt)))
            .then(hash => hash),

    comparePassword: (password: string, hashPassword: string) =>
        bcrypt.compare(password, hashPassword)
            .then(resp => resp)

}