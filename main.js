import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
}); 

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30); 

renderer.render( scene, camera ); 

const waveTexture = new THREE.TextureLoader().load('waves.jpg')
const geometry = new THREE.TorusGeometry(10, 3, 16, 100 )
const material = new  THREE.MeshStandardMaterial({map: waveTexture});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,5,5)  

const ambientLight = new THREE.AmbientLight(0xfffffff);

scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(50,50); 
scene.add(lightHelper, gridHelper); 

const controls = new OrbitControls(camera, renderer.domElement); 

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25,24,24);
  const material = new THREE.MeshStandardMaterial({color: 0xffff});
  const star = new THREE.Mesh( geometry, material); 

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x,y,z); 

  scene.add(star);
}

Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('ivana-cajina-asuyh-_ZX54-unsplash.jpg');
scene.background = spaceTexture; 

const jeffTexture = new THREE.TextureLoader().load('james-day-5YWf-5hyZcw-unsplash.jpg');

const jeff = new THREE.Mesh(
  new THREE.SphereGeometry(5,60,60),
  new THREE.MeshBasicMaterial({map: jeffTexture})
);

scene.add(jeff); 
jeff.position.set(30,0,30);

const moonTexture = new THREE.TextureLoader().load('waves.jpg');
const wrinkleTexture = new THREE.TextureLoader().load('NormalMap.jpg'); 
const moonShape = new THREE.SphereGeometry(5, 60, 60); 
const moonMesh = new THREE.Mesh(
  moonShape, 
  new THREE.MeshStandardMaterial({
    map: (moonTexture),
    normalMap: (wrinkleTexture)})
);
scene.add(moonMesh);
moonMesh.position.z = 30; 
moonMesh.position.setX(-10); 

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moonMesh.rotation.x += 1;
  moonMesh.rotation.y += 1; 
  moonMesh.rotation.z += 0.1;
  moonMesh.position.z += 1;  

  jeff.rotation.y += 0.01;
  jeff.rotation.z += 0.01; 

  camera.position.y = t * -1;
  camera.position.x = t * -1; 
  camera.position.z = t * -1; 
  
}

document.body.onscroll = moveCamera

function animate() {
  requestAnimationFrame( animate ); 

  
  torus.rotation.z += 0.01;
  torus.rotation.x += 0.01; 
  torus.rotation.y += 0.005; 

  controls.update(); 


  renderer.render ( scene, camera ); 
}

animate()

