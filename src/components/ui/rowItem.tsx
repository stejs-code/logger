import { component$ } from "@builder.io/qwik"
import type { JSX } from "@builder.io/qwik/jsx-runtime"

export const RowItem = component$<{ title: string; data: JSX.Element }>(
    ({ title, data }) => {
        return (
            <li>
                <span class={"text-slate-500"}>{title}:</span> {data}
            </li>
        )
    }
)
