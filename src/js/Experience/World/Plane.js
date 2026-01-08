import * as THREE from 'three';
import Experience from "../Experience";
import fragment from "../shaders/fragment.glsl";
import vertex from "../shaders/vertex.glsl";

export default class Plane {
    constructor(xPos, yPos, zPos, color, index) {

        // Setup
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.debug = this.experience.debug;
        this.index = index;

        // Debug
        if(this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder(`plane-${this.index}`)
            this.debugUI();
        }

        this.xPos = xPos;
        this.yPos = yPos;
        this.zPos = zPos;
        this.color = color;

        this.setGeometry();
        this.setMaterial();
        this.setMesh()
    }

    setGeometry() {
        this.geometry = new THREE.PlaneGeometry(1.5, 1, 32, 32)
    }
    
    setMaterial() {
        this.material = new THREE.RawShaderMaterial({
            uniforms: {
                uColor: { value: this.color },
            },
            vertexShader: vertex,
            fragmentShader: fragment,
            side: THREE.DoubleSide
        })
    }

    setMesh() {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.position.set(this.xPos, this.yPos, this.zPos);
        this.scene.add(this.mesh)
    }

    debugUI() {
        this.debugFolder.add(this.mesh.position, 'x')                    
        .min(0)
        .max(4)
        .step(0.001).name('x')

        this.debugFolder.add(this.mesh.position, 'y')                    
        .min(0)
        .max(4)
        .step(0.001).name('y')

        this.debugFolder.add(this.mesh.position, 'z')                    
        .min(0)
        .max(4)
        .step(0.001).name('z')
    }
}
