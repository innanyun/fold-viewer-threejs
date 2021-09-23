import { Sheet } from 'sheet/sheet'
import { VertexId, Vector2Coord, Vector3Coord } from 'sheet/types'
import { FOLD_data } from 'data/fold_format'


class FoldFileSheet implements Sheet {

  private _verticesLocations?: Vector2Coord[]
  private _verticesPositions: Vector3Coord[]
  private _facesVerticesIds: VertexId[][]

  verticesLocations(): Vector2Coord[] | undefined { return this._verticesLocations }
  verticesPositions(): Vector3Coord[] { return this._verticesPositions }
  facesVerticesIds(): VertexId[][] { return this._facesVerticesIds }

  constructor(foldData: FOLD_data) {
    const
      v = foldData.vertices_coords,
      twoDimensionalVerticesCoords = v.every(coords => coords.length === 2)

    this._verticesLocations = twoDimensionalVerticesCoords ?
      v.map(uv => uv as Vector2Coord) : undefined
    this._verticesPositions = twoDimensionalVerticesCoords ?
      v.map(uv => [...uv, 0] as unknown as Vector3Coord) :
      v.map(xyz => xyz as Vector3Coord)
    this._facesVerticesIds = foldData.faces_vertices as VertexId[][]
  }

}


export { FoldFileSheet }
