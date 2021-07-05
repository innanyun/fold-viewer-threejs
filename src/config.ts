export interface SheetOptions {
  color: string | number
}


export interface RenderOptions {
  backgroundColor: string | number,
  fov: number,
  near: number,
  far: number
}


export const

  SHEET_OPTIONS: SheetOptions = {
    color: 0x00ff00
  },

  RENDER_OPTIONS: RenderOptions = {
    // Scene
    backgroundColor: '#ceedce',
    // Camera
    fov: 75,    // field of view
    near: 0.1,  // near plane of viewing frustum
    far: 1000   // far plane of viewing frustum
  }
