import { VertexId, Vector2Coord, Vector3Coord } from 'sheet/types'


export interface Sheet {

  verticesLocations(): Array<Vector2Coord | undefined>

  verticesPositions(): Array<Vector3Coord>

  facesVerticesIds(): Array<Array<VertexId>>

}
