export function tintBackground(hex: string, alpha: number = 0.08): string {
  return `color-mix(in oklch, ${hex} ${alpha * 100}%, var(--cream))`
}

export function tintBorder(hex: string, alpha: number = 0.15): string {
  return `color-mix(in oklch, ${hex} ${alpha * 100}%, var(--cream))`
}
