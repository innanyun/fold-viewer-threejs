import { ColorSpec } from 'types'


interface ViewOptions {
  dom: HTMLElement
  // Scene
  backgroundColor: ColorSpec
  // Camera
  fov: number   // field of view
  near: number  // near plane of viewing frustum
  far: number   // far plane of viewing frustum
  // development
  debug: boolean     // `dat.GUI`
  axesHelper: boolean// `AxesHelper`
}


const VIEW_OPTIONS: ViewOptions = {
  dom: document.getElementById('container') as HTMLElement,
  // Scene
  backgroundColor: '#ceedce',
  // Camera
  fov: 75,
  near: 0.1,
  far: 1000,
  // development
  debug: true,
  axesHelper: true
}


export type { ViewOptions }
export { VIEW_OPTIONS }
