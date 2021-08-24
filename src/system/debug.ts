import * as THREE from 'three'
import * as dat from 'dat.gui'

import { SHEET_OPTIONS } from 'sheet/config'
import { VIEW_OPTIONS } from 'view/config'


export function initDatGUI(
  scene: THREE.Scene, sheetMesh: THREE.Object3D, camera: THREE.Camera
): void
{
  let
    gui = new dat.GUI({name: 'FOLD viewer'}),
    sheetOptions = gui.addFolder('Sheet'),
    renderOptions = gui.addFolder('Render')

  _setSheetOptions(sheetOptions, sheetMesh)
  _setRenderingOptions(renderOptions, scene, camera)
}


function _setSheetOptions(
  sheetOptions: dat.GUI, sheetMesh: THREE.Object3D
): void {

  function _updateSheetColor(sheetMesh: THREE.Object3D): Function {
    return function (newColor: string | THREE.Color): void {
      sheetMesh.traverse((mesh: THREE.Object3D) => {
        if (mesh instanceof THREE.Mesh) {
          mesh.material.color.set(newColor)
        }
      })
    }
  }

  sheetOptions
    .addColor(SHEET_OPTIONS, 'color')
    .onChange(newColor => _updateSheetColor(sheetMesh)(newColor))

  sheetOptions.open()
}


function _setRenderingOptions(
  renderOptions: dat.GUI, scene: THREE.Scene, camera: THREE.Camera
): void {

  renderOptions
    .addColor(VIEW_OPTIONS, 'backgroundColor')
    .onChange(newColor => (scene.background as THREE.Color).set(newColor))
  renderOptions.add(camera.position, 'z').min(5).max(30).step(5).listen()
  renderOptions.add(camera, 'fov').min(0).max(125).step(25).listen()
  // renderingOptionsGui.add(mesh.material, 'wireframe').listen()

  renderOptions.open()
}
