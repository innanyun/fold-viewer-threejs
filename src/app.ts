import { SheetMeshBuilder } from 'view/sheet_mesh_builder'
import { View } from 'view/view'
import { VIEW_OPTIONS } from 'view/config'
import { SquareSheet } from 'sheet/square_sheet'
import { SHEET_OPTIONS } from 'sheet/config'


new View(
  VIEW_OPTIONS,
  new SheetMeshBuilder(new SquareSheet(SHEET_OPTIONS.size))
);
