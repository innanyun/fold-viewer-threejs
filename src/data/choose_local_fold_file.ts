import { fromEvent, Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { FOLD_data } from 'data/fold_format'


function _createLocalFileChooser(parent: HTMLElement): HTMLInputElement {
  const input = document.createElement('input')

  input.type = 'file'
  input.accept = 'text/plain, .json, .fold'
  input.multiple = false

  parent.appendChild(input)

  return input
}


function chooseLocalFoldFile$(container: HTMLElement): Observable<FOLD_data> {
  const _reader = new FileReader()

  fromEvent(
    _createLocalFileChooser(container), 'change'
  ).pipe(
    map(event => ((event.target as HTMLInputElement).files as FileList)[0]),
    map(file => _reader.readAsText(file))
  ).subscribe()

  return fromEvent(_reader, 'load').pipe(
    map(_event => _reader.result as string),
    map(fileContent => JSON.parse(fileContent))
  )
}


export { chooseLocalFoldFile$ }
