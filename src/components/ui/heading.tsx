import { component$, Slot } from "@builder.io/qwik"
import { cn } from "~/components/utils/utils"

export const H1 = component$<{ class?: string }>(({ class: className }) => {
    return (
        <h1
            class={cn(
                "scroll-m-20 text-3xl font-extrabold tracking-normal lg:text-4xl",
                className
            )}
        >
            <Slot />
        </h1>
    )
})

export const H2 = component$<{ class?: string }>(({ class: className }) => {
    return (
        <h1
            class={cn(
                "mb-2 scroll-m-12 text-2xl font-extrabold tracking-normal",
                className
            )}
        >
            <Slot />
        </h1>
    )
})
