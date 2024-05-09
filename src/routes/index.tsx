import { component$ } from "@builder.io/qwik"
import type { DocumentHead } from "@builder.io/qwik-city"
import {authenticateRoute} from "~/app/session";

export default component$(() => {
    return ""
})

export const head: DocumentHead = {
    title: "Welcome to Qwik",
    meta: [
        {
            name: "description",
            content: "Qwik site description",
        },
    ],
}

export const onRequest = authenticateRoute
