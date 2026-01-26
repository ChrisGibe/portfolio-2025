import * as THREE from "three";
import Experience from "../Experience";
import fragment from "../shaders/fragment.glsl";
import vertex from "../shaders/vertex.glsl";

export default class Plane {
  constructor(y, z, color, image) {
    // Setup
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.time = this.experience.time;
    this.debug = this.experience.debug;
    this.world = this.experience.world;
    this.resource = image;

    this.x = 0;
    this.y = y;
    this.z = z;
    this.color = color;
    this.width = this.world.config.planeWidth;
    this.height = this.world.config.planeHeight;
    this.start = { y: this.world.config.startY, z: this.world.config.startZ };
    this.end = { y: this.world.config.endY, z: this.world.config.endZ };

    const initialProgress = (this.z - this.start.z) / (this.end.z - this.start.z);
    this.progress = initialProgress;
    this.targetProgress = initialProgress;

    this.setGeometry();
    this.setMaterial();
    this.setMesh();

    if (this.debug.active) {
      this.debugUI();
    }

    this.moveZonMouseScroll();
  }

  setGeometry() {
    this.geometry = new THREE.PlaneGeometry(this.width, this.height, 100, 100);
  }

  setMaterial() {    
    this.material = new THREE.RawShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color(this.color)},
        uOpacity: { value: 1.0 },
        uTexture: { value: this.resource },
      },
      vertexShader: vertex,
      fragmentShader: fragment,
      side: THREE.DoubleSide,
      transparent: true,
    });
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);

    this.mesh.position.x = this.x;
    this.mesh.position.y = this.y;
    this.mesh.position.z = this.z;
  }

  moveZonMouseScroll() {
    window.addEventListener("wheel", (e) => {
      const scrollSpeed = this.world.speed * 0.4; 
      this.targetProgress += e.deltaY * scrollSpeed;
    });
  }

  debugUI() {}

  update() {
    this.progress += (this.targetProgress - this.progress) * 0.3;
    let displayProgress = ((this.progress % 1) + 1) % 1;

    this.y = this.start.y + (this.end.y - this.start.y) * displayProgress;
    this.z = this.start.z + (this.end.z - this.start.z) * displayProgress;
    
    this.mesh.position.set(this.x, this.y, this.z);

    const easeIn = displayProgress / 0.25;
    const easeOut = (1 - displayProgress) / 0.25;
    
    this.material.uniforms.uOpacity.value = easeIn * easeOut;
  }
}
