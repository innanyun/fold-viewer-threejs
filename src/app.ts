import { SquareSheet } from 'sheet/square_sheet'
import { chooseLocalFoldFile$ } from 'data/choose_local_fold_file'
import { FOLD_data } from 'data/fold_format'
import { FoldFileSheet } from 'data/fold_file_sheet'
// import { specifyMotion } from 'view/mesh_motion'
import { View } from 'view/view'
import { createSheetMesh } from 'view/mesh_builder'

import { SHEET_OPTIONS } from 'sheet/config'
import { VIEW_OPTIONS } from 'view/config'


console.clear()


const
  view = new View(
    VIEW_OPTIONS, createSheetMesh(new SquareSheet(SHEET_OPTIONS.scale))
  ),
  foldData$ = chooseLocalFoldFile$(
    document.getElementById('controls') as HTMLDivElement
  )


foldData$.subscribe({
  next: (data: FOLD_data): void => {
    const
      newSheet = new FoldFileSheet(data),
      newMesh = createSheetMesh(newSheet)

    view.setMesh(newMesh)
    // specifyMotion(newMesh)
  }
})
