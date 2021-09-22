import { Sheet } from 'sheet/sheet'
import { VertexId, Vector2Coord, Vector3Coord } from 'sheet/types'
import { FOLD_data } from 'data/fold_format'


class FoldFileSheet implements Sheet {

  private _verticesLocations: Vector2Coord[]
  private _verticesPositions: Vector3Coord[]
  private _facesVerticesIds: VertexId[][]

  verticesLocations(): Vector2Coord[] { return this._verticesLocations }
  verticesPositions(): Vector3Coord[] { return this._verticesPositions }
  facesVerticesIds(): VertexId[][] { return this._facesVerticesIds }

  constructor(foldData: FOLD_data) {
    const v = foldData.vertices_coords

    this._verticesLocations = v.map(v => v.length === 2 ? v as Vector2Coord : v as never)
    this._verticesPositions = v.map(v => (v.length === 3 ? v : [...v, 0]) as Vector3Coord)
    this._facesVerticesIds = foldData.faces_vertices as VertexId[][]
  }

}


export { FoldFileSheet }
