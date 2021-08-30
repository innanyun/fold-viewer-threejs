export interface SheetOptions {
  scale: number
  opacity: number
  frontColor: ColorSpec
  backColor: ColorSpec
  edgeColor: ColorSpec
}

export const SHEET_OPTIONS: SheetOptions = {
  scale: 2,
  opacity: 0.5,
  frontColor: 0x00ff00,
  backColor: 0xff00ff,
  edgeColor: 0x0000ff
}
