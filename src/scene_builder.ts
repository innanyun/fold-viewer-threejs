import * as THREE from 'three'


interface ISceneBuilder {

  createGeometry(): THREE.BufferGeometry

  createMaterial(): THREE.Material

}


export {
  ISceneBuilder
}
