import { describe, it } from 'mocha'
import { assert, expect } from 'chai'

import { SquareSheet } from 'sheet/square_sheet'
import * as math from 'mathjs'


describe('Square sheet geometry', () => {

  const
    S = new SquareSheet(),
    v2coords = S.verticesLocations(),
    v3coords = S.verticesPositions()

  it('should have 4 vertices', () => {
    expect(v2coords).to.have.lengthOf(4)
    expect(v3coords).to.have.lengthOf(4)
  })

  it('should have vertices 3D coordinates initialized as (z = 0)', () => {
    assert(v3coords.every(
      ([x, y, z], i) =>
        math.deepEqual([x, y], [...v2coords[i]]) && math.equal(z, 0)
    ))
  })

})
