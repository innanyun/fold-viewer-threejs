import * as THREE from 'three';
import * as dat from 'dat.gui'
import { gsap } from 'gsap'


//
// JobKey stuff
//


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


//
// Three.JS stuff
//


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
    material = new THREE.MeshStandardMaterial(
      {color: SHEET_OPTIONS.color, side: THREE.DoubleSide}
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
// debug UI
//


const
  SHEET_OPTIONS = {
    color: 0x00ff00
  },
  RENDER_OPTIONS = {
    backgroundColor: '#ceedce',
  }


function initDatGUI (mesh, camera) {
  const
    gui = new dat.GUI({name: 'JobKey II'}),
    sheetOptions = gui.addFolder('Sheet'),
    renderOptions = gui.addFolder('Render')

  sheetOptions.addColor(SHEET_OPTIONS, 'color').onChange(
    newColor => mesh.material.color.set(newColor)
  )
  sheetOptions.open()

  renderOptions.addColor(RENDER_OPTIONS, 'backgroundColor').onChange(
    newColor => scene.background.set(newColor)
  )
  renderOptions.add(camera.position, 'z').min(5).max(30).step(5).listen()
  // renderOptions.add(camera, 'fov').min(0).max(125).step(25).listen()
  renderOptions.add(mesh.material, 'wireframe').listen()
  renderOptions.open()
}


//
// window book-keeping
//


function onWindowLoad (_unusedEvent = null) {
  initScene();
  animateScene();
  onWindowResize();
  initDatGUI(mesh, camera)

  gsap.to(mesh.rotation, {
    delay: 1, duration: 2, x: 2, y:-2, z:1, repeat: -1, yoyo: true
  });
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
