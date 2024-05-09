import type { Signal } from "@builder.io/qwik"
import { isSignal } from "@builder.io/qwik"
import { twMerge } from "tailwind-merge"
import { type ClassValue, clsx } from "clsx"

export function deSignalize<T>(val: T | Signal<T>) {
    return isSignal(val) ? val.value : val
}

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const isBlob = (input: unknown) => input instanceof Blob

export function addOneDay(date = new Date()) {
    date.setDate(date.getDate() + 1)

    return date
}

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export function pick<T, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> {
    const ret: any = {}
    keys.forEach((key) => {
        ret[key] = obj[key]
    })
    return ret
}

export const defer = (func: () => void) => {
    setTimeout(() => {
        func()
    }, 1)
}

export function randomString(length: number = 6) {
    let result = ""
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    const charactersLength = characters.length
    let counter = 0
    while (counter < length) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        )
        counter += 1
    }
    return result
}
