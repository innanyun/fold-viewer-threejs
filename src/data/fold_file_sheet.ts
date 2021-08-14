import { Sheet } from 'sheet/sheet'
import { VertexId, Vector2Coord, Vector3Coord } from 'sheet/types'
import { FOLD_data } from './fold_format'


export class FoldFileSheet implements Sheet {

  private _vertexLocations: Array<Vector2Coord | undefined>
  private _vertexPositions: Array<Vector3Coord>
  private _faceVertexIndices: Array<Array<VertexId>>

  verticesLocations(): Array<Vector2Coord | undefined> { return this._vertexLocations }
  verticesPositions(): Array<Vector3Coord> { return this._vertexPositions }
  facesVerticesIds(): Array<Array<VertexId>> { return this._faceVertexIndices }

  constructor(foldData: FOLD_data) {
    const v = foldData.vertices_coords

    this._vertexLocations = v.map(v => v.length === 2 ? v as Vector2Coord: undefined)
    this._vertexPositions = v.map(v => (v.length === 3 ? v : [...v, 0]) as Vector3Coord)
    this._faceVertexIndices = foldData.faces_vertices as VertexId[][]
  }

}
