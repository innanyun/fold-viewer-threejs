import {describe, it} from 'mocha'
import {assert, expect} from 'chai'

// import { strict as assert } from 'assert'

import { squareSheetVertexPositions } from './sheet'


// const
//   vertexPositions = squareSheetVertexPositions(5)

// assert(vertexPositions.length == 4)
// console.log('vertex spatial coords:', vertexPositions)


describe('sheet geometry', () => {

  it('vertex planar locations', () => {
    const
      SHEET_SIZE/*: number*/ = 5,
      vertexPositions = squareSheetVertexPositions(SHEET_SIZE)

    expect(vertexPositions).to.have.lengthOf(4)
    assert(vertexPositions.every(p => expect(p[2]).equals(0)))
  })

})
