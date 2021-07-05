import * as THREE from 'three'


//
// 2D vertex coords of square sheet centered at the origin (0, 0)
//
function _squareSheetVertexLocations (size: number): Array<[number, number]> {
  return [
    [-0.5, -0.5],
    [ 0.5, -0.5],
    [ 0.5,  0.5],
    [-0.5,  0.5],
  ].map(([u, v]) => [size * u, size * v])
}


//
// 3D vertex coords of square sheet from 2D counterparts
//
export function squareSheetVertexPositions (size: number = 1.0)
: Array<[number, number, number]>
{
  return _squareSheetVertexLocations(size).map(([u, v]) => [u, v, 0.0])
}


//
// Flat sheet geometry
//
export function createSheetGeometry (
  vertexPositions: Array<[number, number, number]>
): THREE.ShapeGeometry
{
  return new THREE.ShapeGeometry(
    new THREE.Shape().setFromPoints(
      vertexPositions.map(p => new THREE.Vector2(p[0], p[1]))
    )
  )
}
