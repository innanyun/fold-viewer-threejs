import * as dat from 'dat.gui'

import { SHEET_OPTIONS, RENDER_OPTIONS } from './config'


export function initDatGUI (
  scene: THREE.Scene, mesh: THREE.Mesh, camera: THREE.Camera
): void
{
  let
    gui: dat.GUI = new dat.GUI({name: 'FOLD viewer'}),
    sheetOptions: dat.GUI = gui.addFolder('Sheet'),
    renderOptions: dat.GUI = gui.addFolder('Render')

  sheetOptions.addColor(SHEET_OPTIONS, 'color').onChange(
    newColor => (mesh.material as THREE.MeshStandardMaterial).color.set(
      newColor
    )
  )
  sheetOptions.open()

  renderOptions.addColor(RENDER_OPTIONS, 'backgroundColor').onChange(
    newColor => (scene.background as THREE.Color).set(newColor)
  )
  renderOptions.add(camera.position, 'z').min(5).max(30).step(5).listen()
  // renderOptions.add(camera, 'fov').min(0).max(125).step(25).listen()
  renderOptions.add(mesh.material, 'wireframe').listen()
  renderOptions.open()
}
