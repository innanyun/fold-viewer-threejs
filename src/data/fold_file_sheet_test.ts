import { assert } from 'chai'

import * as math from 'mathjs'

import { Sheet } from 'sheet/sheet'
import { FoldFileSheet } from 'data/fold_file_sheet'
import { FOLD_data } from 'data/fold_format'


const
  FOLD_DATA_WITH_2D_VERTICES_COORDS: FOLD_data = {
    file_spec: 1.1,
    vertices_coords: [
      [0, 0],
      [1, 1],
      [2, 2],
      [3, 3],
    ],
    edges_vertices: [],
  },
  FOLD_DATA_WITH_3D_VERTICES_COORDS: FOLD_data = {
    file_spec: 1.1,
    vertices_coords: [
      [0, 0, 0],
      [1, 1, 1],
      [2, 2, 2],
      [3, 3, 3],
    ],
    edges_vertices: [],
  },
  sheet2 = new FoldFileSheet(FOLD_DATA_WITH_2D_VERTICES_COORDS),
  sheet3 = new FoldFileSheet(FOLD_DATA_WITH_3D_VERTICES_COORDS)


assert(
  sheet2.verticesLocations().every(uv => uv !== undefined && uv.length === 2),
  "vertices planar coordinates defined"
)
assert(
  sheet2.verticesPositions().every(xyz => xyz.length === 3 && math.equal(xyz[2], 0)),
  "vertices spatial coordinates defined (z = 0)"
)
_dumpVertexCoords(sheet2)

assert(
  sheet3.verticesLocations().every(uv => uv === undefined),
  "vertices planar coordinates UNDEFINED"
)
assert(
  sheet3.verticesPositions().every(xyz => xyz.length === 3),
  "vertices spatial coordinates defined"
)
_dumpVertexCoords(sheet3)


function _dumpVertexCoords(s: Sheet): void {
  console.log("vertices coordinates (2D):", s.verticesLocations())
  console.log("vertices coordinates (3D):", s.verticesPositions())
}
