import "./style.css";
import * as THREE from "three";
import * as dat from "dat.gui";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Sphere } from "three";

//gui
const gui = new dat.GUI();

//texture loaders

const loader = new THREE.TextureLoader();
const saturnTexture = loader.load("./assets/jupiter1.jpg");
const map = loader.load("./assets/map.jpg");

//setting the essential
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  15,
  1000
);
camera.position.setZ(25);
camera.position.setY(1.6);
camera.position.setX(-3);
camera.rotateY(-0.12);

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
  alpha: true,
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, camera);

//sphere

const geometry = new THREE.SphereGeometry(10, 55, 55);
const material = new THREE.MeshStandardMaterial({ map: saturnTexture });
const sphere = new THREE.Mesh(geometry, material);

scene.add(sphere);

//stars

const vertices = [];

for (let i = 0; i < 3000; i++) {
  const x = THREE.MathUtils.randFloatSpread(100);
  const y = THREE.MathUtils.randFloatSpread(50);
  const z = THREE.MathUtils.randFloatSpread(50);

  vertices.push(x, y, z);
}

const pointsgeometry = new THREE.BufferGeometry();
pointsgeometry.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(vertices, 3)
);

const pointmaterial = new THREE.PointsMaterial({
  color: 0x888888,
  sizeAttenuation: false,
  size: 1,
  map: map,
});

const points = new THREE.Points(pointsgeometry, pointmaterial);
points.position.setZ(-20);

scene.add(points);

//cloude

//light

const pointLight = new THREE.PointLight(0xfcfcf7);
pointLight.intensity = 0.8;
pointLight.position.set(20, 4.2, 16.7);

const pointLight2 = new THREE.PointLight(0xf2ded8);
pointLight2.intensity = 0.5;
pointLight2.position.set(20, 16.3, 16.7);

const directionalLight = new THREE.DirectionalLight(0x404040);
directionalLight.position.set(-10, 11.4, 4.2);

const light = new THREE.AmbientLight(0x404040);

scene.add(pointLight, pointLight2, directionalLight, light);

/* gui.add(pointLight.position, 'x').min(-20).max(20).step(0.1)
gui.add(pointLight.position, 'y').min(-20).max(20).step(0.1)
gui.add(pointLight.position, 'z').min(-20).max(30).step(0.1)
gui.add(pointLight, 'intensity')*/

//helpers

const lightHelper = new THREE.PointLightHelper(pointLight);
const lightHelper2 = new THREE.PointLightHelper(pointLight2);
const lightHelper3 = new THREE.PointLightHelper(directionalLight);
const gridHelper = new THREE.GridHelper(200, 50);
//scene.add(lightHelper3,lightHelper,lightHelper2)
const controls = new OrbitControls(camera, renderer.domElement);

const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  const elapsedTime = clock.getElapsedTime();

  sphere.rotation.y = 0.5 * elapsedTime;

  renderer.render(scene, camera);
}
animate();
