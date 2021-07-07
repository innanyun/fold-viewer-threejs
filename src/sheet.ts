import { VertexId, Vector2Coord, Vector3Coord } from './types'


interface Sheet {

  vertexLocations: () => Array<Vector2Coord>

  vertexPositions: () => Array<Vector3Coord>

  faceVertexIndices: () => Array<Array<VertexId>>

}


class SquareSheet implements Sheet {

  #_vertexLocations: Array<Vector2Coord>
  #_vertexPositions: Array<Vector3Coord>
  #_faceVertexIndices: Array<Array<VertexId>>

  vertexLocations (): Array<Vector2Coord> { return this.#_vertexLocations }
  vertexPositions (): Array<Vector3Coord> { return this.#_vertexPositions }
  faceVertexIndices (): Array<Array<VertexId>> { return this.#_faceVertexIndices}

  constructor (size: number = 1.0) {
    this.#_vertexLocations = [
      [-0.5, -0.5],
      [ 0.5, -0.5],
      [ 0.5,  0.5],
      [-0.5,  0.5],
    ].map(([u, v]) => [size * u, size * v])
    this.#_vertexPositions = this.#_vertexLocations.map(([u, v]) => [u, v, 0.0])
    this.#_faceVertexIndices = [[0, 1, 2, 3]]
  }

}



export {
  Sheet, SquareSheet
}
