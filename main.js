import "./style.css";
import * as THREE from "three";
import * as dat from "dat.gui";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { DoubleSide, Sphere, Vector2, Vector3 } from "three";

//gui
//const gui = new dat.GUI();

//texture loaders

const loader = new THREE.TextureLoader();
const saturnTexture = loader.load("./assets/jupiter1.jpg");
const map = loader.load("./assets/map.jpg");
const smoke = loader.load("./assets/smoke.png");
const alpha = loader.load("./assets/alpha.jpg");

//setting the essential
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  60,
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
sphere.position.y = -175;
sphere.position.x = -12;
sphere.position.z = -5;

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
const object = new THREE.Object3D();
scene.add(object);
const somkeGeo = new THREE.PlaneBufferGeometry(10, 10);
const somkeMaterial = new THREE.MeshLambertMaterial({
  transparent: true,
  map: smoke,
  depthTest: false,
  side: DoubleSide,
});

object.position.set(10.7, -88, 4.5);

let cloudes = [];
for (let i = -9; i <= 9; i++) {
  let cloude = new THREE.Mesh(somkeGeo, somkeMaterial);
  let cloude2 = new THREE.Mesh(somkeGeo, somkeMaterial);
  let x = Math.sqrt(81 - i * i);
  console.log(`x:  ${x}  i:  ${i}`);
  cloude.position.set(x, i, Math.floor(Math.random() * 5));
  cloude2.position.set(-x, i, Math.floor(Math.random() * 5));
  cloude.rotation.z = Math.floor(Math.random() * 360);
  cloude2.rotation.z = Math.floor(Math.random() * 360);
  cloudes.push(cloude, cloude2);
  object.add(cloude);
  object.add(cloude2);
}
//light

const pointLight = new THREE.PointLight(0xfcfcf7);
pointLight.intensity = 0.8;
pointLight.position.set(8, -170.8, 10.7);

const pointLight2 = new THREE.PointLight(0xf2ded8);
pointLight2.intensity = 0.5;
pointLight2.position.set(8, -158.7, 10.7);

const directionalLight = new THREE.DirectionalLight(0x404040);
directionalLight.position.set(-10, 11.4, 4.2);

const light = new THREE.AmbientLight(0x404040);

const pointLight3 = new THREE.PointLight(0x56226d, 10, 50);
pointLight3.position.set(30.7, -83.6, 8.7);

const pointLight4 = new THREE.PointLight(0x062d89, 5, 50, 1.7);
pointLight4.position.set(10.1, -98.7, 8.5);
pointLight4.lookAt(camera);

scene.add(pointLight4, pointLight3);
scene.add(pointLight, pointLight2, directionalLight);

// gui.add(object.position, "x").min(-200).max(200).step(0.1);
// gui.add(object.position, "y").min(-200).max(40).step(0.1);
// gui.add(object.position, "z").min(-200).max(40).step(0.1);
// gui.add(pointLight4, "intensity");

//helpers

const lightHelper = new THREE.PointLightHelper(pointLight);
const lightHelper2 = new THREE.PointLightHelper(pointLight2);
const lightHelper3 = new THREE.PointLightHelper(directionalLight);
const gridHelper = new THREE.GridHelper(200, 50);

const lightHelper4 = new THREE.PointLightHelper(pointLight3);

//scene.add(lightHelper3,lightHelper,lightHelper2)
//scene.add(lightHelper4);

// const controls = new OrbitControls(camera, renderer.domElement);

function moveScene() {
  let y = document.body.getBoundingClientRect().top;
  camera.position.y = y * 0.1;
  points.position.y = y * 0.1;
  console.log(y * 0.1);
}

document.body.onscroll = moveScene;

const clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);

  const elapsedTime = clock.getElapsedTime();

  sphere.rotation.y = 0.5 * elapsedTime;

  object.rotation.z = 0.5 * elapsedTime;
  cloudes.forEach((c) => {
    c.rotation.z += 2 * 0.005;
  });

  renderer.render(scene, camera);
}
animate();
