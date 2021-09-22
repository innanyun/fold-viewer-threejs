import { describe, it } from 'mocha'
import { assert, expect } from 'chai'

import * as math from 'mathjs'

import { FoldFileSheet } from 'data/fold_file_sheet'
import { FOLD_data } from 'data/fold_format'


describe('Sheet read from 2D vertices FOLD file', () => {
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
    S2 = new FoldFileSheet(FOLD_DATA_WITH_2D_VERTICES_COORDS)

  it('should have vertices 2D coordinates initialized from file', () => {
    assert(
      S2.verticesLocations().every(uv => uv !== undefined && uv.length === 2)
    )
  })

  it('should have vertices 3D coordinates initialized as (z = 0)', () => {
    assert(
      S2.verticesPositions().every(
        xyz => xyz.length === 3 && math.equal(xyz[2], 0)
      )
    )
  })
})

describe('Sheet read from 3D vertices FOLD file', () => {

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

  it('should have vertices 2D coordinates UNINITIALIZED', () => {
    expect(S3.verticesLocations().every(v => v.length === 2)).to.be.false
  })

  it('should have vertices 3D coordinates initialized from file', () => {
    expect(S3.verticesPositions().every(xyz => xyz.length === 3)).to.be.true
  })

})
