import { gsap } from 'gsap'


export function specifySheetMotion(mesh) {
  gsap.to(mesh.rotation, {
    delay: 1, duration: 3,
    x: Math.PI,
    y: -Math.PI,
    z: Math.PI,
    repeat: -1,
    yoyo: true
  })
}
