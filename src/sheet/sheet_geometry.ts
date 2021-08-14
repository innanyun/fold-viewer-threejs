import * as THREE from 'three'

import { Sheet } from 'sheet/sheet'
import { VertexId, Vector3Coord } from 'sheet/types'


export function createSheetGeometry (s: Sheet): THREE.BufferGeometry
{
  return _createFacesGeometry(s.verticesPositions(), s.facesVerticesIds())
}

function _createFacesGeometry(
  verticesPositions: Array<Vector3Coord>,
  allFacesVerticesIds: Array<Array<VertexId>>
): THREE.BufferGeometry {

  let g = new THREE.BufferGeometry()

  g.setIndex(
    allFacesVerticesIds.map(
      singleFaceVerticesIds => _tessellate(singleFaceVerticesIds)
    ).flat()
  )
  g.setAttribute(
    'position', new THREE.Float32BufferAttribute(verticesPositions.flat(), 3)
  )
  g.computeVertexNormals()

  return g
}


function _tessellate(faceVerticesIds: VertexId[]): VertexId[] {
  const
    geometryIndices = [],
    a = faceVerticesIds[0]

  for (let j = 1; j < faceVerticesIds.length - 1; j += 1) {
    const
      b = faceVerticesIds[j],
      c = faceVerticesIds[j + 1]

    geometryIndices.push(a, b, c)
  }

  return geometryIndices
}
