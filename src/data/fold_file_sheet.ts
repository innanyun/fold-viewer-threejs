import { Sheet } from 'sheet/sheet'
import { VertexId, Vector2Coord, Vector3Coord } from 'sheet/types'
import { FOLD_data } from './fold_format'


export class FoldFileSheet implements Sheet {

  private _verticesLocations: Array<Vector2Coord | undefined>
  private _verticesPositions: Array<Vector3Coord>
  private _facecVerticesIds: Array<Array<VertexId>>

  verticesLocations(): Array<Vector2Coord | undefined> { return this._verticesLocations }
  verticesPositions(): Array<Vector3Coord> { return this._verticesPositions }
  facesVerticesIds(): Array<Array<VertexId>> { return this._facecVerticesIds }

  constructor(foldData: FOLD_data) {
    const v = foldData.vertices_coords

    this._verticesLocations = v.map(v => v.length === 2 ? v as Vector2Coord: undefined)
    this._verticesPositions = v.map(v => (v.length === 3 ? v : [...v, 0]) as Vector3Coord)
    this._facecVerticesIds = foldData.faces_vertices as VertexId[][]
  }

}
