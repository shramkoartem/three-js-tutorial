import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';
import { GUI } from 'dat.gui';

// A tree-like structure of Meshes, Lights, Groups, 3D Positions, Cameras (opt)
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x2c2c2e)

// Axis helper
scene.add(new THREE.AxesHelper(5))

// Describes the view boundaries of the scene within the Frustum dimensions
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

// Init camera position
camera.position.x = 4;
camera.position.y = 4;
camera.position.z = 4;

// Init renderer
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// Allows controling / rotating the scenery with your mouse
const controls = new OrbitControls(camera, renderer.domElement); 
controls.target.set(8,0,0);


// Ligts
const light1 = new THREE.PointLight();
light1.position.set(10,10,10);
scene.add(light1);

const light2 = new THREE.PointLight();
light2.position.set(-10,10,10)
scene.add(light2);

// Objects
// red ball
const object1 = new THREE.Mesh(
    new THREE.SphereGeometry(),
    new THREE.MeshPhongMaterial({ color: 0xff0000 })
)
object1.position.set(4,0,0);
scene.add(object1);
object1.add(new THREE.AxesHelper(5))

// green ball
const object2 = new THREE.Mesh(
    new THREE.SphereGeometry(),
    new THREE.MeshPhongMaterial({color: 0x00ff00})
)
object2.position.set(4,0,0);
object1.add(object2);
object2.add(new THREE.AxesHelper(5))

//blue ball
const object3 = new THREE.Mesh(
    new THREE.SphereGeometry(),
    new THREE.MeshPhongMaterial({ color: 0x0000ff })
)
object3.position.set(4, 0, 0)
object2.add(object3)
object3.add(new THREE.AxesHelper(5))

console.dir(scene);

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

controls.addEventListener('change', render) // re-renders only once controls were changed. render is a callback here

// stats panel
const stats = Stats();
document.body.appendChild(stats.dom)

// GUI param controller
const gui = new GUI();
const object1Folder = gui.addFolder('Object1')
object1Folder.add(object1.position, 'x', 0, 10, 0.01).name('X Position')
object1Folder
    .add(object1.rotation, 'x', 0, Math.PI * 2, 0.01)
    .name('X Rotation')
object1Folder.add(object1.scale, 'x', 0, 2, 0.01).name('X Scale')
object1Folder.open()
const object2Folder = gui.addFolder('Object2')
object2Folder.add(object2.position, 'x', 0, 10, 0.01).name('X Position')
object2Folder
    .add(object2.rotation, 'x', 0, Math.PI * 2, 0.01)
    .name('X Rotation')
object2Folder.add(object2.scale, 'x', 0, 2, 0.01).name('X Scale')
object2Folder.open()
const object3Folder = gui.addFolder('Object3')
object3Folder.add(object3.position, 'x', 0, 10, 0.01).name('X Position')
object3Folder
    .add(object3.rotation, 'x', 0, Math.PI * 2, 0.01)
    .name('X Rotation')
object3Folder.add(object3.scale, 'x', 0, 2, 0.01).name('X Scale')
object3Folder.open()



const debug = document.getElementById('debug1') as HTMLDivElement

// Main animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    render();
    const object1WorldPosition = new THREE.Vector3();
    object1.getWorldPosition(object1WorldPosition);
    const object2WorldPosition = new THREE.Vector3()
    object2.getWorldPosition(object2WorldPosition)
    const object3WorldPosition = new THREE.Vector3()
    object3.getWorldPosition(object3WorldPosition)
    debug.innerText =
        'Red\n' +
        'Local Pos X : ' +
        object1.position.x.toFixed(2) +
        '\n' +
        'World Pos X : ' +
        object1WorldPosition.x.toFixed(2) +
        '\n' +
        '\nGreen\n' +
        'Local Pos X : ' +
        object2.position.x.toFixed(2) +
        '\n' +
        'World Pos X : ' +
        object2WorldPosition.x.toFixed(2) +
        '\n' +
        '\nBlue\n' +
        'Local Pos X : ' +
        object3.position.x.toFixed(2) +
        '\n' +
        'World Pos X : ' +
        object3WorldPosition.x.toFixed(2) +
        '\n'
    stats.update()
    stats.update();
}

function render() {
    renderer.render(scene, camera)
}

animate();
