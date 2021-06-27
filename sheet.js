import * as THREE from 'three';
import * as dat from 'dat.gui'
import { gsap } from 'gsap'


// const gui = new dat.GUI();


function createSheetGeometry () {
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


let scene, camera, renderer, mesh;


function init () {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    75,  // field of view
    window.innerWidth / window.innerHeight,  // aspect ratio
    0.1,  // near plane of viewing frustum
    1000  // far plane of viewing frustum
  );
  camera.position.z = 5;

  const
    geometry = createSheetGeometry(),
    material = new THREE.MeshLambertMaterial(
      {color: 0x00ff00, side: THREE.DoubleSide}
    );

  mesh = new THREE.Mesh(geometry, material);

  let light = new THREE.PointLight(0xffffff);
  light.position.set(-10, 40, 10);

  scene.add(mesh);
  scene.add(light);

  scene.add(new THREE.AxesHelper())

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
}


function animate () {
  renderer.render(scene, camera);

  window.requestAnimationFrame(animate);
}


/* window book keeping */


function onWindowLoad (_unusedEvent = null) {
  init();
  animate();
  onWindowResize();

  gsap.to(mesh.rotation, {
    delay: 1, duration: 2, x: 2, y:-2, z:1, repeat: -1, yoyo: true
  });
}


function onWindowResize (_unusedEvent = null) {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}


window.addEventListener('load', onWindowLoad);
window.addEventListener('resize', onWindowResize);
