// Imports & constants
global.THREE = require("three");
require("three/examples/js/controls/OrbitControls");
const canvasSketch = require("canvas-sketch");

const settings = {
  animate: true,
  context: "webgl",
  scaleToView: true
};

var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;

const sketch = ({ context }) => {

  // RENDERER
  const renderer = new THREE.WebGLRenderer({
    canvas: context.canvas,
    alpha: true,
  });
  renderer.setClearColor("#121212", 1);

  // CAMERA
  const camera = new THREE.PerspectiveCamera(100, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 1000);
  camera.position.set(0, 10, 30); // user view

  // ORBIT CONTROLS
  const controls = new THREE.OrbitControls(camera, context.canvas); // interactive

  // TEXTURES
  const loader = new THREE.TextureLoader();
  const tierraTxtr = loader.load("assets/tierra.jpg");
  // mapping texture to mesh
  const tierraMtrl = new THREE.MeshStandardMaterial({map: tierraTxtr});

  // SCENE
  const scene = new THREE.Scene();
  const geometry = new THREE.SphereGeometry(1, 32, 16);

  // MESHES
  const mercuryMesh = new THREE.Mesh(geometry, tierraMtrl);
  mercuryMesh.position.set(10, 0, 0);
  mercuryMesh.scale.setScalar(2);
  scene.add(mercuryMesh);

  // LIGHTING
  const light = new THREE.PointLight("white", 1.25);
  light.position.set(0, 0, 0);
  scene.add(light);

  // HELPERS
  scene.add(new THREE.PointLightHelper(light, 1));
  scene.add(new THREE.GridHelper(50, 50));

  return {
    // frames
    render({ time }) {
      controls.update();
      renderer.render(scene, camera);
    },

    unload() {
      controls.dispose();
      renderer.dispose();
    }
  };
};

canvasSketch(sketch, settings);
