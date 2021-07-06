interface SheetOptions {
  size: number,
  color: string | number
}

const SHEET_OPTIONS: SheetOptions = {
    size: 2,
    color: 0x00ff00
  }


interface RenderOptions {
  backgroundColor: string | number,
  fov: number,
  near: number,
  far: number
}

const RENDER_OPTIONS: RenderOptions = {
    // Scene
    backgroundColor: '#ceedce',
    // Camera
    fov: 75,    // field of view
    near: 0.1,  // near plane of viewing frustum
    far: 1000   // far plane of viewing frustum
  }



export {
  SheetOptions, SHEET_OPTIONS,
  RenderOptions, RENDER_OPTIONS
}