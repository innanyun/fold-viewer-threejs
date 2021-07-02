import { from } from 'rxjs'
import { map, bufferCount, tap } from 'rxjs/operators'
import { strict as assert } from 'assert'

import { _rawSheetVertex2dCoords, _rawSheetVertex3dCoords } from './sheet.js'


const
  vertexLocations = _rawSheetVertex2dCoords(1.0),
  vertexPositions = _rawSheetVertex3dCoords()


assert(vertexLocations.length == 2 * 4)
console.log(vertexLocations)

assert(vertexPositions.length == 3 * 4)
console.log(vertexPositions)
