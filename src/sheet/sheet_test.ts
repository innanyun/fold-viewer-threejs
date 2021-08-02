import {describe, it} from 'mocha'
import {assert, expect} from 'chai'

// import { strict as assert } from 'assert'

import { Vector3Coord } from 'types'
import { SquareSheet } from './sheet'


// const
//   vertexPositions = squareSheetVertexPositions(5)

// assert(vertexPositions.length == 4)
// console.log('vertex spatial coords:', vertexPositions)


describe('sheet geometry', () => {

  it('vertex planar locations', () => {
    const
      SHEET_SIZE: number = 5,
      v = new SquareSheet(SHEET_SIZE).vertexPositions()

    expect(v).to.have.lengthOf(4)
    assert(v.every((p: Vector3Coord) => expect(p[2]).equals(0)))
  })

})
