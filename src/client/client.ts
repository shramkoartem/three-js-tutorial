import * as THREE from 'three'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls'
import Stats from 'three/examples/jsm/libs/stats.module'

// scene, camera, renderer

const scene = new THREE.Scene();
scene.add(new THREE.AxesHelper());

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 2;
camera.position.y = 1;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

function render() {
    renderer.render(scene, camera);
};

// Controls 

const controls = new PointerLockControls(camera, renderer.domElement);

const menuPannel = document.getElementById('menuPanel') as HTMLDivElement;
const startButton = document.getElementById('startButton') as HTMLButtonElement;

startButton.addEventListener('click', () => {controls.lock()}, false)
controls.addEventListener('lock', () => { menuPannel.style.display = 'none' });
controls.addEventListener('unlock', () => { menuPannel.style.display = 'block' });

// Map movement

function onKeyDown (event: KeyboardEvent) {
    switch (event.code) {
        case 'KeyW':
            controls.moveForward(0.25);
            break;
        case 'KeyS':
            controls.moveForward(-0.25);
            break;
        case 'KeyA':
            controls.moveRight(-0.25);
            break
        case 'KeyD':
            controls.moveRight(0.25);
            break
    }
}
document.addEventListener('keydown', onKeyDown, false);
 
// Geometry

const planeGeom = new THREE.PlaneGeometry(100, 100, 50, 50);
const planeMaterial = new THREE.MeshBasicMaterial({wireframe: true});
const plane = new THREE.Mesh(planeGeom, planeMaterial);
plane.rotateX( Math.PI / 2);
scene.add(plane);

document.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
}, false);


function animate() {
    requestAnimationFrame( animate );

    render();
}

animate();