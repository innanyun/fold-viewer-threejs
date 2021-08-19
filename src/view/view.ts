import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import { specifyMotion } from 'view/mesh_motion'

import { ViewOptions } from 'view/config'
import { initDatGUI } from 'system/debug'


export class View {
  private _container: HTMLElement

  private _scene: THREE.Scene
  private _camera: THREE.PerspectiveCamera
  private _renderer: THREE.Renderer
  private _mesh: THREE.Object3D
  // private _controls: OrbitControls

  constructor(options: ViewOptions, sheetMesh: THREE.Object3D) {
    this._container = options.dom

    const
      width = this._container.offsetWidth,
      height = this._container.offsetHeight

    this._scene = new THREE.Scene()

    this._camera = new THREE.PerspectiveCamera(
      options.fov,    // field of view
      width / height, // aspect ratio
      options.near,   // near plane of viewing frustum
      options.far     // far plane of viewing frustum
    )
    this._camera.position.z = 5

    let light = new THREE.PointLight(0xffffff)
    light.position.set(-10, 40, 10)
    this._scene.add(light)

    this._scene.background = new THREE.Color(options.backgroundColor)

    this.setMesh(this._mesh = sheetMesh)

    this._renderer = new THREE.WebGLRenderer()
    this._renderer.setSize(width, height)
    this._container.appendChild(this._renderer.domElement)

    /* this._controls =  */new OrbitControls(this._camera, this._renderer.domElement)

    this.initView(options)
  }

  private initView(options: ViewOptions): void {
    this.resize()
    this.setupResize()

    options.debug && this.initDebugAssets()

    // specifyMotion(this._mesh)
  }

  setMesh(sheetMesh: THREE.Object3D): void {

    const removeMesh = (mesh: THREE.Object3D): void => {
      // TODO: dispose `mesh`
      this._scene.remove(mesh)
    }

    this._mesh && removeMesh(this._mesh)
    this._scene.add(this._mesh = sheetMesh)
  }

  private setupResize(): void {
    window.addEventListener('resize', this.resize.bind(this))
  }

  private resize(_?: Event): void {
    const newWidth = this._container.offsetWidth,
      newHeight = this._container.offsetHeight

    this._renderer.setSize(newWidth, newHeight)

    this._camera.aspect = newWidth / newHeight
    this._camera.updateProjectionMatrix()

    this.render()
  }

  private render(): void {
    this._renderer.render(this._scene, this._camera)
    window.requestAnimationFrame(this.render.bind(this))
  }

  private initDebugAssets() {
    initDatGUI(this._scene, this._mesh, this._camera)
    this._scene.add(new THREE.AxesHelper())
  }

}
