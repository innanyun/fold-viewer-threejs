import { SquareSheet } from 'sheet/square_sheet'
import { chooseLocalFoldFile$ } from 'data/choose_local_fold_file'
import { FoldFileSheet } from 'data/fold_file_sheet'
// import { specifyMotion } from 'view/mesh_motion'
import { View } from 'view/view'
import { createSheetMesh } from 'view/mesh_builder'

import { SHEET_OPTIONS } from 'sheet/config'
import { VIEW_OPTIONS } from 'view/config'


const
  view = new View(
    VIEW_OPTIONS, createSheetMesh(new SquareSheet(SHEET_OPTIONS.scale))
  ),
  foldData$ = chooseLocalFoldFile$(
    document.getElementById('controls') as HTMLDivElement
  )


foldData$.subscribe({
  next: foldData => {
    const
      newSheet = new FoldFileSheet(foldData),
      newMesh = createSheetMesh(newSheet)

    view.setMesh(newMesh)
    // specifyMotion(newMesh)
  }
})
