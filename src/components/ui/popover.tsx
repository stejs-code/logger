import type { Signal } from "@builder.io/qwik"
import { component$, Slot } from "@builder.io/qwik"
import {
    Modal,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from "@qwik-ui/headless"
import { LuX } from "@qwikest/icons/lucide"
import { cn } from "~/components/utils/utils"

/**
 * @author Tom Stejskal
 */
export default component$<{ visible: Signal<boolean>; class?: string }>(
    ({ visible, class: className }) => {
        return (
            <Modal
                bind:show={visible}
                class={cn(
                    "popover-animation max-w-[25rem] rounded-lg border-0 bg-background text-foreground shadow-md",
                    "px-4 pb-6 pt-8",
                    "backdrop:backdrop-blur backdrop:backdrop-brightness-50",
                    "dark:backdrop:backdrop-brightness-100",
                    className
                )}
            >
                <button
                    onClick$={() => (visible.value = false)}
                    class="absolute right-4 top-4"
                >
                    <LuX />
                </button>
                <ModalHeader class={"px-6 text-center text-lg"}>
                    <Slot name={"header"} />
                </ModalHeader>
                <ModalContent class="mb-2 pb-4 pt-2 text-center text-slate-500">
                    <Slot name={"content"} />
                </ModalContent>
                <ModalFooter class="flex justify-center gap-4">
                    <Slot name={"footer"} />
                </ModalFooter>
            </Modal>
        )
    }
)
