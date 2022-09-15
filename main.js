import './style.css'
import * as THREE from 'three';

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
})

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


//ライトを追加
const directionalLight = new THREE.DirectionalLight("#fff", 4);
directionalLight.position.set(0.5, 1, 0);
scene.add(directionalLight);

renderer.render(scene, camera);
