import { describe, it } from 'mocha'
import { assert, expect } from 'chai'

import * as math from 'mathjs'

import { FoldFileSheet } from 'data/fold_file_sheet'
import { FOLD_data } from 'data/fold_format'


describe('Sheet from 2D vertices FOLD data', () => {
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

  it('should have vertices 2D coordinates initialized from data', () => {
    assert(S2.verticesLocations().every(uv => expect(uv).to.have.lengthOf(2)))
    expect(S2.verticesLocations()).deep.equals(
      FOLD_DATA_WITH_2D_VERTICES_COORDS.vertices_coords
    )
  })

  it('should have vertices 3D coordinates initialized as (z = 0)', () => {
    assert(
      S2.verticesPositions().every(
        xyz => expect(xyz).to.have.lengthOf(3) && math.equal(xyz[2], 0)
      )
    )
  })
})

describe('Sheet from 3D vertices FOLD data', () => {

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
    expect(S3.verticesLocations().every(uv => uv.length === 2)).to.be.false
  })

  it('should have vertices 3D coordinates initialized from data', () => {
    expect(S3.verticesPositions().every(xyz => xyz.length === 3)).to.be.true
  })

})
