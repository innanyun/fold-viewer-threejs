import { describe, it } from 'mocha'
import { assert, expect } from 'chai'

import path from 'path'
import * as math from 'mathjs'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { _createFacesGeometry } from 'sheet/sheet_geometry'
import { FoldFileSheet } from 'data/fold_file_sheet'
import { readLocalFoldFile$ } from 'data/read_local_fold_file'
import { Vector2Coord } from 'sheet/types'
import { Sheet } from 'sheet/sheet'


describe('Sheet from 2D vertices FOLD file', () => {
  const
    TEST_FILE_PATH = '../data/test-data/2d-vertex-coords/diagonal-cp.fold'
  let
    testSheet$: Observable<Sheet>

  before('init sheet from file', () => {
    testSheet$ = readLocalFoldFile$(path.join(__dirname, TEST_FILE_PATH)).pipe(
      map(data => new FoldFileSheet(data))
    )
  })

  it('should have valid data', () => {
    testSheet$.subscribe({
      next: sheet => {
        const
          verticesLocations = sheet.verticesLocations() as Vector2Coord[],
          verticesPositions = sheet.verticesPositions()

        expect(sheet.verticesLocations()).not.to.be.undefined

        assert(
          verticesPositions.every(([x, y, z], i) =>
            math.deepEqual([x, y], [...verticesLocations[i]]) &&
            math.equal(z, 0)
          )
        )
      }
    })
  })

  it('should create valid face geometry', () => {
    testSheet$.subscribe({
      next: sheet => {
        const facesGeometry = _createFacesGeometry(
          sheet.verticesPositions(),
          sheet.facesVerticesIds()
        )

        console.log(facesGeometry.index)
      }
    })
  })

})
