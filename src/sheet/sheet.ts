import { VertexId, Vector2Coord, Vector3Coord } from 'sheet/types'


interface Sheet {

  verticesLocations(): Vector2Coord[]

  verticesPositions(): Vector3Coord[]

  facesVerticesIds(): VertexId[][]

}


export type { Sheet }
