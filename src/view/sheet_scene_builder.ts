import * as THREE from 'three'

import { ISceneBuilder } from 'scene_builder'
import { createSheetGeometry } from 'sheet/sheet_geometry';
import { SquareSheet } from 'sheet/sheet';
import { SHEET_OPTIONS } from 'sheet/config';


class SheetSceneBuilder implements ISceneBuilder {

  createGeometry(): THREE.BufferGeometry {
    return createSheetGeometry(new SquareSheet(SHEET_OPTIONS.size));
  }

  createMaterial(): THREE.Material {
    return new THREE.MeshStandardMaterial({
      color: SHEET_OPTIONS.color,
      side: THREE.DoubleSide,
    });
  }

}


export { SheetSceneBuilder }
