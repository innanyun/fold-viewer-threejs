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
    expect(S2.verticesLocations()).deep.equal(
      FOLD_DATA_WITH_2D_VERTICES_COORDS.vertices_coords
    )
  })

  it('should have vertices 3D coordinates initialized as (z = 0)', () => {
    assert(
      S2.verticesPositions().every(([x, y, z], i) =>
        math.deepEqual(
          [x, y],
          FOLD_DATA_WITH_2D_VERTICES_COORDS.vertices_coords[i] as unknown as number[]
        ) &&
        math.equal(z, 0)
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

  it('should have vertices 2D coordinates UNDEFINED', () => {
    expect(S3.verticesLocations()).to.be.undefined
  })

  it('should have vertices 3D coordinates initialized from data', () => {
    expect(S3.verticesPositions()).deep.equal(
      FOLD_DATA_WITH_3D_VERTICES_COORDS.vertices_coords
    )
  })

})
