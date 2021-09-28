import { Sheet } from 'sheet/sheet'
import { VertexId, Vector2Coord, Vector3Coord } from 'sheet/types'


class SquareSheet implements Sheet {

  private _verticesLocations: Vector2Coord[]
  private _verticesPositions: Vector3Coord[]
  private _facesVerticesIds: VertexId[][]

  verticesLocations (): Vector2Coord[] { return this._verticesLocations }
  verticesPositions (): Vector3Coord[] { return this._verticesPositions }
  facesVerticesIds (): VertexId[][] { return this._facesVerticesIds }

  constructor(size = 1.0) {
    this._verticesLocations = [
      [-0.5, -0.5],
      [ 0.5, -0.5],
      [ 0.5,  0.5],
      [-0.5,  0.5],
    ].map(([u, v]) => [size * u, size * v])

    this._verticesPositions = this._verticesLocations.map(
      ([u, v]) => [u, v, 0.0]
    )

    this._facesVerticesIds = [[0, 1, 2, 3]]
  }

}


export { SquareSheet }
