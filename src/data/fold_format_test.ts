import { describe, it } from 'mocha'
import { expect } from 'chai'
import fs from 'fs'
import path from 'path'

import { FOLD_data } from 'data/fold_format'
import imported from './test-data/3d-vertex-coords/bird-base-3d-modified.prettified.json'


describe('FOLD format file reading', () => {

  it('should successfully read from external file', done => {
    const
      TEST_DATA_FILE = path.join(
        __dirname, 'test-data/3d-vertex-coords/bird-base-3d-modified.json'
      ),
      readIn: FOLD_data = JSON.parse(fs.readFileSync(TEST_DATA_FILE).toString())

    expect(readIn.vertices_coords.every(v => v.length === 3)).to.be.true
    done()
  })

  it('should properly pass through JSON import of TypeScript', (done) => {
    expect(imported.vertices_coords.every(v => v.length === 3)).to.be.true
    done()
  })

})
