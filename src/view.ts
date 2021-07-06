import * as THREE from 'three'

import { SquareSheet } from './sheet'
import { createSheetGeometry } from './sheet_geometry'
import { specifySheetMotion } from './sheet_motion'

import { SHEET_OPTIONS, RenderOptions, RENDER_OPTIONS } from './config'

import { initDatGUI } from './debug'


//
// Three.JS stuff
//


let
  scene: THREE.Scene,
  camera: THREE.Camera,
  renderer: THREE.Renderer,
  mesh: THREE.Mesh


function initScene ({fov, near, far}: RenderOptions) {
  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(
    fov,  // field of view
    window.innerWidth / window.innerHeight,  // aspect ratio
    near,  // near plane of viewing frustum
    far    // far plane of viewing frustum
  )
  camera.position.z = 5

  const
    geometry = createSheetGeometry(new SquareSheet(SHEET_OPTIONS.size)),
    material = new THREE.MeshStandardMaterial(
      { color: SHEET_OPTIONS.color, side: THREE.DoubleSide }
    )

  mesh = new THREE.Mesh(geometry, material)

  let light = new THREE.PointLight(0xffffff)
  light.position.set(-10, 40, 10)

  scene.background = new THREE.Color(RENDER_OPTIONS.backgroundColor)
  scene.add(mesh)
  scene.add(light)

  scene.add(new THREE.AxesHelper())

  renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)
}


function animateScene () {
  renderer.render(scene, camera)
  window.requestAnimationFrame(animateScene)
}


//
// window book-keeping
//


function onWindowLoad (_?: Event) {
  initScene(RENDER_OPTIONS)
  animateScene()
  onWindowResize()
  initDatGUI(scene, mesh, camera)
  specifySheetMotion(mesh)
}


function onWindowResize (_?: Event) {
  (camera as THREE.PerspectiveCamera).aspect =(
    window.innerWidth / window.innerHeight);
  (camera as THREE.PerspectiveCamera).updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}


//
// bind events to handlers
//


window.addEventListener('load', onWindowLoad)
window.addEventListener('resize', onWindowResize)
