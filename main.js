import './style.css';
import * as THREE from 'three';
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  25,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(39);

const pointLight = new THREE.PointLight(0xffffff, 2, 95);

pointLight.position.set(20, 0, 37);

scene.add(pointLight);

// const sphereSize = 1;
// const pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
// scene.add(pointLightHelper);

// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(gridHelper);

//const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const starGeometry = new THREE.SphereGeometry(0.05, 24, 24);
  const starMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(starGeometry, starMaterial);
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(100).fill().forEach(addStar);

const moonTexture = new THREE.TextureLoader().load('./assets/moon.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(5, 100, 100),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
  })
);

moon.position.x = -5;
moon.position.y = 0;
moon.position.z = 10;

scene.add(moon);

const spaceBackground = new THREE.TextureLoader().load('assets/space2.jpg');
scene.background = spaceBackground;

function animate() {
  requestAnimationFrame(animate);

  moon.rotation.y += 0.001;

  // controls.update();
  renderer.render(scene, camera);
}

animate();
