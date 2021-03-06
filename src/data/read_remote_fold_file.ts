import { from, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import axios from 'axios'

import { FOLD_data } from 'data/fold_format'


function readRemoteFoldFile$(url: string): Observable<FOLD_data> {
  return from(axios.get(url)).pipe(
    map(response => response.data)
  )
}


export { readRemoteFoldFile$ }
