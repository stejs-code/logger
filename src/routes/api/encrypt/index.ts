import type {RequestHandler} from "@builder.io/qwik-city"
import {authenticate} from "~/app/authenticate"
import {Encrypt} from "~/app/user/main";

export const onPost: RequestHandler = async (ev) => {
    await authenticate(ev)

    ev.json(200, {
        encrypted: await Encrypt.cryptPassword(await ev.request.text())
    })
}
