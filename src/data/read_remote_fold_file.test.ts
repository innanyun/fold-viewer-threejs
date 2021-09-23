import { describe, it } from 'mocha'
import { expect } from 'chai'

import { FOLD_data } from 'data/fold_format'
import { readRemoteFoldFile$ } from 'data/read_remote_fold_file'


describe('Reading from remote FOLD file via URL', () => {

  it('should get JSON file', done => {

    const TEST_FILE_URL = 'https://rabbitear.org/fold/crane.fold'

    readRemoteFoldFile$(TEST_FILE_URL).subscribe({
      next: (data: FOLD_data): void => {
        expect(data.file_spec).equals(1)
        expect(data.vertices_coords).has.lengthOf(56)
        expect(data.file_creator).equals('Rabbit Ear')
        expect(data.file_author).equals('Robby Kraft')
      }
    })

    done()
  })

})
