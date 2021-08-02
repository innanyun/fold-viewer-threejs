import { VertexId, Vector2Coord, Vector3Coord } from './types'


interface Sheet {

  vertexLocations(): Array<Vector2Coord>

  vertexPositions(): Array<Vector3Coord>

  faceVertexIndices(): Array<Array<VertexId>>

}
