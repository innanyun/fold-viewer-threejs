import { ColorSpec } from 'types'


interface SheetOptions {
  scale: number
  opacity: number
  frontColor: ColorSpec
  backColor: ColorSpec
  edgeColor: ColorSpec
  edgeWidth: number
  wireframe: boolean
}


const SHEET_OPTIONS: SheetOptions = {
  scale: 2,
  opacity: 0.7,
  frontColor: 0xffff00,
  backColor: 0x00ffff,
  edgeColor: 0x0000ff,
  edgeWidth: 0.002,
  wireframe: false
}


export type { SheetOptions }
export { SHEET_OPTIONS }
