import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// import { specifyMotion } from 'view/mesh_motion'

import { ViewOptions } from 'view/config'
import { initDatGUI, bindSheetOptionsControllers,
  SheetOptionsControllers } from 'system/debug'


export class View {
  private _container: HTMLElement
  private _scene: THREE.Scene
  private _mesh: THREE.Object3D
  // @ts-expect-error
  private _camera: THREE.PerspectiveCamera
  // @ts-expect-error
  private _renderer: THREE.Renderer
  // @ts-expect-error
  private _controls: OrbitControls
  // @ts-expect-error
  private _sheetOptionsControllers: SheetOptionsControllers

  constructor(options: ViewOptions, sheetMesh: THREE.Object3D) {
    this._setupEnvironment(
      (this._scene = new THREE.Scene()),
      (this._container = options.dom),
      options
    )
    this._setupControls()
    this._setupView(options)
    this.setMesh((this._mesh = sheetMesh), options.debug)
  }

  private _setupEnvironment(
    scene: THREE.Scene,
    container: HTMLElement,
    options: ViewOptions
  ) {
    const
      setupCamera = (): void => {
        this._camera = new THREE.PerspectiveCamera(
          options.fov,
          this._container.offsetWidth / this._container.offsetHeight,
          options.near,
          options.far
        )
        this._camera.position.z = 5
      },
      setupLights = (scene: THREE.Scene): void => {
        let light = new THREE.PointLight(0xffffff)
        light.position.set(-10, 40, 10)
        scene.add(light)
      },
      setupRenderer = (container: HTMLElement): void => {
        this._renderer = new THREE.WebGLRenderer()
        this._renderer.setSize(container.offsetWidth, container.offsetHeight)
        container.appendChild(this._renderer.domElement)
      },
      setupBackground = (scene: THREE.Scene): void => {
        scene.background = new THREE.Color(options.backgroundColor)
      }

    setupCamera()
    setupLights(scene)
    setupRenderer(container)
    setupBackground(scene)
  }

  private _setupView(options: ViewOptions): void {
    this._resize()
    this._setupResize()

    options.debug && this._initDebugAssets()
  }

  setMesh(sheetMesh: THREE.Object3D, debug: boolean = true): void {
    const removeMesh = (mesh: THREE.Object3D): void => {
      // TODO: dispose `mesh`
      this._scene.remove(mesh)
    }

    this._mesh && removeMesh(this._mesh)
    this._scene.add((this._mesh = sheetMesh))

    debug &&
      bindSheetOptionsControllers(this._sheetOptionsControllers, this._mesh)
  }

  private _setupControls() {
    this._controls = new OrbitControls(this._camera, this._renderer.domElement)
    this._controls.enableDamping = true
    this._controls.dampingFactor = 0.05

    // specifyMotion(this._mesh)
  }

  private _setupResize(): void {
    window.addEventListener("resize", this._resize.bind(this))
  }

  private _resize(_?: Event): void {
    const
      newWidth = this._container.offsetWidth,
      newHeight = this._container.offsetHeight

    this._renderer.setSize(newWidth, newHeight)

    this._camera.aspect = newWidth / newHeight
    this._camera.updateProjectionMatrix()

    this._render()
  }

  private _render(): void {
    this._renderer.render(this._scene, this._camera)
    window.requestAnimationFrame(this._render.bind(this))

    this._controls.update()
  }

  private _initDebugAssets() {
    this._sheetOptionsControllers = initDatGUI(this._scene, this._camera)
    this._scene.add(new THREE.AxesHelper())
  }

}
