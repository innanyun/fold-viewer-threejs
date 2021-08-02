import * as THREE from 'three'


export interface SceneBuilder {

  createGeometry(): THREE.BufferGeometry

  createMaterial(): THREE.Material

}
