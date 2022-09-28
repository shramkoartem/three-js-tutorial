import * as THREE from 'three';
import { MapControls, OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Scene, Camera, Renderer

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement );
const render = () => {
    renderer.render( scene, camera );
}

// Orbit controller
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(1,1,1)
controls.enableDamping = true;
controls.dampingFactor = 0.01;
controls.listenToKeyEvents(document.body)

// Asimuth - how far can you turn along the radius
controls.minAzimuthAngle = 0;
controls.maxAzimuthAngle = Math.PI / 2;
controls.minPolarAngle = Math.PI / 2.5;
controls.maxPolarAngle = Math.PI / 2;
controls.minDistance = 4;
controls.maxDistance = 6;

// Objects
const geom = new THREE.BoxGeometry(1,2,1);
const material = new THREE.MeshBasicMaterial({color: "0x00ff00", wireframe: true});
const cube = new THREE.Mesh(geom ,material)
scene.add(cube);

const animate = () => {
    requestAnimationFrame( animate );

    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    
    controls.update();
    render();
}
animate();
