import type {InputHTMLAttributes, QRL} from "@builder.io/qwik"
import {component$, useSignal, useTask$} from "@builder.io/qwik"
import {cn, randomString} from "~/components/utils/utils"
import {LuCheck} from "@qwikest/icons/lucide"
import type {JSX} from "@builder.io/qwik/jsx-runtime"

export type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
    required?: boolean
    error?: string
    label?: JSX.ElementType
}

/**
 * @author Tom Stejskal
 */
export const Checkbox = component$<CheckboxProps>(
    ({
         required,
         class: className,
         error,
         label,
         onInput$,
         onChange$,
         onBlur$,
         checked,
         ...props
     }) => {
        const on = useSignal(!!checked)
        const id = useSignal(randomString)
        const ref = useSignal<HTMLInputElement>()

        useTask$(({track}) => {
            track(() => checked)
            if (checked !== undefined) on.value = checked
        })

        return (
            <div>
                <div
                    class={cn(
                        "mb-1 flex items-center gap-x-1 text-sm text-gray-800",
                        className
                    )}
                >
                    <input
                        type={"checkbox"}
                        class={"hidden"}
                        checked={on.value}
                        {...props}
                        ref={ref}
                    />
                    <button
                        type={"button"}
                        data-state={on.value ? "checked" : "unchecked"}
                        id={id.value}
                        onClick$={(event) => {
                            on.value = !on.value
                            if (ref.value) ref.value.checked = on.value
                            ;
                            (
                                [onChange$, onInput$]
                                    .flat()
                                    .filter((i) => !!i) as QRL<
                                    (e: Event, el: Element | undefined) => void
                                >[]
                            ).forEach((i) => i(event, ref.value))
                        }}
                        onBlur$={(event) => {
                            (
                                [onBlur$].flat().filter((i) => !!i) as QRL<
                                    (e: Event, el: Element | undefined) => void
                                >[]
                            ).forEach((i) => i(event, ref.value))
                        }}
                        class={cn(
                            "peer h-4 w-4 shrink-0",
                            "rounded-sm border border-primary bg-transparent shadow",
                            "transition-opacity duration-75",
                            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                            "disabled:cursor-not-allowed disabled:opacity-50",
                            "data-[state=checked]:bg-primary"
                        )}
                    >
                        <LuCheck
                            data-state={on.value ? "checked" : "unchecked"}
                            class={cn(
                                "scale-75 text-white",
                                "transition-opacity duration-75",
                                "opacity-0",
                                "data-[state=checked]:opacity-100"
                            )}
                        />
                    </button>
                    <label for={id.value} class={"dark:text-foreground"}>
                        {label}
                        {required && <span class={"text-red-500"}>*</span>}
                    </label>
                </div>
                <p class={"mb-2 mt-1 text-xs text-red-500"}>{error}</p>
            </div>
        )
    }
)
