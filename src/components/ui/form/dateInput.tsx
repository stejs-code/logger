import { component$, useComputed$ } from "@builder.io/qwik"
import type { InputProps } from "./textInput"
import { TextInput } from "./textInput"

export type DateInputProps = Omit<InputProps, "value"> & {
    value?: number | Date
}

export const DateInput = component$<DateInputProps>(({ value, ...props }) => {
    const input = useComputed$(() => {
        return value &&
            !Number.isNaN(
                typeof value === "number" ? value : new Date(value).getTime()
            )
            ? new Date(value).toISOString().split("T")[0]
            : undefined
    })

    return <TextInput type="date" value={input.value} {...props} />
})
