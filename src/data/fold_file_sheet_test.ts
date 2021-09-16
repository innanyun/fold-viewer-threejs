import { describe, it } from 'mocha'
import { assert, expect } from 'chai'

import * as math from 'mathjs'

// import { Sheet } from 'sheet/sheet'
import { FoldFileSheet } from 'data/fold_file_sheet'
import { FOLD_data } from 'data/fold_format'


describe('`FoldFileSheet` with 2D vertices', () => {

  const FOLD_DATA_WITH_2D_VERTICES_COORDS: FOLD_data = {
      file_spec: 1.1,
      vertices_coords: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      edges_vertices: [],
    },
    S2 = new FoldFileSheet(FOLD_DATA_WITH_2D_VERTICES_COORDS)

  it('should have vertex 2D coords initialized from file', () => {
    assert(
      S2.verticesLocations().every(uv => uv !== undefined && uv.length === 2)
    )
  })

  it('should have vertices spatial coordinates defined as (z = 0)', () => {
    assert(
      S2.verticesPositions().every(xyz => xyz.length === 3 && math.equal(xyz[2], 0))
    )
  })

})

describe('`FoldFileSheet` with 3D vertices', () => {

  const
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
    S3 = new FoldFileSheet(FOLD_DATA_WITH_3D_VERTICES_COORDS)

  it('should have vertex 2D coords undefined', () => {
    expect(S3.verticesLocations().every(v => v.length === 2)).to.be.false
  })

  it("should have vertex 3D coords initialized from file", () => {
    expect(S3.verticesPositions().every(xyz => xyz.length === 3)).to.be.true
  })

})
