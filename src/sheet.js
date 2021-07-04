import * as THREE from 'three'


// 좌표계원점(0, 0)에 중심을 놓은 한변의 길이가 `size`인 정4각형도형의 정점좌표들을 생성한다.
export const _squareSheetVertexLocations = (size) => [
  [-0.5, -0.5],
  [ 0.5, -0.5],
  [ 0.5,  0.5],
  [-0.5,  0.5],
].map(([u, v]) => [size * u, size * v])



// `_squareSheetVertexLocations()`으로 생성된 정4각형(2차원)의 정점에
// z성분을 추가하여 3차원도형으로 만든다.
export const _squareSheetVertexPositions = (size=1.0) =>
  _squareSheetVertexLocations(size).map(([u, v]) => [u, v, 0.0])


export const createSheetGeometry = (vertexPositions) => {
  return new THREE.ShapeGeometry(
    new THREE.Shape().setFromPoints(
      vertexPositions.map(v => new THREE.Vector2(...v))
    )
  )
}
