import * as dat from 'dat.gui'

import { SHEET_OPTIONS, RENDER_OPTIONS } from './config'


export function initDatGUI (scene, mesh, camera) {
  const
    gui = new dat.GUI({name: 'FOLD viewer'}),
    sheetOptions = gui.addFolder('Sheet'),
    renderOptions = gui.addFolder('Render')

  sheetOptions.addColor(SHEET_OPTIONS, 'color').onChange(
    newColor => mesh.material.color.set(newColor)
  )
  sheetOptions.open()

  renderOptions.addColor(RENDER_OPTIONS, 'backgroundColor').onChange(
    newColor => scene.background.set(newColor)
  )
  renderOptions.add(camera.position, 'z').min(5).max(30).step(5).listen()
  // renderOptions.add(camera, 'fov').min(0).max(125).step(25).listen()
  renderOptions.add(mesh.material, 'wireframe').listen()
  renderOptions.open()
}
