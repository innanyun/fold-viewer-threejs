import { VertexId, Vector2Coord, Vector3Coord } from 'sheet/types'


export interface Sheet {

  vertexLocations(): Array<Vector2Coord | undefined>

  vertexPositions(): Array<Vector3Coord>

  faceVertexIndices(): Array<Array<VertexId>>

}
