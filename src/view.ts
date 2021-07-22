import * as THREE from 'three'

import { SquareSheet } from './sheet'
import { createSheetGeometry } from './sheet_geometry'
import { specifySheetMotion } from './sheet_motion'

import { SHEET_OPTIONS, ViewOptions } from './config'

import { initDatGUI } from './debug'


class View {

  private _container: HTMLElement
  private _width: number
  private _height: number

  private _scene: THREE.Scene
  private _camera: THREE.PerspectiveCamera
  private _renderer: THREE.Renderer
  private _mesh: THREE.Mesh

  constructor(options: ViewOptions) {

    this._container = options.dom
    this._width = this._container.offsetWidth
    this._height = this._container.offsetHeight

    this._scene = new THREE.Scene()

    this._camera = new THREE.PerspectiveCamera(
      options.fov,  // field of view
      this._width / this._height,  // aspect ratio
      options.near,  // near plane of viewing frustum
      options.far    // far plane of viewing frustum
    )
    this._camera.position.z = 5

    this._mesh = new THREE.Mesh(
      createSheetGeometry(new SquareSheet(SHEET_OPTIONS.size)),
      new THREE.MeshStandardMaterial(
        { color: SHEET_OPTIONS.color, side: THREE.DoubleSide }
      )
    )

    let light = new THREE.PointLight(0xffffff)
    light.position.set(-10, 40, 10)

    this._scene.background = new THREE.Color(options.backgroundColor)
    this._scene.add(this._mesh)
    this._scene.add(light)

    this._scene.add(new THREE.AxesHelper())

    this._renderer = new THREE.WebGLRenderer()
    this._renderer.setSize(this._width, this._height)
    this._container.appendChild(this._renderer.domElement)

    this.initScene()
  }

  render () {
    this._renderer.render(this._scene, this._camera)
    window.requestAnimationFrame(this.render.bind(this))
  }

  initScene() {
    // this.setupScene(sceneBuilder);
    // this.render();
    this.resize()
    this.setupResize()

    initDatGUI(this._scene, this._mesh, this._camera)

    specifySheetMotion(this._mesh)
  }

  setupResize() {
    window.addEventListener("resize", this.resize.bind(this));
  }

  resize(_?: Event): void {
    this._width = this._container.offsetWidth;
    this._height = this._container.offsetHeight;

    this._renderer.setSize(this._width, this._height)

    this._camera.aspect = this._width / this._height
    this._camera.updateProjectionMatrix()
    this.render()
  }

}


export { View }
