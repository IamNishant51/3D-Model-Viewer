import "../src/style.css";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { EXRLoader } from "three/examples/jsm/loaders/EXRLoader.js";
import gsap from "gsap";

// ==== 1. SCENE SETUP ====
const scene = new THREE.Scene();

// ==== 2. CAMERA SETUP ====
const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 4;

// ==== 3. RENDERER SETUP ====
const canvas = document.querySelector("#canvas");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;

// ==== 4. LOAD HDRI ENVIRONMENT MAP ====
const exrLoader = new EXRLoader();
exrLoader.load("/provence_studio_2k.exr", (texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = texture;
});

// ==== 5. LOAD 3D MODEL ====
let modelGroup; // Group that holds the model
let mixer;
const clock = new THREE.Clock();

const loader = new GLTFLoader();
loader.load(
  "./stylized_flying_bee_bird_rigged.glb",
  (gltf) => {
    const model = gltf.scene;

    // Create a group and add the model to it
    modelGroup = new THREE.Group();
    modelGroup.add(model);

    // Center model geometry around origin
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    model.position.sub(center); // Center geometry

    // Scale model to fit screen
    const size = box.getSize(new THREE.Vector3()).length();
    const scaleFactor = 2.5 / size;
    modelGroup.scale.setScalar(scaleFactor);

    // Optional: lift up from ground
    model.position.y -= box.min.y;

    // Enable shadows
    model.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    // Add group to scene
    scene.add(modelGroup);

    // Animations
    if (gltf.animations && gltf.animations.length) {
      mixer = new THREE.AnimationMixer(model);
      gltf.animations.forEach((clip) => {
        mixer.clipAction(clip).play();
      });
    }
  },
  undefined,
  (error) => {
    console.error("An error occurred while loading the 3D model:", error);
  }
);

// ==== 6. MOUSE MOVE: ROTATE MODEL ====
window.addEventListener("mousemove", (e) => {
  if (modelGroup) {
    const rotationX = (e.clientY / window.innerHeight - 0.5) * Math.PI * 0.3;
    const rotationY = (e.clientX / window.innerWidth - 0.5) * Math.PI * 0.3;
    gsap.to(modelGroup.rotation, {
      x: rotationX,
      y: rotationY,
      duration: 0.5,
      ease: "power2.out",
    });
  }
});

// ==== 7. HANDLE WINDOW RESIZE ====
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// ==== 8. ANIMATION LOOP ====
function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();
  if (mixer) mixer.update(delta);
  renderer.render(scene, camera);
}
animate();
