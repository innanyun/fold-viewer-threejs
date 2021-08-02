import { Sheet } from 'sheet'


export class SquareSheet implements Sheet {

  private _vertexLocations: Array<Vector2Coord>
  private _vertexPositions: Array<Vector3Coord>
  private _faceVertexIndices: Array<Array<VertexId>>

  vertexLocations (): Array<Vector2Coord> { return this._vertexLocations }
  vertexPositions (): Array<Vector3Coord> { return this._vertexPositions }
  faceVertexIndices (): Array<Array<VertexId>> { return this._faceVertexIndices }

  constructor (size: number = 1.0) {
    this._vertexLocations = [
      [-0.5, -0.5],
      [ 0.5, -0.5],
      [ 0.5,  0.5],
      [-0.5,  0.5],
    ].map(([u, v]) => [size * u, size * v])

    this._vertexPositions = this._vertexLocations.map(([u, v]) => [u, v, 0.0])

    this._faceVertexIndices = [[0, 1, 2, 3]]
  }

}
