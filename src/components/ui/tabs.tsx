import { component$, type Signal } from "@builder.io/qwik"
import { cn } from "~/components/utils/utils"

type Props<Tab extends { name: string; label: string }> = {
    class?: string
    selected: Signal<Tab["name"]>
    tabs: Tab[]
}

export const Tabs = component$(
    <T extends { name: string; label: string }>({
        class: className,
        selected,
        tabs,
    }: Props<T>) => {
        return (
            <div class={cn("box-border flex w-full border-b", className)}>
                {tabs.map((i) => (
                    <button
                        type="button"
                        key={i.name}
                        class={cn(
                            "translate-y-[1px] border-b transition-colors hover:border-primary/75",
                            "px-4 py-2",
                            selected.value === i.name && "!border-primary"
                        )}
                        onClick$={() => (selected.value = i.name)}
                    >
                        {i.label}
                    </button>
                ))}
            </div>
        )
    }
)
