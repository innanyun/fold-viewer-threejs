import * as THREE from 'three'
import { gsap } from 'gsap'


function specifyMotion(mesh: THREE.Object3D): void {
  gsap.to(mesh.rotation, {
    delay: 1, duration: 3,
    x: Math.PI,
    y: -Math.PI,
    z: Math.PI,
    repeat: -1,
    yoyo: true
  })
}


export { specifyMotion }
