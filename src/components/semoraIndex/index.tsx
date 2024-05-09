export const averageWage = 43_341

export function calculate(percentage: number, volume: number, price: number) {
    return ((volume * percentage) / 100 / price) * (averageWage / 40_000)
}
