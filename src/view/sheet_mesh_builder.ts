import * as THREE from 'three'

import { Sheet } from 'sheet/sheet'
import { createSheetGeometry } from 'sheet/sheet_geometry'

import { SHEET_OPTIONS } from 'sheet/config'


function _createSheetMaterial(): THREE.Material {
  return new THREE.MeshStandardMaterial({
    color: SHEET_OPTIONS.color,
    side: THREE.DoubleSide,
  })
}


export function createSheetMesh(aSheet: Sheet): THREE.Mesh {
  return new THREE.Mesh(createSheetGeometry(aSheet), _createSheetMaterial())
}