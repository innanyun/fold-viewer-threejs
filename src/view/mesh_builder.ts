import * as THREE from 'three'
import { Wireframe } from 'three/examples/jsm/lines/Wireframe'
import { LineSegmentsGeometry } from 'three/examples/jsm/lines/LineSegmentsGeometry'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial'

import { Sheet } from 'sheet/sheet'
import { create3dSheetGeometry, createSheetFacesShapeGeometries$ } from 'sheet/sheet_geometry'

import { SHEET_OPTIONS } from 'sheet/config'


function createSheetMesh(aSheet: Sheet): THREE.Object3D {

  const
    sheetGeometry = create3dSheetGeometry(aSheet),
    sheetBodyMesh = _createSheetBodyMesh(sheetGeometry),
    sheetEdgesMesh = _createEdgesMesh(
      sheetGeometry, aSheet.verticesLocations().length > 0
    ),
    sheetMesh = [sheetBodyMesh, sheetEdgesMesh]

  sheetMesh.forEach(mesh => mesh.scale.set(
    SHEET_OPTIONS.scale, SHEET_OPTIONS.scale, SHEET_OPTIONS.scale
  ))

  return new THREE.Group().add(...sheetMesh)
}


function _createSheetBodyMesh(sheetGeometry: THREE.BufferGeometry): THREE.Mesh {
  return new THREE.Mesh(sheetGeometry, _faceMaterial)
}


function _createEdgesGeometry(
  geometry: THREE.BufferGeometry, flat = false
): LineSegmentsGeometry {
  return new LineSegmentsGeometry().fromEdgesGeometry(
    new THREE.EdgesGeometry(geometry, flat ? 0 : 1)
  )
}

const
  _faceMaterial = new THREE.MeshLambertMaterial({
    color: SHEET_OPTIONS.frontColor,
    transparent: true,
    opacity: SHEET_OPTIONS.opacity,
    side: THREE.DoubleSide,
    // wireframe: true,
    wireframeLinewidth: 3,
  }),
  _edgeMaterial = new LineMaterial({
    color: SHEET_OPTIONS.edgeColor as number,
    linewidth: SHEET_OPTIONS.edgeWidth,
    // dashed: false, // try `true` for dashed wireframes
    dashSize: 0.05,
    gapSize: 0.02,
  })


function _createEdgesMesh(
  geometry: THREE.BufferGeometry, flat = false
): THREE.Object3D {
  return new Wireframe(
    _createEdgesGeometry(geometry, flat), _edgeMaterial
  ).computeLineDistances()
}


function _createSheetFacesMesh(s: Sheet): THREE.Object3D {
  const
    sheetFaces = new THREE.Group(),
    sheetFacesEdges = new THREE.Group()

  createSheetFacesShapeGeometries$(s).subscribe({
    next: shapeGeometry => {
      sheetFaces.add(new THREE.Mesh(shapeGeometry, _faceMaterial))
      sheetFacesEdges.add(
        new THREE.Mesh(_createEdgesGeometry(shapeGeometry), _edgeMaterial)
      )
    },
  })

  return _centerObject(new THREE.Group().add(sheetFaces, sheetFacesEdges))
}


function _centerObject(obj: THREE.Object3D): THREE.Object3D {
  /**
   * 👉 [@WestLangley's answer to "How to center a THREE.Group based on the
   * width of its children?""](https://stackoverflow.com/a/46165381/3068407)
   */
  new THREE.Box3().setFromObject(obj).getCenter(obj.position).multiplyScalar(-1)

  return obj
}


export { createSheetMesh, _createSheetFacesMesh }
