import { SquareSheet } from 'sheet/square_sheet'
import { View } from 'view/view'
import { SheetMeshBuilder } from 'view/sheet_mesh_builder'

import { SHEET_OPTIONS } from 'sheet/config'
import { VIEW_OPTIONS } from 'view/config'


new View(
  VIEW_OPTIONS,
  new SheetMeshBuilder(new SquareSheet(SHEET_OPTIONS.size))
)
