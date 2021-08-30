import * as THREE from 'three'
import { Wireframe } from 'three/examples/jsm/lines/Wireframe'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial'
import * as dat from 'dat.gui'

import { SHEET_OPTIONS } from 'sheet/config'
import { VIEW_OPTIONS } from 'view/config'


export function initDatGUI(
  scene: THREE.Scene, sheetMesh: THREE.Object3D, camera: THREE.PerspectiveCamera
): dat.GUI
{
  let
    gui = new dat.GUI({name: 'FOLD viewer'}),
    sheetOptions = gui.addFolder('Sheet'),
    renderOptions = gui.addFolder('Render')

  setSheetOptions(sheetOptions, sheetMesh)
  _setRenderingOptions(renderOptions, scene, camera)

  return sheetOptions
}


export function setSheetOptions(
  sheetOptions: dat.GUI,
  sheetMesh: THREE.Object3D
): void {

  const
    updateFacesColor = _updateSheetFacesColor(sheetMesh),
    updateEdgesColor = _updateSheetEdgesColor(sheetMesh),
    updateOpacity = _updateSheetOpacity(sheetMesh)

  sheetOptions.addColor(SHEET_OPTIONS, 'frontColor')
    .onChange(newColor => updateFacesColor(newColor))
  sheetOptions.addColor(SHEET_OPTIONS, 'backColor')
    .onChange(newColor => updateFacesColor(newColor))
  sheetOptions.addColor(SHEET_OPTIONS, 'edgeColor')
    .onChange(newColor => updateEdgesColor(newColor))
  sheetOptions.add(SHEET_OPTIONS, 'opacity', 0.1, 1.0, 0.1)
    .onChange(newOpacity => updateOpacity(newOpacity))

  sheetOptions.open()
}


const
  _isEdge = (mesh: THREE.Object3D): boolean => mesh instanceof Wireframe,
  _isFace = (mesh: THREE.Object3D): boolean => mesh instanceof THREE.Mesh &&
    !_isEdge(mesh)


function _updateSheetFacesColor(sheetMesh: THREE.Object3D): Function {
  return function (newColor: ColorSpec | THREE.Color): void {
    sheetMesh.traverse(mesh => {
      if (_isFace(mesh)) {
        ((mesh as THREE.Mesh).material as THREE.MeshPhongMaterial).color
        .set(newColor)
      }
    })
  }
}

function _updateSheetEdgesColor(sheetMesh: THREE.Object3D): Function {
  return function (newColor: ColorSpec | THREE.Color): void {
    sheetMesh.traverse(mesh => {
      if (_isEdge(mesh)) {
        ((mesh as Wireframe).material as LineMaterial).color.set(newColor)
      }
    })
  }
}

function _updateSheetOpacity(sheetMesh: THREE.Object3D): Function {
  return function (newOpacity: number): void {
    sheetMesh.traverse((mesh) => {
      if (_isFace(mesh)) {
        ((mesh as THREE.Mesh).material as THREE.MeshPhongMaterial).opacity
          = newOpacity
      }
    })
  }
}


function _setRenderingOptions(
  renderOptions: dat.GUI,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
): void {

  renderOptions.addColor(VIEW_OPTIONS, 'backgroundColor')
    .onChange(newColor => (scene.background as THREE.Color).set(newColor))
  renderOptions.add(camera.position, 'z', 0, 50, 5).listen()
  renderOptions.add(camera, 'fov', 25, 125, 25).listen()
    .onChange(_unusedNewFov => camera.updateProjectionMatrix())

  renderOptions.open()
}
