import './style.css'
import * as THREE from 'three';
import * as dat from 'lil-gui';

//ui debagu
const gui = new dat.GUI();


const canvas = document.querySelector(".webgl");

// 必須の三要素を追加

//シーン
const scene = new THREE.Scene();

const size = { width: window.innerWidth, height: window.innerHeight };

//カメラ
const camera = new THREE.PerspectiveCamera(
  35,
  size.width / size.height,
  0.1,
  100
)

camera.position.z = 6;
scene.add(camera);

//レンダラー
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,  //背景を透明に
})
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(window.devicePixelRatio);


//オブジェクト作成
const material = new THREE.MeshPhysicalMaterial({
  color: "#3c94d7",
  metalness: 0.86,
  roughness: 0.37,
  flatShading: true,
});

gui.addColor(material, "color");
gui.add(material, "metalness").min(0).max(1).step(0.01);
gui.add(material, "roughness").min(0).max(1).step(0.01);

// ジオメトリ作成　mesh
const mesh1 = new THREE.Mesh(new THREE.TorusGeometry(1, 0.4, 16, 60), material);
const mesh2 = new THREE.Mesh(new THREE.OctahedronGeometry(), material);
const mesh3 = new THREE.Mesh(new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16), material);
const mesh4 = new THREE.Mesh(new THREE.IcosahedronGeometry(), material);

//回転用の配置
mesh1.position.set(2, 0, 0);
mesh2.position.set(-1, 0, 0);
mesh3.position.set(2, 0, -6);
mesh4.position.set(5, 0, 3);

scene.add(mesh1, mesh2, mesh3, mesh4);
const meshes = [mesh1, mesh2, mesh3, mesh4];

// particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 3000;

const positionArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
  positionArray[i] = (Math.random() - 0.5) * 10;
}
//console.log(positionArray)

particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positionArray, 3)
);

const particlesMaterial = new THREE.PointsMaterial({
  size: 0.025,
  color: "#fff"
})
const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

//ライトを追加
const directionalLight = new THREE.DirectionalLight("#fff", 4);
directionalLight.position.set(0.5, 1, 0);
scene.add(directionalLight);

//ブラウザリサイズ操作
window.addEventListener('resize', () => {
  size.width = window.innerWidth;
  size.height = window.innerHeight;

  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();

  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(window.devicePixelRatio);
})


const clock = new THREE.Clock();

//ホイール
let speed = 0;
let rotation = 0;
window.addEventListener('wheel', (event) => {
  speed += event.deltaY * 0.0002;
  //console.log(speed);
})

function rotate() {
  rotation += speed;
  speed *= 0.93;

  //geomeotry rotate
  // 原点の座標(2, -3), 半径3.8 位相のずれθ+PI
  mesh1.position.x = 2 + 3.8 * Math.cos(rotation);
  mesh1.position.z = -3 + 3.8 * Math.sin(rotation);
  mesh2.position.x = 2 + 3.8 * Math.cos(rotation + Math.PI / 2);
  mesh2.position.z = -3 + 3.8 * Math.sin(rotation + Math.PI / 2);
  mesh3.position.x = 2 + 3.8 * Math.cos(rotation + Math.PI);
  mesh3.position.z = -3 + 3.8 * Math.sin(rotation + Math.PI);
  mesh4.position.x = 2 + 3.8 * Math.cos(rotation + 3 + (Math.PI / 2));
  mesh4.position.z = -3 + 3.8 * Math.sin(rotation + 3 + (Math.PI / 2));

  window.requestAnimationFrame(rotate);
}
rotate();

const cursor = {};
cursor.x = 0;
cursor.y = 0;
//console.log(cursor);

window.addEventListener('mousemove', (event) => {
  //console.log(event);
  cursor.x = event.clientX / size.width - 0.5;
  cursor.y = event.clientY / size.height - 0.5;
  //console.log(cursor);
})

const animete = () => {
  renderer.render(scene, camera);

  let getDeltaTime = clock.getDelta();
  //console.log(getDeltaTime);

  //mesh rotate
  for (const mesh of meshes) {
    mesh.rotation.x += 0.1 * getDeltaTime;
    mesh.rotation.y += 0.1 * getDeltaTime;
  }

  //カメラ制御
  camera.position.x += cursor.x * getDeltaTime * 1;
  camera.position.y += -cursor.y * getDeltaTime * 1;

  window.requestAnimationFrame(animete);
}

animete();
