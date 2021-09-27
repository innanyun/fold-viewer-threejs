import { describe, it } from 'mocha'
import { expect } from 'chai'

import path from 'path'
import { map } from 'rxjs/operators'

import { create3dSheetGeometry } from 'sheet/sheet_geometry'
import { FoldFileSheet } from 'data/fold_file_sheet'
import { readLocalFoldFile$ } from 'data/read_local_fold_file'


const
  TEST_FILE_PATH = '../data/test-data/2d-vertex-coords/diagonal-cp.fold',
  TEST_SHEET$ = readLocalFoldFile$(path.join(__dirname, TEST_FILE_PATH)).pipe(
    map(foldData => new FoldFileSheet(foldData))
  )


describe('Geometry for sheet from 2D vertices FOLD file', () => {

  it('should create valid face geometry', () => {
    TEST_SHEET$.subscribe({
      next: (sheet) => {
        const p = create3dSheetGeometry(sheet).getAttribute('position')
        for (let i = 0; i < p.count; i += 1) {
          expect([p.getX(i), p.getY(i), p.getZ(i)]).deep.equal(sheet.verticesPositions()[i])
        }
        // redundant?
        expect(Array.from(p.array)).deep.equal(sheet.verticesPositions().flat())
      },
    })
  })

})
