import { SquareSheet } from 'sheet/square_sheet'
import { FoldFileSheet } from 'data/FOLD_sheet';
import { View } from 'view/view'
import { SheetMeshBuilder } from 'view/sheet_mesh_builder'

import { SHEET_OPTIONS } from 'sheet/config'
import { VIEW_OPTIONS } from 'view/config'


const
  defaultSheet = new SquareSheet(SHEET_OPTIONS.size),
  fileSheet = new FoldFileSheet(
    'http://localhost:3000/src/data/test-data/passed/crane.json'
  );

new View(VIEW_OPTIONS, new SheetMeshBuilder(
  // defaultSheet
  fileSheet
))


console.log(fileSheet)