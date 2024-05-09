import { component$, useComputed$ } from "@builder.io/qwik"
import type { InputProps } from "./textInput"
import { TextInput } from "./textInput"

export type TimeInputProps = Omit<InputProps, "value"> & {
    value?: number | Date
}

export const TimeInput = component$<TimeInputProps>(({ value, ...props }) => {
    const input = useComputed$(() => {
        return value &&
            !Number.isNaN(
                typeof value === "number" ? value : new Date(value).getTime()
            )
            ? new Date(value).toISOString().split("T")[1].slice(0, 5)
            : undefined
    })

    return <TextInput type="time" value={input.value} {...props} />
})
