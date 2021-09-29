import * as THREE from 'three'
import { Wireframe } from 'three/examples/jsm/lines/Wireframe'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial'
import * as dat from 'dat.gui'

import { ColorSpec } from 'types'
import { SheetOptions, SHEET_OPTIONS } from 'sheet/config'
import { VIEW_OPTIONS } from 'view/config'
import { AxesHelper } from 'three'


interface DebugOptionsControllers {
  // faces
  frontColorControl: dat.GUIController
  backColorControl: dat.GUIController
  opacityControl: dat.GUIController
  // edges
  edgeColorControl: dat.GUIController
  edgeWidthControl: dat.GUIController
  // general
  wireframeControl: dat.GUIController
}


function initDatGUI(
  scene: THREE.Scene, camera: THREE.PerspectiveCamera, axesHelper: AxesHelper
): DebugOptionsControllers {

  const
    gui = new dat.GUI({name: 'FOLD viewer'}),
    sheetOptionsControllers = gui.addFolder('Sheet'),
    viewOptionsControllers = gui.addFolder('View')

  _createAndSetViewOptions(viewOptionsControllers, scene, camera, axesHelper)

  return _createSheetOptionsControllers(sheetOptionsControllers, SHEET_OPTIONS)

}


function _createSheetOptionsControllers(
  controllers: dat.GUI, options: SheetOptions
): DebugOptionsControllers {

  controllers.open()

  return {
    // faces
    frontColorControl: controllers.addColor(options, 'frontColor'),
    backColorControl: controllers.addColor(options, 'backColor'),
    opacityControl: controllers.add(options, 'opacity', 0.0, 1.0, 0.1),
    // edges
    edgeColorControl: controllers.addColor(options, 'edgeColor'),
    edgeWidthControl: controllers.add(options, 'edgeWidth', 0.0, 0.01, 0.001),
    // general
    wireframeControl: controllers.add(options, 'wireframe')
  }

}


function bindDebugOptionsControllers(
  controllers: DebugOptionsControllers,
  sheetMesh: THREE.Object3D,
): void {

  const
    updateFrontFacesColor = _updateSheetFacesColor(sheetMesh),
    updateOpacity = _updateSheetOpacity(sheetMesh),
    updateEdgesColor = _updateSheetEdgesColor(sheetMesh),
    updateEdgeWidth = _updateSheetEdgeWidth(sheetMesh),
    toggleWireframe = _toggleSheetWireframe(sheetMesh)

  controllers.frontColorControl.onChange(
    newColor => updateFrontFacesColor(newColor)
  )
  controllers.backColorControl.onChange(
    newColor => updateFrontFacesColor/*TODO: updateBackFacesColor*/(newColor)
  )
  controllers.opacityControl.onChange(newOpacity => updateOpacity(newOpacity))
  controllers.edgeColorControl.onChange(newColor => updateEdgesColor(newColor))
  controllers.edgeWidthControl.onChange(newWidth => updateEdgeWidth(newWidth))
  controllers.wireframeControl.onChange(newFlag => toggleWireframe(newFlag))

}


const
  _isEdge = (mesh: THREE.Object3D): boolean => mesh instanceof Wireframe,
  _isFace = (mesh: THREE.Object3D): boolean => mesh instanceof THREE.Mesh &&
    !_isEdge(mesh)


function _updateSheetFacesColor(sheetMesh: THREE.Object3D) /*: Function */ {
  return function (newColor: ColorSpec | THREE.Color): void {
    sheetMesh.traverse(mesh => {
      if (_isFace(mesh)) {
        ((mesh as THREE.Mesh).material as THREE.MeshPhongMaterial).color.set(
          newColor
        )
      }
    })
  }
}

function _updateSheetEdgesColor(sheetMesh: THREE.Object3D)/* : Function */ {
  return function (newColor: ColorSpec | THREE.Color): void {
    sheetMesh.traverse(mesh => {
      if (_isEdge(mesh)) {
        ((mesh as Wireframe).material as LineMaterial).color.set(newColor)
      }
    })
  }
}

function _updateSheetEdgeWidth(sheetMesh: THREE.Object3D)/* : Function */ {
  return function (newWidth: number): void {
    sheetMesh.traverse(mesh => {
      if (_isEdge(mesh)) {
        ((mesh as Wireframe).material as LineMaterial).linewidth = newWidth
      }
    })
  }
}

function _updateSheetOpacity(sheetMesh: THREE.Object3D)/* : Function */ {
  return function (newOpacity: number): void {
    sheetMesh.traverse(mesh => {
      if (_isFace(mesh)) {
        ((mesh as THREE.Mesh).material as THREE.MeshPhongMaterial).opacity =
          newOpacity
      }
    })
  }
}

function _toggleSheetWireframe(sheetMesh: THREE.Object3D)/* : Function */ {
  return function (newFlag: boolean): void {
    sheetMesh.traverseVisible(mesh => {
      if (_isFace(mesh)) {
        ((mesh as THREE.Mesh).material as THREE.MeshPhongMaterial).wireframe =
          newFlag
      }
    })
  }
}

function _createAndSetViewOptions(
  controllers: dat.GUI,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  axesHelper: AxesHelper
): void {

  controllers.addColor(VIEW_OPTIONS, 'backgroundColor')
    .onChange(newColor => (scene.background as THREE.Color).set(newColor))
  controllers.add(camera.position, 'z', 0, 50, 5)
    .listen()
  controllers.add(camera, 'fov', 25, 125, 25)
    .listen()
    .onChange(_unusedNewFov => camera.updateProjectionMatrix())
  controllers.add(axesHelper, 'visible')
    .name('axes helper')
    .onChange(newFlag => axesHelper.visible = newFlag)

  controllers.open()

}


export type { DebugOptionsControllers }
export { initDatGUI, bindDebugOptionsControllers }
