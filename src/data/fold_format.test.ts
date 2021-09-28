import { describe, it } from 'mocha'
import { assert } from 'chai'
import fs from 'fs'
import path from 'path'

import { FOLD_data } from 'data/fold_format'
import imported from 'data/test-data/3d-vertex-coords/bird-base-3d-modified.prettified.json'


describe('Reading from valid FOLD files', () => {

  it('should successfully read from valid FOLD file', () => {
    const
      TEST_DATA_FILE = path.join(
        __dirname, 'test-data/3d-vertex-coords/bird-base-3d-modified.json'
      ),
      readIn: FOLD_data = JSON.parse(fs.readFileSync(TEST_DATA_FILE).toString())

    assert(readIn.vertices_coords.every(v => v.length === 3))
  })

  it('should properly work with JSON import of TypeScript', () => {
    assert(imported.vertices_coords.every(v => v.length === 3))
  })

})
