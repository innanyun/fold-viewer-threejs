import { ColorSpec } from 'types'


interface SheetOptions {
  scale: number
  opacity: number
  frontColor: ColorSpec
  backColor: ColorSpec
  edgeColor: ColorSpec
  edgeWidth: number
}


const SHEET_OPTIONS: SheetOptions = {
  scale: 2,
  opacity: 0.7,
  frontColor: 0x00ff00,
  backColor: 0xff00ff,
  edgeColor: 0x0000ff,
  edgeWidth: 0.002
}


export type { SheetOptions }
export { SHEET_OPTIONS }
