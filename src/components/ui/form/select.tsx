import type { SelectHTMLAttributes } from "@builder.io/qwik"
import { component$, Slot, useSignal } from "@builder.io/qwik"
import { cn, randomString } from "~/components/utils/utils"
import { LuChevronDown } from "@qwikest/icons/lucide"
import type { JSX } from "@builder.io/qwik/jsx-runtime"
import { Label } from "~/components/ui/form/label"

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
    error?: JSX.ElementType
    label?: JSX.ElementType
    required?: boolean
}

/**
 * @author Tom Stejskal
 */
export const Select = component$<SelectProps>(
    ({ label, error, required, class: className, ...props }) => {
        const id = useSignal(randomString)
        return (
            <div class={"flex w-full flex-col items-stretch"}>
                {label && (
                    <Label for={id.value} required={required}>
                        {label}
                    </Label>
                )}
                <div class={"relative"}>
                    <select
                        id={id.value}
                        class={cn(
                            "flex h-9 w-full px-3 py-1 text-sm",
                            "rounded-md border border-input",
                            "bg-transparent shadow-sm transition-colors placeholder:text-muted-foreground",
                            "file:border-0 file:bg-transparent file:text-sm file:font-medium",
                            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                            "disabled:cursor-not-allowed disabled:opacity-50",
                            "appearance-none",
                            className
                        )}
                        {...props}
                    >
                        <Slot />
                    </select>
                    <LuChevronDown class={"absolute right-3 top-2.5 -z-10"} />
                </div>
                <p class={"mb-2 mt-1 text-xs text-red-500"}>{error}</p>
            </div>
        )
    }
)
