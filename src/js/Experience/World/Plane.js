import * as THREE from 'three';
import Experience from "../Experience";
import fragment from "../shaders/fragment.glsl";
import vertex from "../shaders/vertex.glsl";

export default class Plane {
    constructor(xPos, yPos, zPos, color, index) {

        // Setup
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.time = this.experience.time;
        this.debug = this.experience.debug;
        this.index = index;

        this.xPos = 1;
        this.yPos = 1;
        this.zPos = 1;
        this.color = color;

        this.setGeometry();
        this.setMaterial();
        this.setMesh()

        // Debug
        if(this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder(`plane-${this.index}`)
            this.debugUI();
        }

    }

    setGeometry() {
        this.geometry = new THREE.PlaneGeometry(300, 300, 100, 100)
    }
    
    setMaterial() {
        this.material = new THREE.RawShaderMaterial({
            uniforms: {
                uTexture: { value: this.experience.resources.items.ratioTesting },
                uProgress: { value: 1.0 },
                uTime: { value: this.time.delta },
                uResolution: { value: new THREE.Vector2(this.experience.sizes.width, this.experience.sizes.height) },
                uQuadsize: { value: new THREE.Vector2(300, 300) }
            },
            vertexShader: vertex,
            fragmentShader: fragment,
            side: THREE.DoubleSide
        })
    }

    setMesh() {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.scene.add(this.mesh)
    }

    debugUI() {
        this.settings = {
            progress: 0
        }
        // uniforms - accéder à .value car c'est un Uniform
        this.debugFolder.add(this.settings, 'progress', 0, 1, 0.001)
    }

    update() {
        this.material.uniforms.uProgress.value = this.settings.progress
    }
}
