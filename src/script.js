import './style.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

/**
 * Base
 */
// Debug
 const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

/**
 * House
 */
// Group
const house = new THREE.Group();
scene.add(house);

// Walls
const walls = new THREE.Mesh(
    new THREE.BoxBufferGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({color: '#ac8e82'})
);
walls.position.y = 2.5 * .5
house.add(walls);

// Roof
const roof = new THREE.Mesh(
    new THREE.ConeBufferGeometry(3.5, 1, 4),
    new THREE.MeshStandardMaterial({color: '#b35f45'})
);
roof.rotation.y = Math.PI * .25;
roof.position.y = 2.5 + 1 * .5;
house.add(roof);

// Door
const door = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(2, 2),
    new THREE.MeshStandardMaterial({color: 'red'})
);
door.position.z = (4 * .5) + .01;
door.position.y = (2 * .5);
house.add(door);

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(20, 20),
    new THREE.MeshStandardMaterial({color: '#a9c388'})
);
floor.rotation.x = - Math.PI * .5;
floor.position.y = 0;
scene.add(floor);

// Bushes
const bushGeometry = new THREE.SphereBufferGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial({color: '#89c854'});

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.scale.set(.5, .5, .5);
bush1.position.set(.8, .2, 2.2);

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.scale.set(.25, .25, .25);
bush2.position.set(1.4, .1, 2.1);

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.scale.set(.4, .4, .4);
bush3.position.set(-.8, .1, 2.2);

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.scale.set(.15, .15, .15);
bush4.position.set(-1, .05, 2.6);

house.add(bush1, bush2, bush3, bush4);

/**
 * Lights
 */
 const ambientLight = new THREE.AmbientLight(0xffffff, .5);
 scene.add(ambientLight);
 
 gui.add(ambientLight, 'intensity').min(0).max(1).step(.001);
 
 const directionalLight = new THREE.DirectionalLight(0xffffff, .3);
 directionalLight.position.set(2, 2, -1);
 scene.add(directionalLight);
 
 gui.add(directionalLight, 'intensity').min(0).max(1).step(.001);
 gui.add(directionalLight.position, 'x').min(-5).max(5).step(.001);
 gui.add(directionalLight.position, 'y').min(-5).max(5).step(.001);
 gui.add(directionalLight.position, 'z').min(-5).max(5).step(.001);


/**
 * Cursor
 */
const cursor = {
    x: 0,
    y: 0
};
window.addEventListener('mousemove', (e) => {
    cursor.x = e.clientX / sizes.width - .5;
    cursor.y = - (e.clientY / sizes.height - .5);
});

/**
 *  Sizes
 */ 
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update Sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update Renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Double Click FullScreen
window.addEventListener('dblclick', () => {
    // For Safari Support
    const fulscreenElement = document.fullscreenElement || document.webkitFullscreenElement;
    if(!fulscreenElement){
        if(canvas.requestFullscreen()){
            canvas.requestFullscreen();
        } else if(canvas.webkitRequestFullscreen()){
            canvas.webkitRequestFullscreen();
        }
    } else{
        if(document.exitFullscreen())
        document.exitFullscreen();
    }
});

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, .1, 100);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const clock = new THREE.Clock();
const tick = () =>
{
    // Clock
    const elapsedTime = clock.getElapsedTime();

    // Updadate Controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
};

tick();