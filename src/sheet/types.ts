//
// type aliases
//
type VertexId = number
type EdgeId = number
type FaceId = number
type Vector2Coord = FixedLengthArray<number, 2>
type Vector3Coord = FixedLengthArray<number, 3>
type VectorCoord = FixedLengthArray<number, 2 | 3>


//
// [@semigradsky's fix for @colxi's solution to "Add a generic way to specify
// length of a tuple type
// #26223"](https://github.com/microsoft/TypeScript/issues/26223#issuecomment-622353532)
//
type ArrayLengthMutationKeys =
  | 'splice'
  | 'push'
  | 'pop'
  | 'shift'
  | 'unshift'
  | number
type ArrayItems<T extends Array<any>> = T extends Array<infer TItems> ? TItems : never
type Tuple<T extends any[]> = Pick<
  T,
  Exclude<keyof T, ArrayLengthMutationKeys>
> & { [Symbol.iterator]: () => IterableIterator<ArrayItems<T>> }

type FixedLengthArray<Type, Count extends number> =
  Count extends 1 ? Tuple<[Type]>
  : Count extends 2 ? Tuple<[Type, Type]>
  : Count extends 3 ? Tuple<[Type, Type, Type]>
  : // ...
  never

export type { VertexId, EdgeId, FaceId, Vector2Coord, Vector3Coord, VectorCoord }
