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

renderer.render(scene, camera);
