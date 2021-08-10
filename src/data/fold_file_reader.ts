import { FOLD_data } from 'data/fold_format'


export function readFoldFile(url: string): FOLD_data | undefined {
  const fileData = _readRemoteFile(url)

  return fileData ? JSON.parse(fileData.toString()) as FOLD_data : undefined
}


function _readRemoteFile(url: string): Blob | undefined {
  let
    xhr = new XMLHttpRequest(),
    fileData: Blob | undefined

  xhr.open("GET", url, /*async=*/ false)

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200 || xhr.status === 0) {
        fileData = xhr.response
      }
    }
  }

  xhr.send()

  return fileData
}


function _readLocalFile(file: File): string | undefined {
  let
    reader = new FileReader(),
    fileData: string | undefined

  reader.onload = () => {
    if (reader.readyState === reader.DONE) {
      fileData = reader.result as string
    }
  }
  reader.onerror = e => {
    console.error(`Error: ${e.type}`)
  }

  reader.readAsText(file)

  return fileData
}