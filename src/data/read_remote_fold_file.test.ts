import { describe, it } from 'mocha'
import { expect } from 'chai'

import { readRemoteFoldFile$ } from 'data/read_remote_fold_file'
import { FOLD_data } from 'data/fold_format'


describe('FOLD file fetched from remote URL', () => {

  const TEST_URL = 'https://rabbitear.org/fold/crane.fold'

  it('should get JSON file', done => {

    const foldData$ = readRemoteFoldFile$(TEST_URL)

    foldData$.subscribe({
      next: (data: FOLD_data): void => {

        expect(data.file_spec).equals(1)
        expect(data.vertices_coords).has.lengthOf(56)
        expect(data.file_creator).equals('Rabbit Ear')
        expect(data.file_author).equals('Robby Kraft')

      },
    })

    done()
  })

})
