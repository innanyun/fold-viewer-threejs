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
    const
      v = foldData.vertices_coords,
      twoDimensionalVerticesCoords = v.every(coords => coords.length === 2)

    this._verticesLocations = twoDimensionalVerticesCoords ?
      v.map(([u, v]) => [u, v]) : []

    this._verticesPositions = twoDimensionalVerticesCoords ?
      v.map(([u, v]) => [u, v, 0]) : v.map(xyz => xyz as Vector3Coord)

    this._facesVerticesIds = foldData.faces_vertices ?? []
  }

}


export { FoldFileSheet }
