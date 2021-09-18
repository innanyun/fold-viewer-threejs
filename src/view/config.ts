import { ColorSpec } from 'types'


interface ViewOptions {
  dom: HTMLElement
  // Scene
  backgroundColor: ColorSpec
  // Camera
  fov: number
  near: number
  far: number
  // development
  debug: boolean
}


const VIEW_OPTIONS: ViewOptions = {
  dom: document.getElementById('container') as HTMLElement,
  // Scene
  backgroundColor: '#ceedce',
  // Camera
  fov: 75,    // field of view
  near: 0.1,  // near plane of viewing frustum
  far: 1000,  // far plane of viewing frustum
  // development
  debug: true // `dat.GUI` & `AxesHelper`
}


export type { ViewOptions }
export { VIEW_OPTIONS }
