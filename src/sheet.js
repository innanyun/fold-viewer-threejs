import { from } from 'rxjs'
import { pairwise, map, bufferCount, tap } from 'rxjs/operators'
import * as THREE from 'three'


export const _rawSheetVertex2dCoords = (size) => {
  return new Float64Array([
    -size * 0.5, -size * 0.5,
     size * 0.5, -size * 0.5,
     size * 0.5,  size * 0.5,
    -size * 0.5,  size * 0.5,
  ])
}


export const _rawSheetVertex3dCoords = (size=1.0) => {
  const
    vertex2dLocations = _rawSheetVertex2dCoords(size)
  let
    index = 0,
    vertex3dPositions = new Float64Array(vertex2dLocations.length / 2 * 3)

  from(vertex2dLocations).pipe(
    // 👉 [Group Consecutive Values Together with RxJS Operator
    // buffer](https://egghead.io/lessons/rxjs-group-consecutive-values-together-with-rxjs-operator-buffer)
    bufferCount(2),
    map(uv => [...uv, 0.0]),
    map(xyz => vertex3dPositions.set(xyz, index)),
    tap(x => index += 3)
  ).subscribe()

  return vertex3dPositions
}


export const createSheetGeometry = () => {
  return new THREE.ShapeGeometry(
    new THREE.Shape().setFromPoints(
      _rawSheetVertex3dCoords().map(v => new THREE.Vector2(...v))
    )
  )
}
