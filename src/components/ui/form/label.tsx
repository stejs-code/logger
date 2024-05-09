import type { LabelHTMLAttributes } from "@builder.io/qwik"
import { component$, Slot } from "@builder.io/qwik"
import { cn } from "~/components/utils/utils"

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
    required?: boolean
    for: string
}

/**
 * @author Tom Stejskal
 */
export const Label = component$<LabelProps>(
    ({ required, class: className, ...props }) => {
        return (
            <label
                class={cn("mb-1 text-sm dark:text-gray-300", className)}
                {...props}
            >
                <Slot />: {required && <span class={"text-red-500"}>*</span>}
            </label>
        )
    }
)
