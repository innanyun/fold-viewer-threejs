import { SquareSheet } from 'sheet/square_sheet'
import { initFoldFileReader } from 'data/fold_file_reader'
import { FOLD_data } from 'data/fold_format'
import { FoldFileSheet } from 'data/fold_file_sheet'
import { specifyMeshMotion } from 'view/mesh_motion'
import { View } from 'view/view'
import { createSheetMesh } from 'view/sheet_mesh_builder'

import { SHEET_OPTIONS } from 'sheet/config'
import { VIEW_OPTIONS } from 'view/config'
// import { dumpSheet } from 'system/debug'


console.clear()

const foldData$ = initFoldFileReader()

const view = new View(
  VIEW_OPTIONS,
  createSheetMesh(new SquareSheet(SHEET_OPTIONS.size))
)


foldData$.subscribe({
  next: (data: FOLD_data) => {
    const
      newSheet = new FoldFileSheet(data),
      newMesh = createSheetMesh(newSheet)

    view.setMesh(newMesh)
    specifyMeshMotion(newMesh)

    // TODO: debug output
    // console.log(data)
    // dumpSheet(newSheet)
  }
})
