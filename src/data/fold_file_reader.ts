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


function initFoldFileReader(): Observable<FOLD_data> {
  const _reader = new FileReader()

  fromEvent(
    _createLocalFileChooser(document.getElementById('container') as HTMLElement),
    'change'
  ).pipe(
    map((e: Event) => ((e.target as HTMLInputElement).files as FileList)[0]),
    map((f: File) => _reader.readAsText(f))
  ).subscribe()

  return fromEvent(_reader, 'load').pipe(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    map((_: Event): string => _reader.result as string),
    map((fileContent: string): FOLD_data => JSON.parse(fileContent))
  )
}


export { initFoldFileReader }
