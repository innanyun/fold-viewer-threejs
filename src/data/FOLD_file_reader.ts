import { FOLD_data } from 'data/FOLD_format';


export function readFoldFile(url: string): FOLD_data | undefined {
  let
    xhr = new XMLHttpRequest(),
    foldData: FOLD_data

  xhr.open('GET', url, /*async=*/false)
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200 || xhr.status === 0) {
        foldData = JSON.parse(xhr.responseText)
      } else {
        console.log(`Reading file failed: ${url}`)
      }
    }
  }
  xhr.send()

  return foldData! as FOLD_data
}
