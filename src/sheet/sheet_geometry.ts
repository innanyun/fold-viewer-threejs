import * as THREE from 'three'

import { Sheet } from 'sheet/sheet'
import { VertexId } from 'sheet/types'


// Whole sheet as a SINGLE geometry
function createSheetGeometry (s: Sheet): THREE.BufferGeometry {
  const
    geometry = new THREE.BufferGeometry()

  geometry
    .setAttribute(
      'position',
      new THREE.Float32BufferAttribute(s.verticesPositions().flat(), 3)
    )
    .setIndex(
      s.facesVerticesIds().map((aFaceVertices) => _tessellate(aFaceVertices)).flat()
    )
    .computeVertexNormals()

  return geometry.center()
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


export { createSheetGeometry }
