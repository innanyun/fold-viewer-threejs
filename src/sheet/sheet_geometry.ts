import * as THREE from 'three'

import { Sheet } from 'sheet/sheet'
import { VertexId, Vector3Coord } from 'sheet/types'


export function createSheetGeometry (s: Sheet): THREE.BufferGeometry
{
  return new THREE.ShapeGeometry(
    s.faceVertexIndices().map(
      faceVertexIds => _createFaceShape(s.vertexPositions(), faceVertexIds)
    )
  )
}


function _createFaceShape(
  vertexPositions: Array<Vector3Coord>,
  faceVertexIndices: Array<VertexId>
): THREE.Shape {
  return new THREE.Shape().setFromPoints(
    faceVertexIndices.map((i: VertexId) => {
      const p = vertexPositions[i]
      return new THREE.Vector2(p[0], p[1])
    })
  )
}
