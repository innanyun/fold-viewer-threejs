import * as THREE from 'three'
import { Wireframe } from 'three/examples/jsm/lines/Wireframe'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial'
import * as dat from 'dat.gui'

import { SheetOptions, SHEET_OPTIONS } from 'sheet/config'
import { VIEW_OPTIONS } from 'view/config'


export interface SheetOptionsControllers {
  frontColorControl: dat.GUIController
  backColorControl: dat.GUIController
  edgeColorControl: dat.GUIController
  opacityControl: dat.GUIController
}


export function initDatGUI(
  scene: THREE.Scene, camera: THREE.PerspectiveCamera
): SheetOptionsControllers
{
  let
    gui = new dat.GUI({name: 'FOLD viewer'}),
    sheetOptionsControllers = gui.addFolder('Sheet'),
    viewOptionsControllers = gui.addFolder('View')

  _createAndSetViewOptions(viewOptionsControllers, scene, camera)

  return _createSheetOptionsControllers(sheetOptionsControllers, SHEET_OPTIONS)
}

function _createSheetOptionsControllers(
  sheetOptionsFolder: dat.GUI, options: SheetOptions
): SheetOptionsControllers {

  sheetOptionsFolder.open()

  return {
    frontColorControl: sheetOptionsFolder.addColor(options, 'frontColor'),
    backColorControl: sheetOptionsFolder.addColor(options, 'backColor'),
    edgeColorControl: sheetOptionsFolder.addColor(options, 'edgeColor'),
    opacityControl: sheetOptionsFolder.add(options, 'opacity', 0.0, 1.0, 0.1)
  }
}

export function bindSheetOptionsControllers(
  sheetOptions: SheetOptionsControllers,
  sheetMesh: THREE.Object3D,
): void {

  const
    updateFrontFacesColor = _updateSheetFacesColor(sheetMesh),
    updateEdgesColor = _updateSheetEdgesColor(sheetMesh),
    updateOpacity = _updateSheetOpacity(sheetMesh)

  sheetOptions.frontColorControl.onChange(
    newColor => updateFrontFacesColor(newColor)
  )
  sheetOptions.backColorControl.onChange(
    newColor => updateFrontFacesColor(newColor) // TODO: updateBackFacesColor
  )
  sheetOptions.edgeColorControl.onChange(
    newColor => updateEdgesColor(newColor)
  )
  sheetOptions.opacityControl.onChange(
    newOpacity => updateOpacity(newOpacity)
  )
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


function _createAndSetViewOptions(
  viewOptionsFolder: dat.GUI,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
): void {

  viewOptionsFolder.addColor(VIEW_OPTIONS, 'backgroundColor')
    .onChange(newColor => (scene.background as THREE.Color).set(newColor))
  viewOptionsFolder.add(camera.position, 'z', 0, 50, 5).listen()
  viewOptionsFolder.add(camera, 'fov', 25, 125, 25).listen()
    .onChange(_unusedNewFov => camera.updateProjectionMatrix())

  viewOptionsFolder.open()
}
