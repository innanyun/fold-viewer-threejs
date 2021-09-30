import * as THREE from 'three'
import { Wireframe } from 'three/examples/jsm/lines/Wireframe'
import {
  LineSegmentsGeometry } from 'three/examples/jsm/lines/LineSegmentsGeometry'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial'

import { Sheet } from 'sheet/sheet'
import { createSheetGeometry,
  createSheetFacesShapeGeometries$ } from 'sheet/sheet_geometry'

import { SHEET_OPTIONS } from 'sheet/config'


function createSheetModel(s: Sheet): THREE.Object3D {
  return s.verticesLocations().length > 0 ?
    _createSheetFacesModel(s) :
    _createSheetGeometryModel(s)
}

/**
 * Mesh for sheet as a single entity. Used for non-flat (3D) sheets.
 * @param s
 * @returns Mesh group for sheet body and geometry edges
 */
function _createSheetGeometryModel(s: Sheet): THREE.Object3D {

  const
    sheetGeometry = createSheetGeometry(s),
    sheetFrontFaceMesh = new THREE.Mesh(sheetGeometry, _materials.front),
    sheetBackFaceMesh = new THREE.Mesh(sheetGeometry, _materials.back),
    sheetEdgesMesh = _createEdgesMesh(sheetGeometry),
    sheetMesh = [sheetFrontFaceMesh, sheetBackFaceMesh, sheetEdgesMesh]

  // name meshes for front and back faces
  sheetFrontFaceMesh.name = 'front'
  sheetBackFaceMesh.name = 'back'

  sheetMesh.forEach(mesh => mesh.scale.set(
    SHEET_OPTIONS.scale, SHEET_OPTIONS.scale, SHEET_OPTIONS.scale
  ))

  return new THREE.Group().add(...sheetMesh)
}


const _materials = {
  front: new THREE.MeshLambertMaterial({
    color: SHEET_OPTIONS.frontColor,
    transparent: true,
    opacity: SHEET_OPTIONS.opacity,
    side: THREE.FrontSide,
    // wireframe: true,
    // wireframeLinewidth: 3,
  }),
  back: new THREE.MeshLambertMaterial({
    color: SHEET_OPTIONS.backColor,
    transparent: true,
    opacity: SHEET_OPTIONS.opacity,
    side: THREE.BackSide,
    // wireframe: true,
    // wireframeLinewidth: 3,
  }),
  edge: new LineMaterial({
    color: SHEET_OPTIONS.edgeColor as number,
    linewidth: SHEET_OPTIONS.edgeWidth,
    // dashed: false, // try `true` for dashed wireframes
    dashSize: 0.05,
    gapSize: 0.02,
  })
}


function _createEdgesMesh(geometry: THREE.BufferGeometry): THREE.Object3D {

  function createEdgesGeometry(geometry: THREE.BufferGeometry): LineSegmentsGeometry {
    return new LineSegmentsGeometry().fromEdgesGeometry(
      new THREE.EdgesGeometry(geometry)
    )
  }

  return new Wireframe(
    createEdgesGeometry(geometry), _materials.edge
  ).computeLineDistances()

}


/**
 * Mesh for sheet as a set/group of faces. Used for flat (2D) sheets.
 * @param s
 * @returns Mesh group for sheet faces and geometry edges
 */
function _createSheetFacesModel(s: Sheet): THREE.Object3D {
  const
    sheetFrontFaces = new THREE.Group(),
    sheetBackFaces = new THREE.Group(),
    sheetFacesEdges = new THREE.Group()

  // name meshes for front and back faces
  sheetFrontFaces.name = 'front'
  sheetBackFaces.name = 'back'

  createSheetFacesShapeGeometries$(s).subscribe({
    next: (shapeGeometry) => {
      // assign meshes for front and back faces
      sheetFrontFaces.add(new THREE.Mesh(shapeGeometry, _materials.front))
      sheetBackFaces.add(new THREE.Mesh(shapeGeometry, _materials.back))
      sheetFacesEdges.add(_createEdgesMesh(shapeGeometry))
    },
  })

  return _centerObject(
    new THREE.Group().add(sheetFrontFaces, sheetBackFaces, sheetFacesEdges)
  )
}


function _centerObject(obj: THREE.Object3D): THREE.Object3D {
  /**
   * 👉 [@WestLangley's answer to "How to center a THREE.Group based on the
   * width of its children?"](https://stackoverflow.com/a/46165381/3068407)
   */
  new THREE.Box3().setFromObject(obj).getCenter(obj.position).multiplyScalar(-1)

  return obj
}


export { createSheetModel }
