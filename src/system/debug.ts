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


function bindDebugOptionsControllersWithModel(
  controllers: DebugOptionsControllers,
  sheetModel: THREE.Object3D,
): void {

  const
    updateFacesColor = _updateSheetFacesColor(sheetModel),
    updateOpacity = _updateSheetOpacity(sheetModel),
    updateEdgesColor = _updateSheetEdgesColor(sheetModel),
    updateEdgeWidth = _updateSheetEdgeWidth(sheetModel),
    toggleWireframe = _toggleSheetWireframe(sheetModel)

  controllers.frontColorControl.onChange(newColor => updateFacesColor(newColor, 'front'))
  controllers.backColorControl.onChange(newColor => updateFacesColor(newColor, 'back'))
  controllers.opacityControl.onChange(newOpacity => updateOpacity(newOpacity))
  controllers.edgeColorControl.onChange(newColor => updateEdgesColor(newColor))
  controllers.edgeWidthControl.onChange(newWidth => updateEdgeWidth(newWidth))
  controllers.wireframeControl.onChange(newFlag => toggleWireframe(newFlag))

}


const
  _isEdge = (model: THREE.Object3D): boolean => model instanceof Wireframe,
  _isFace = (model: THREE.Object3D): boolean => model instanceof THREE.Mesh &&
    !_isEdge(model)


function _updateSheetFacesColor(sheetModel: THREE.Object3D) /*: Function */ {
  return function (newColor: ColorSpec | THREE.Color, name: string): void {
    sheetModel.traverse(child => {
      if (_isFace(child) && child.name == name) {
        ((child as THREE.Mesh).material as THREE.MeshPhongMaterial).color.set(
          newColor
        )
      }
    })
  }
}

function _updateSheetEdgesColor(sheetModel: THREE.Object3D)/* : Function */ {
  return function (newColor: ColorSpec | THREE.Color): void {
    sheetModel.traverseVisible(child => {
      if (_isEdge(child)) {
        ((child as Wireframe).material as LineMaterial).color.set(newColor)
      }
    })
  }
}

function _updateSheetEdgeWidth(sheetModel: THREE.Object3D)/* : Function */ {
  return function (newWidth: number): void {
    sheetModel.traverseVisible(child => {
      if (_isEdge(child)) {
        ((child as Wireframe).material as LineMaterial).linewidth = newWidth
      }
    })
  }
}

function _updateSheetOpacity(sheetModel: THREE.Object3D)/* : Function */ {
  return function (newOpacity: number): void {
    sheetModel.traverseVisible(child => {
      if (_isFace(child)) {
        ((child as THREE.Mesh).material as THREE.MeshPhongMaterial).opacity =
          newOpacity
      }
    })
  }
}

function _toggleSheetWireframe(sheetModel: THREE.Object3D)/* : Function */ {
  return function (newFlag: boolean): void {
    sheetModel.traverseVisible(child => {
      if (_isFace(child)) {
        ((child as THREE.Mesh).material as THREE.MeshPhongMaterial).wireframe =
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
export { initDatGUI, bindDebugOptionsControllersWithModel }
