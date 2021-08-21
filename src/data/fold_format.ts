import { Vector2Coord, Vector3Coord, VertexId, EdgeId, FaceId } from 'sheet/types'


type FOLD_data = FOLD_file_metadata & FOLD_frame_data

type FOLD_frame_data =
  | FOLD_single_frame_data
  | FOLD_single_frame_data & FOLD_multi_frame_data

type FOLD_single_frame_data = FOLD_frame_metadata & FOLD_geometric_data

type CustomProperty = string


interface FOLD_file_metadata {
  file_spec: number
  file_creator?: string
  file_author?: string
  file_title?: string
  file_description?: string
  file_classes?: Array<
    ('singleModel' | 'multiModel') | 'animation' | 'diagrams' | CustomProperty
  >
}


interface FOLD_frame_metadata {
  frame_author?: string
  frame_title?: string
  frame_description?: string
  frame_classes?: Array<
    'creasePattern' | 'foldedForm' | 'graph' | 'linkage' | CustomProperty
  >
  frame_attributes?: Array<
    | ('2D' | '3D')
    | 'abstract'
    | ('manifold' | 'nonManifold')
    | ('orientable' | 'nonOrientable')
    | ('selfTouching' | 'nonSelfTouching')
    | ('selfIntersecting' | 'nonSelfIntersecting')
    | CustomProperty
  >
  frame_unit?:
    | 'unit'
    | 'in'
    | 'pt'
    | 'm'
    | 'cm'
    | 'mm'
    | 'um'
    | 'nm'
}


interface FOLD_multi_frame_data {
  file_frames: Array<FOLD_single_frame_data>
}


interface FOLD_geometric_data {
  vertices_coords: Array<Vector2Coord | Vector3Coord>
  vertices_vertices?: Array<Array<VertexId>>
  vertices_faces?: Array<Array<FaceId>>

  edges_vertices: Array<[VertexId, VertexId]>
  edges_faces?: Array<[FaceId, FaceId | null] | FaceId>
  edges_assignment?: Array<
    | 'B'
    | 'M'
    | 'V'
    | 'F'
    | 'U'
  >
  edges_foldAngle?: Array<
    | number
    /*TODO: spec says only `number` but some files from the field have `null`s*/
    | null
  >
  edges_length?: Array<number>

  faces_vertices?: Array<Array<VertexId>>
  faces_edges?: Array<Array<EdgeId>>
  faceOrders?: Array<[FaceId, FaceId, 1 | -1 | 0]>
  edgeOrders?: Array<[EdgeId, EdgeId, 1 | -1 | 0]>
}


export {
  FOLD_data
}
