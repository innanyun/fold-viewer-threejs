export interface ViewOptions {
  dom: HTMLElement
  backgroundColor: string | number
  fov: number
  near: number
  far: number
  debug: boolean
}


export const VIEW_OPTIONS: ViewOptions = {
  dom: document.getElementById('container')!,
  // Scene
  backgroundColor: '#ceedce',
  // Camera
  fov: 75,    // field of view
  near: 0.1,  // near plane of viewing frustum
  far: 1000,  // far plane of viewing frustum
  // development
  debug: true // `dat.GUI` & `AxesHelper`
}
