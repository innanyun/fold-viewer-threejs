import * as THREE from 'three';
import * as dat from 'dat.gui'
import { gsap } from 'gsap'


// JobKey stuff

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


// Three.JS stuff


let scene, camera, renderer, mesh;


function initScene () {
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


function animateScene () {
  renderer.render(scene, camera);

  window.requestAnimationFrame(animateScene);
}


function initDatGUI () {
  const gui = new dat.GUI({name: 'JobKey II'});

  const
    sheetOptions = {
      color: 0x00ff00
    }

  gui.addFolder('Sheet').addColor(sheetOptions, 'color')

  const
    renderOptions = {
      z: 5.0,
      wireframe: false,
      FOV: 75,
      near: 0.1,
      far: 1000
    },
    renderOptionsFolder = gui.addFolder('Render')

  renderOptionsFolder.add(renderOptions, 'z').min(0).max(50).step(5)
  renderOptionsFolder.add(renderOptions, 'FOV').min(0).max(125).step(25)
  renderOptionsFolder.add(renderOptions, 'near').min(0).max(1).step(0.1)
  renderOptionsFolder.add(renderOptions, 'far').min(5).max(100).step(10)
  renderOptionsFolder.add(renderOptions, 'wireframe')
}


/* window book-keeping */


function onWindowLoad (_unusedEvent = null) {
  initScene();
  animateScene();
  onWindowResize();
  initDatGUI()

  gsap.to(mesh.rotation, {
    delay: 1, duration: 2, x: 2, y:-2, z:1, repeat: -1, yoyo: true
  });
}


function onWindowResize (_unusedEvent = null) {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}


// bind events to handlers
window.addEventListener('load', onWindowLoad);
window.addEventListener('resize', onWindowResize);
