import { describe, it } from 'mocha'
import { expect } from 'chai'

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
    expect(v3coords.every(p => math.equal(p[2], 0))).to.be.true
  })

})
