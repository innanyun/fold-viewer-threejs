import * as THREE from 'three'

import { SceneBuilder } from 'view/scene_builder'
import { createSheetGeometry } from 'sheet/sheet_geometry'
import { SquareSheet } from 'sheet/square_sheet'
import { SHEET_OPTIONS } from 'sheet/config'


export class SheetSceneBuilder implements SceneBuilder {

  createGeometry(): THREE.BufferGeometry {
    return createSheetGeometry(new SquareSheet(SHEET_OPTIONS.size))
  }

  createMaterial(): THREE.Material {
    return new THREE.MeshStandardMaterial({
      color: SHEET_OPTIONS.color,
      side: THREE.DoubleSide,
    })
  }

}
