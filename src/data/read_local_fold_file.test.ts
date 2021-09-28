import { describe, it } from 'mocha'
import { assert, expect } from 'chai'
import path from 'path'

import { FOLD_data } from 'data/fold_format'
import { readLocalFoldFile$ } from 'data/read_local_fold_file'


describe('Reading from local FOLD file via path', () => {

  it('should get JSON file', done => {

    const TEST_FILE_PATH = path.join(
      __dirname, 'test-data/2d-vertex-coords/crane.fold'
    )

    readLocalFoldFile$(TEST_FILE_PATH).subscribe({
      next: (data: FOLD_data): void => {
        expect(data.file_spec).equals(1)
        expect(data.vertices_coords).has.lengthOf(56)
        assert(data.vertices_coords.every(v => v.length === 2))
        expect(data.file_creator).equals('Rabbit Ear')
        expect(data.file_author).equals('Robby Kraft')
      }
    })

    done()
  })

})
