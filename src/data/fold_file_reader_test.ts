import { describe, it } from 'mocha'
import { expect } from 'chai'

import { readFoldFile } from 'data/fold_file_reader'
import { FOLD_data } from './fold_format'


describe('FOLD format reader', () => {

  it('readFoldFile()', () => {
    const
      FOLD_FILE_PATH = "data/test-data/passed/simple.json",
      VERTICES_COORDS = [
        [0, 1, 0],
        [0, 0, 1],
        [0, -1, 0],
        [1, 0, 0],
        [0, 0, -1],
        [0, 0, -1],
      ],
      FACES_VERTICES = [
        [0, 1, 2],
        [0, 2, 3],
        [0, 4, 1],
        [1, 5, 2],
      ],
      foldData = readFoldFile(FOLD_FILE_PATH) as FOLD_data

    expect(foldData.vertices_coords).deep.equals(VERTICES_COORDS)
    expect(foldData.faces_vertices).deep.equals(FACES_VERTICES)
  })

})
