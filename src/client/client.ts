import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DragControls } from 'three/examples/jsm/controls/DragControls';
import Stats from 'three/examples/jsm/libs/stats.module'

// scene, camera, renderer

const scene = new THREE.Scene();
scene.add( new THREE.AxesHelper(5) );
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 5;
camera.position.y = 1;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement );

const render = () => {
    renderer.render(scene, camera);
}

// resize event listener
const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
}
window.addEventListener('resize', onWindowResize, false);


// Geometry

// Plane
const planeGeom = new THREE.PlaneGeometry(100, 100, 50, 50);
const planeMaterial = new THREE.MeshBasicMaterial({wireframe: true});
const plane = new THREE.Mesh(planeGeom, planeMaterial);
plane.rotateX(Math.PI / 2);
scene.add(plane);

// Cube
const cubeGeom = new THREE.BoxGeometry(1,1,1);
const cubeMaterial = new THREE.MeshNormalMaterial({transparent: true});
const cube = new THREE.Mesh(cubeGeom, cubeMaterial);
cube.position.y = 1;
scene.add(cube);

// controls
const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.minAzimuthAngle = 0;
orbitControls.maxAzimuthAngle = Math.PI / 4;
orbitControls.minPolarAngle = Math.PI / 4;
orbitControls.maxPolarAngle = Math.PI / 2
const dragControls = new DragControls([cube], camera, renderer.domElement);

dragControls.addEventListener('dragstart', (event) => {
    orbitControls.enabled = false;
    event.object.material.opacity = 0.5;
})

dragControls.addEventListener('dragend', (event) => {
    orbitControls.enabled = true;
    event.object.material.opacity = 1;
})

// stats
const stats = Stats();
document.body.appendChild(stats.dom);

// animation
const animate = () => {
    requestAnimationFrame( animate );
    render();
    stats.update();
}

animate();
