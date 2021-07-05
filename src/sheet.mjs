import * as THREE from 'three'


//
// 2D vertex coords of square sheet centered at the origin (0, 0)
//
const _squareSheetVertexLocations = size => [
  [-0.5, -0.5],
  [ 0.5, -0.5],
  [ 0.5,  0.5],
  [-0.5,  0.5],
].map(([u, v]) => [size * u, size * v])


//
// 3D vertex coords of square sheet from 2D counterparts
//
export const squareSheetVertexPositions = (size=1.0) =>
  _squareSheetVertexLocations(size).map(([u, v]) => [u, v, 0.0])


//
// Flat sheet geometry
//
export const createSheetGeometry = vertexPositions => new THREE.ShapeGeometry(
  new THREE.Shape().setFromPoints(
    vertexPositions.map(p => new THREE.Vector2(...p))
  )
)
