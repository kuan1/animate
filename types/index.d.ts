declare const animate: any

export type UnknowProps = Record<string, any>
export type NumberObj = Record<string, number>

export interface EasingFn {
  (percent: number, start: number, end: number): number
}
