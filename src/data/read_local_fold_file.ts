import { bindNodeCallback, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import fs from 'fs'

import { FOLD_data } from 'data/fold_format'


function readLocalFoldFile$(path: string): Observable<FOLD_data> {
  return bindNodeCallback(fs.readFile)(path).pipe(
    map(fileContent => JSON.parse(fileContent.toString()))
  )
}


export { readLocalFoldFile$ }
