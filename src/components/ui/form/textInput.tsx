import type { QRL, Signal } from "@builder.io/qwik"
import { component$, useSignal } from "@builder.io/qwik"
import { cn, randomString } from "~/components/utils/utils"
import type { JSX } from "@builder.io/qwik/jsx-runtime"

export type InputProps = {
    error?: JSX.ElementType
    label?: JSX.ElementType
    required?: boolean
    ref?: QRL<(element: HTMLInputElement) => void>
    name: string
    type?: string
    placeholder?: string
    value?: string | null | undefined
    disabled?: boolean
    "bind:value"?: Signal<string>
    onInput$?: (event: Event, element: HTMLInputElement) => void
    onChange$?: (event: Event, element: HTMLInputElement) => void
    onBlur$?: (event: Event, element: HTMLInputElement) => void
    class?: string
}

/**
 * @author Tom Stejskal
 */
export const TextInput = component$<InputProps>(
    ({ error, label, required, class: className, ...props }) => {
        const id = useSignal(randomString)
        return (
            <div
                class={cn(
                    "flex w-full flex-col items-stretch text-sm",
                    className
                )}
            >
                {label && (
                    <label
                        class={"mb-1 text-gray-800 dark:text-slate-300"}
                        for={id.value}
                    >
                        {label}
                        {label === " " ? <span>&nbsp;</span> : ":"}{" "}
                        {required && <span class={"text-red-500"}>*</span>}
                    </label>
                )}
                <input
                    id={id.value}
                    class={cn(
                        "h-9 w-full px-3 py-1",
                        "rounded-md border border-input",
                        "bg-transparent shadow-sm transition-colors placeholder:text-muted-foreground",
                        "file:border-0 file:bg-transparent file:text-sm file:font-medium",
                        "disabled:cursor-not-allowed disabled:opacity-50",
                        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    )}
                    {...props}
                />
                <p class={"mb-2 mt-1 text-xs text-red-500"}>{error}</p>
            </div>
        )
    }
)
