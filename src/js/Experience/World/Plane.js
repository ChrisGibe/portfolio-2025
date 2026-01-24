import * as THREE from "three";
import Experience from "../Experience";
import fragment from "../shaders/fragment.glsl";
import vertex from "../shaders/vertex.glsl";

export default class Plane {
  constructor(x, y, z, color) {
    // Setup
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.time = this.experience.time;
    this.debug = this.experience.debug;
    this.world = this.experience.world;

    this.x = x;
    this.y = y;
    this.z = z;
    this.color = color;
    this.opacity = 1;

    this.start = {y: 45, z: -400};
    this.end = {y: -5, z: -320};

    const initialProgress = (this.z - this.start.z) / (this.end.z - this.start.z);

    this.progress = initialProgress;

    this.setGeometry();
    this.setMaterial();
    this.setMesh();

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder(`plane`);
      this.debugUI();
    }

    this.moveZonMouseScroll();
  }

  setGeometry() {
    this.geometry = new THREE.PlaneGeometry(200, 120, 100, 100);
  }

  setMaterial() {
    this.material = new THREE.RawShaderMaterial({
      uniforms: {
        uColor: {value: new THREE.Color(this.color)},
        uOpacity: {value: this.opacity},
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
      if (e.deltaY > 0) {
        const speed = this.world.speed * Math.abs(e.deltaY);
        this.progress += speed;

        this.progress > 1 ? this.progress %= 1 : this.progress;
        this.progress < 0 ? this.progress = 1 + (this.progress % 1) : this.progress;
      }
    });
  }

  debugUI() {
    // Y Axis
    this.debugFolder.add(this, "y").min(-50).max(50).step(0.1).name("yPosition");

    // Z Axis
    this.debugFolder.add(this, "z").min(-500).max(500).step(0.1).name("zPosition");

    // OPACITY
    this.debugFolder.add(this, "opacity").min(0).max(1).step(0.01).name("opacity");

  }

  update() {
    this.y = this.start.y + (this.end.y - this.start.y) * this.progress;
    this.z = this.start.z + (this.end.z - this.start.z) * this.progress;

    this.mesh.position.y = this.y;
    this.mesh.position.z = this.z;

    const easeIn = Math.min(this.progress / 0.1, 1);
    const easeOut = Math.min((1 - this.progress) / 0.1, 1);

    this.opacity = easeIn * easeOut;

    this.material.uniforms.uOpacity.value = this.opacity;
  }
}
