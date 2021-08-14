import { Sheet } from 'sheet/sheet'
import { VertexId, Vector2Coord, Vector3Coord } from 'sheet/types'


export class SquareSheet implements Sheet {

  private _verticesLocations: Array<Vector2Coord>
  private _verticesPositions: Array<Vector3Coord>
  private _facesVerticesIds: Array<Array<VertexId>>

  verticesLocations (): Array<Vector2Coord> { return this._verticesLocations }
  verticesPositions (): Array<Vector3Coord> { return this._verticesPositions }
  facesVerticesIds (): Array<Array<VertexId>> { return this._facesVerticesIds }

  constructor(size: number = 1.0) {
    this._verticesLocations = [
      [-0.5, -0.5],
      [ 0.5, -0.5],
      [ 0.5,  0.5],
      [-0.5,  0.5],
    ].map(([u, v]) => [size * u, size * v])

    this._verticesPositions = this._verticesLocations.map(([u, v]) => [u, v, 0.0])

    this._facesVerticesIds = [[0, 1, 2, 3]]
  }

}
