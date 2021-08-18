import * as THREE from 'three'
import { Wireframe } from 'three/examples/jsm/lines/Wireframe'
import { LineSegmentsGeometry } from 'three/examples/jsm/lines/LineSegmentsGeometry'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial'

import { Sheet } from 'sheet/sheet'
import { createSheetGeometry } from 'sheet/sheet_geometry'

import { SHEET_OPTIONS } from 'sheet/config'


export function createSheetMesh(aSheet: Sheet): THREE.Object3D {

  let
    geometry = createSheetGeometry(aSheet),
    bodyMesh = _createBodyMesh(geometry),
    edgesMesh = _createEdgesMesh(geometry),
    allMeshes = [edgesMesh, bodyMesh],
    meshGroup = new THREE.Group()

  allMeshes.forEach(mesh =>
    mesh.scale.set(SHEET_OPTIONS.scale, SHEET_OPTIONS.scale, SHEET_OPTIONS.scale)
  )

  meshGroup.add(bodyMesh, edgesMesh)

  return meshGroup
}


function _createBodyMesh(geometry: THREE.BufferGeometry): THREE.Mesh {
  return new THREE.Mesh(geometry, _createSheetMaterial())
}


function _createEdgesMesh(sheetGeometry: THREE.BufferGeometry): THREE.Object3D {
  const
    geometry = new LineSegmentsGeometry().fromEdgesGeometry(
      new THREE.EdgesGeometry(sheetGeometry)
    ),
    material = new LineMaterial({
      color: SHEET_OPTIONS.edgeColor as number,
      linewidth: 0.005,
      dashed: false, // try `true` for dashed wireframes
      dashSize: 0.05,
      gapSize: 0.02,
    })

  let mesh = new Wireframe(geometry, material)

  mesh.computeLineDistances()

  return mesh
}


function _createSheetMaterial(): THREE.Material {
  return new THREE.MeshStandardMaterial({
    color: SHEET_OPTIONS.color,
    transparent: true,
    opacity: 0.3,
    side: THREE.DoubleSide,
  })
}
