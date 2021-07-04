import { strict as assert } from 'assert'

import {
  _squareSheetVertexLocations,
  _squareSheetVertexPositions
} from './sheet.js'


const
  vertexLocations = _squareSheetVertexLocations(2.0),
  vertexPositions = _squareSheetVertexPositions()


assert(vertexLocations.length == 4)
console.log('vertex planar coords:', vertexLocations)

assert(vertexPositions.length == 4)
console.log('vertex spatial coords:', vertexPositions)
