import { component$, type HTMLAttributes, Slot } from "@builder.io/qwik"
import { cn } from "~/components/utils/utils"

export const Table = component$<HTMLAttributes<HTMLTableElement>>(
    ({ class: className, ...props }) => {
        return (
            <div class={"overflow-x-scroll"}>
                <table class={cn("w-full max-w-full", className)} {...props}>
                    <Slot />
                </table>
            </div>
        )
    }
)

export const TableHead = component$<HTMLAttributes<HTMLTableSectionElement>>(
    ({ class: className, ...props }) => {
        return (
            <thead class={cn("text-slate-500", className)} {...props}>
                <Slot />
            </thead>
        )
    }
)

export const TableBody = component$<HTMLAttributes<HTMLTableSectionElement>>(
    ({ class: className, ...props }) => {
        return (
            <tbody class={cn("", className)} {...props}>
                <Slot />
            </tbody>
        )
    }
)

export const HeaderRow = component$<HTMLAttributes<HTMLTableRowElement>>(
    ({ class: className, ...props }) => {
        return (
            <tr
                class={cn(
                    "flex w-full items-center border-b border-slate-200 px-4 dark:border-slate-700",
                    className
                )}
                {...props}
            >
                <Slot />
            </tr>
        )
    }
)
export const Row = component$<HTMLAttributes<HTMLTableRowElement>>(
    ({ class: className, ...props }) => {
        return (
            <HeaderRow
                class={cn(
                    "transition-colors hover:bg-primary-foreground",
                    className
                )}
                {...props}
            >
                <Slot />
            </HeaderRow>
        )
    }
)

export const Th = component$<HTMLAttributes<HTMLTableCellElement>>(
    ({ class: className, ...props }) => {
        return (
            <th
                class={cn(
                    "px-2 py-2 text-left font-normal text-slate-400",
                    className
                )}
                {...props}
            >
                <Slot />
            </th>
        )
    }
)

export const Td = component$<HTMLAttributes<HTMLTableCellElement>>(
    ({ class: className, ...props }) => {
        return (
            <td class={cn("px-2 py-2", className)} {...props}>
                <Slot />
            </td>
        )
    }
)
