import * as THREE from 'three';
import Experience from "../Experience";
import fragment from "../shaders/fragment.glsl";
import vertex from "../shaders/vertex.glsl";

export default class Plane {
    constructor() {

        // Setup
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.setGeometry();
        this.setMaterial();
        this.setMesh();
    }

    setGeometry() {
        this.geometry = new THREE.PlaneGeometry(1.5, 1, 32, 32)
    }
    
    setMaterial() {
        this.material = new THREE.RawShaderMaterial({
            vertexShader: vertex,
            fragmentShader: fragment,
            side: THREE.DoubleSide
        })
    }

    setMesh() {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.scene.add(this.mesh)
    }
}
