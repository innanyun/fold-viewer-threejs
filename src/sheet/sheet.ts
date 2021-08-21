import { VertexId, Vector2Coord, Vector3Coord } from 'sheet/types'


export interface Sheet {

  verticesLocations(): (Vector2Coord | undefined)[]

  verticesPositions(): Vector3Coord[]

  facesVerticesIds(): VertexId[][]

}
