import { strict as assert } from 'assert'

import { squareSheetVertexPositions } from './sheet.mjs'


const
  vertexPositions = squareSheetVertexPositions(5)

assert(vertexPositions.length == 4)
console.log('vertex spatial coords:', vertexPositions)