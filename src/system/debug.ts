import * as THREE from 'three'
import * as dat from 'dat.gui'

import { SHEET_OPTIONS } from 'sheet/config'
import { VIEW_OPTIONS } from 'view/config'


export function initDatGUI(
  scene: THREE.Scene, mesh: THREE.Object3D, camera: THREE.Camera
): void
{
  let
    gui = new dat.GUI({name: 'FOLD viewer'}),
    sheetOptions = gui.addFolder('Sheet'),
    renderOptions = gui.addFolder('Render')

  sheetOptions.addColor(SHEET_OPTIONS, 'color').onChange(
    (newColor: string | THREE.Color) => updateSheetColor(mesh)(newColor)
  )
  sheetOptions.open()

  renderOptions.addColor(VIEW_OPTIONS, 'backgroundColor').onChange(
    newColor => (scene.background as THREE.Color).set(newColor)
  )
  renderOptions.add(camera.position, 'z').min(5).max(30).step(5).listen()
  renderOptions.add(camera, 'fov').min(0).max(125).step(25).listen()
  // renderOptions.add(mesh.material, 'wireframe').listen()
  renderOptions.open()
}


const updateSheetColor = (s: THREE.Object3D) =>
  (newColor: string | THREE.Color): void => {
    s.traverse((mesh: THREE.Object3D) => {
      if (mesh instanceof THREE.Mesh) {
        mesh.material.color.set(newColor)
      }
    })
  }
