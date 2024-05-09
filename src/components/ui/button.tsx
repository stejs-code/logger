import type { HTMLAttributes, PropsOf } from "@builder.io/qwik"
import { component$, Slot } from "@builder.io/qwik"
import { cva, type VariantProps } from "class-variance-authority"
import { Link } from "@builder.io/qwik-city"
import { cn } from "~/components/utils/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default:
                    "bg-primary text-primary-foreground shadow hover:bg-primary/90 dark:text-",
                destructive:
                    "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
                outline:
                    "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
                secondary:
                    "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                default: "h-9 px-4 py-2",
                sm: "h-8 rounded-md px-3 text-xs",
                lg: "h-10 rounded-md px-8",
                icon: "h-9 w-9",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export type ButtonProps = (
    | HTMLAttributes<HTMLButtonElement>
    | PropsOf<typeof Link>
) &
    VariantProps<typeof buttonVariants> & {
        href?: string
        disabled?: boolean
    }

/**
 * @author Tom Stejskal
 */
const Button = component$<ButtonProps>(
    ({ class: className, variant, size, ...props }) => {
        const Comp = props.href ? Link : "button"
        return (
            // @ts-expect-error
            <Comp
                class={cn(buttonVariants({ variant, size, className }))}
                {...props}
            >
                <Slot />
            </Comp>
        )
    }
)

export { Button, buttonVariants }
