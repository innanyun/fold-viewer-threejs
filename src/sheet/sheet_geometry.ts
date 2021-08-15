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


function _tessellate(polygonVerticesIds: VertexId[]): VertexId[] {
  const
    indices = [],
    a = polygonVerticesIds[0]

  for (let j = 1; j < polygonVerticesIds.length - 1; j += 1) {
    const
      b = polygonVerticesIds[j],
      c = polygonVerticesIds[j + 1]

    indices.push(a, b, c)
  }

  return indices
}
