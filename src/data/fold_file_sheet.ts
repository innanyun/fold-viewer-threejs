import { Sheet } from 'sheet/sheet'
import { VertexId, Vector2Coord, Vector3Coord } from 'sheet/types'
import { FOLD_data } from './fold_format'


export class FoldFileSheet implements Sheet {

  private _verticesLocations: (Vector2Coord | undefined)[]
  private _verticesPositions: Vector3Coord[]
  private _facesVerticesIds: VertexId[][]

  verticesLocations(): (Vector2Coord | undefined)[] { return this._verticesLocations }
  verticesPositions(): Vector3Coord[] { return this._verticesPositions }
  facesVerticesIds(): VertexId[][] { return this._facesVerticesIds }

  constructor(foldData: FOLD_data) {
    const v = foldData.vertices_coords

    this._verticesLocations = v.map(v => v.length === 2 ? v as Vector2Coord: undefined)
    this._verticesPositions = v.map(v => (v.length === 3 ? v : [...v, 0]) as Vector3Coord)
    this._facesVerticesIds = foldData.faces_vertices as VertexId[][]
  }

}
