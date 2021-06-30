import * as THREE from 'three';


//
// JobKey stuff
//


export function createSheetGeometry () {
  const vertices = [
    [-0.5, -0.5],
    [ 0.5, -0.5],
    [ 0.5,  0.5],
    [-0.5,  0.5],
  ];

  return new THREE.ShapeGeometry(
    new THREE.Shape().setFromPoints(
      vertices.map(v => new THREE.Vector2(...v))
    )
  );
}
