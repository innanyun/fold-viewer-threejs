import { VertexId, Vector2Coord, Vector3Coord } from './types'


//
// 2D vertex coords of square sheet centered at the origin (0, 0)
//
function _squareSheetVertexLocations (size: number): Array<Vector2Coord> {
  return [
    [-0.5, -0.5],
    [ 0.5, -0.5],
    [ 0.5,  0.5],
    [-0.5,  0.5],
  ].map(([u, v]) => [size * u, size * v])
}


function _squareSheetVertexIndices (): Array<VertexId> {
  return [0, 1, 2, 3]
}


//
// 3D vertex coords of square sheet from 2D counterparts
//
function squareSheetVertexPositions (size: number = 1.0)
: Array<Vector3Coord>
{
  return _squareSheetVertexLocations(size).map(([u, v]) => [u, v, 0.0])
}


interface Sheet {

  vertexPositions: () => Array<Vector3Coord>

  faceVertexIndices: () => Array<Array<VertexId>>
}


class SquareSheet implements Sheet {

  #_vertexPositions: Array<Vector3Coord>

  #_faceVertexIndices: Array<Array<VertexId>>

  vertexPositions(): Array<Vector3Coord> {
    return this.#_vertexPositions
  }

  faceVertexIndices(): Array<Array<VertexId>> {
    return this.#_faceVertexIndices
  }

  constructor(size: number = 1.0) {
    this.#_vertexPositions = squareSheetVertexPositions(size),
    this.#_faceVertexIndices = [_squareSheetVertexIndices()]
  }

}



export {
  Sheet, SquareSheet,
  squareSheetVertexPositions
}