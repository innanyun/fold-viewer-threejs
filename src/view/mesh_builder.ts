import * as THREE from 'three'
import { Wireframe } from 'three/examples/jsm/lines/Wireframe'
import { LineSegmentsGeometry } from 'three/examples/jsm/lines/LineSegmentsGeometry'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial'

import { Sheet } from 'sheet/sheet'
import { createSheetGeometry } from 'sheet/sheet_geometry'

import { SHEET_OPTIONS } from 'sheet/config'


function createSheetMesh(aSheet: Sheet): THREE.Object3D {

  const
    sheetGeometry = createSheetGeometry(aSheet),
    sheetFacesMesh = _createFacesMesh(sheetGeometry),
    sheetEdgesMesh = _createEdgesMesh(
      sheetGeometry, aSheet.verticesLocations().length > 0
    ),
    sheetMesh = [sheetEdgesMesh, sheetFacesMesh]

  sheetMesh.forEach(mesh => mesh.scale.set(
    SHEET_OPTIONS.scale, SHEET_OPTIONS.scale, SHEET_OPTIONS.scale
  ))

  return new THREE.Group().add(...sheetMesh)
}


function _createFacesMesh(
  sheetGeometry: THREE.BufferGeometry
): THREE.Mesh {
  const
    sheetFacesMaterial = new THREE.MeshLambertMaterial({
      color: SHEET_OPTIONS.frontColor,
      transparent: true,
      opacity: SHEET_OPTIONS.opacity,
      side: THREE.DoubleSide,
      // wireframe: true,
      wireframeLinewidth: 3
    })

  return new THREE.Mesh(sheetGeometry, sheetFacesMaterial)
}


function _createEdgesMesh(
  sheetGeometry: THREE.BufferGeometry, twoDimensional = false
): THREE.Object3D {
  const
    sheetEdgesGeometry = new LineSegmentsGeometry().fromEdgesGeometry(
      new THREE.EdgesGeometry(sheetGeometry, twoDimensional ? 0 : 1)
    ),
    sheetEdgesMaterial = new LineMaterial({
      color: SHEET_OPTIONS.edgeColor as number,
      linewidth: SHEET_OPTIONS.edgeWidth,
      // dashed: false, // try `true` for dashed wireframes
      dashSize: 0.05,
      gapSize: 0.02,
    })

  return new Wireframe(sheetEdgesGeometry, sheetEdgesMaterial).computeLineDistances()
}


export { createSheetMesh }
