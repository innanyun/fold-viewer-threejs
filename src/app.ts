import { SquareSheet } from 'sheet/square_sheet'
import { View } from 'view/view'
import { createSheetMesh } from 'view/sheet_mesh_builder'

import { SHEET_OPTIONS } from 'sheet/config'
import { VIEW_OPTIONS } from 'view/config'
import { initFoldFileReader } from 'data/fold_file_reader'
import { FOLD_data } from 'data/fold_format'
import { FoldFileSheet } from 'data/fold_file_sheet'
import { specifyMeshMotion } from 'view/mesh_motion'


console.clear()

const foldData$ = initFoldFileReader()

const view = new View(
  VIEW_OPTIONS,
  createSheetMesh(new SquareSheet(SHEET_OPTIONS.size))
)


foldData$.subscribe({next: (data: FOLD_data) => {
  const newMesh = createSheetMesh(new FoldFileSheet(data))
  view.setMesh(newMesh)
  specifyMeshMotion(newMesh)
}})