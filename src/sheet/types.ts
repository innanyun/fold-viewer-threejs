import { FixedLengthArray } from 'types'


//
// type aliases
//
type VertexId = number
type EdgeId = number
type FaceId = number
type Vector2Coord = FixedLengthArray<number, 2>
type Vector3Coord = FixedLengthArray<number, 3>
type VectorCoord = Vector2Coord | Vector3Coord


export type { VertexId, EdgeId, FaceId, Vector2Coord, Vector3Coord, VectorCoord }
