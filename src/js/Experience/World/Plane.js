import * as THREE from "three";
import Experience from "../Experience";
import fragment from "../shaders/fragment.glsl";
import vertex from "../shaders/vertex.glsl";

export default class Plane {
  constructor(y, z, color) {
    // Setup
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.time = this.experience.time;
    this.debug = this.experience.debug;
    this.world = this.experience.world;

    this.x = 0;
    this.y = y;
    this.z = z;
    this.color = color;
    this.opacity = 1;
    this.width = this.world.config.planeWidth;
    this.height = this.world.config.planeHeight;
    this.isScrolling = false;
this.scrollTimeout = null;

    this.start = { y: this.world.config.startY, z: this.world.config.startZ };
    this.end = { y: this.world.config.endY, z: this.world.config.endZ };

    const initialProgress = (this.z - this.start.z) / (this.end.z - this.start.z);

    this.progress = initialProgress;

    this.setGeometry();
    this.setMaterial();
    this.setMesh();

    // Debug
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
      this.isScrolling = true;

      if (e.deltaY > 0) {
        const speed = this.world.speed * Math.abs(e.deltaY);
        this.progress += speed;

        this.progress > 1 ? this.progress %= 1 : this.progress;
        this.progress < 0 ? this.progress = 1 + (this.progress % 1) : this.progress;

        clearTimeout(this.scrollTimeout);
        this.scrollTimeout = setTimeout(() => {
            this.isScrolling = false;
        }, 50);
      }
    });
  }

  debugUI() {}

  update() {
      this.y = this.start.y + (this.end.y - this.start.y) * this.progress;
      this.z = this.start.z + (this.end.z - this.start.z) * this.progress;

      this.mesh.position.y = this.y;
      this.mesh.position.z = this.z;

      // Tes calculs originaux que tu veux garder
      const easeIn = Math.min(this.progress / 0.1, 1);
      const easeOut = Math.min((1 - this.progress) / 0.1, 1);
      const positionalOpacity = easeIn * easeOut;

      // LA LOGIQUE : 
      // Si on scrolle -> on suit l'opacité de position (tes eases).
      // Si on s'arrête -> on remonte à 1.
      const targetOpacity = this.isScrolling ? positionalOpacity : 1.0;

      // On utilise un lissage pour que la transition entre "fondu" et "opaque" soit belle
      this.opacity += (targetOpacity - this.opacity) * 0.1;

      this.material.uniforms.uOpacity.value = this.opacity;
  }
}
