import * as THREE from 'three'

import { MeshBuilder } from 'view/mesh_builder'
import { createSheetGeometry } from 'sheet/sheet_geometry'
import { SHEET_OPTIONS } from 'sheet/config'
import { Sheet } from 'sheet/sheet'


export class SheetMeshBuilder implements MeshBuilder {

  private _mesh: THREE.Mesh

  constructor(aSheet: Sheet) {
    this._mesh = new THREE.Mesh(this.createGeometry(aSheet), this.createMaterial())
  }

  private createGeometry(aSheet: Sheet): THREE.BufferGeometry {
    return createSheetGeometry(aSheet);
  }

  private createMaterial(): THREE.Material {
    return new THREE.MeshStandardMaterial({
      color: SHEET_OPTIONS.color,
      side: THREE.DoubleSide,
    })
  }

  mesh(): THREE.Mesh { return this._mesh }

}
