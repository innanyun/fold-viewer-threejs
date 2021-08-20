import * as THREE from 'three'

import { Sheet } from 'sheet/sheet'
import { VertexId, Vector3Coord } from 'sheet/types'


export function createSheetGeometry (s: Sheet): THREE.BufferGeometry
{
  return _createFacesGeometry(s.verticesPositions(), s.facesVerticesIds()).center()
}


function _createFacesGeometry(
  verticesCoords: Vector3Coord[], facesVertices: VertexId[][]
): THREE.BufferGeometry {
  let geometry = new THREE.BufferGeometry()

  geometry.setAttribute(
    'position', new THREE.Float32BufferAttribute(verticesCoords.flat(), 3)
  )
  geometry.setIndex(
    facesVertices.map((aFaceVertices) => _tessellate(aFaceVertices)).flat()
  )
  geometry.computeVertexNormals()

  return geometry;
}


function _tessellate(polygonVertices: VertexId[]): VertexId[] {
  const vertexCount = polygonVertices.length

  if (vertexCount <= 3) {
    return polygonVertices // no need to tessellate
  }

  const indices = []
  const a = polygonVertices[0]

  for (let j = 1; j < polygonVertices.length - 1; j += 1) {
    const b = polygonVertices[j]
    const c = polygonVertices[j + 1]

    indices.push(a, b, c)
  }

  return indices
}
