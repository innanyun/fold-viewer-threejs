import * as THREE from 'three'

import { squareSheetVertexPositions, createSheetGeometry } from './sheet'
import { specifySheetMotion } from './sheet_motion'
import { SHEET_OPTIONS, RENDER_OPTIONS } from './config'
import { initDatGUI } from './debug'


//
// Three.JS stuff
//


let scene, camera, renderer, mesh;


function initScene ({fov, near, far}) {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    fov,  // field of view
    window.innerWidth / window.innerHeight,  // aspect ratio
    near,  // near plane of viewing frustum
    far    // far plane of viewing frustum
  );
  camera.position.z = 5;

  const
    geometry = createSheetGeometry(squareSheetVertexPositions()),
    material = new THREE.MeshStandardMaterial(
      { color: SHEET_OPTIONS.color, side: THREE.DoubleSide }
    );

  mesh = new THREE.Mesh(geometry, material);

  let light = new THREE.PointLight(0xffffff);
  light.position.set(-10, 40, 10);

  scene.background = new THREE.Color(RENDER_OPTIONS.backgroundColor)
  scene.add(mesh);
  scene.add(light);

  scene.add(new THREE.AxesHelper())

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
}


function animateScene () {
  renderer.render(scene, camera);
  window.requestAnimationFrame(animateScene);
}


//
// window book-keeping
//


function onWindowLoad (_unusedEvent = null) {
  initScene(RENDER_OPTIONS);
  animateScene();
  onWindowResize();
  initDatGUI(scene, mesh, camera)
  specifySheetMotion(mesh)
}


function onWindowResize (_unusedEvent = null) {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}


//
// bind events to handlers
//


window.addEventListener('load', onWindowLoad);
window.addEventListener('resize', onWindowResize);
