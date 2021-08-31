import * as THREE from 'three'
import { Wireframe } from 'three/examples/jsm/lines/Wireframe'
import { LineSegmentsGeometry } from 'three/examples/jsm/lines/LineSegmentsGeometry'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial'

import { Sheet } from 'sheet/sheet'
import { createSheetGeometry } from 'sheet/sheet_geometry'

import { SHEET_OPTIONS } from 'sheet/config'


export function createSheetMesh(aSheet: Sheet): THREE.Object3D {

  const
    sheetGeometry = createSheetGeometry(aSheet),
    sheetFaceMesh = _createSheetFacesMesh(sheetGeometry),
    sheetEdgesMesh = _createSheetEdgesMesh(sheetGeometry),
    allMeshes = [sheetEdgesMesh, sheetFaceMesh],
    meshGroup = new THREE.Group()

  allMeshes.forEach(mesh => mesh.scale.set(
    SHEET_OPTIONS.scale, SHEET_OPTIONS.scale, SHEET_OPTIONS.scale
  ))

  meshGroup.add(sheetFaceMesh, sheetEdgesMesh)

  return meshGroup
}


function _createSheetFacesMesh(
  sheetGeometry: THREE.BufferGeometry
): THREE.Mesh {
  const
    sheetFacesMaterial = new THREE.MeshPhongMaterial({
      color: SHEET_OPTIONS.frontColor,
      transparent: true,
      opacity: SHEET_OPTIONS.opacity,
      side: THREE.DoubleSide,
    })

  return new THREE.Mesh(sheetGeometry, sheetFacesMaterial)
}


function _createSheetEdgesMesh(
  sheetGeometry: THREE.BufferGeometry
): THREE.Object3D {
  const
    sheetEdgesGeometry = new LineSegmentsGeometry().fromEdgesGeometry(
      new THREE.EdgesGeometry(sheetGeometry)
    ),
    sheetEdgesMaterial = new LineMaterial({
      color: SHEET_OPTIONS.edgeColor as number,
      linewidth: SHEET_OPTIONS.edgeWidth,
      dashed: false, // try `true` for dashed wireframes
      dashSize: 0.05,
      gapSize: 0.02,
    })

  let mesh = new Wireframe(sheetEdgesGeometry, sheetEdgesMaterial)

  mesh.computeLineDistances()

  return mesh
}
