import * as THREE from 'three';
import Experience from "../Experience";
import fragment from "../shaders/fragment.glsl";
import vertex from "../shaders/vertex.glsl";
import gsap from 'gsap';

export default class Plane {
    constructor(x, y, z) {

        // Setup
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.time = this.experience.time;
        this.debug = this.experience.debug;

        this.yPos = y;
        this.zPos = z;
        this.xPos = x;

        this.setGeometry();
        this.setMaterial();
        this.setMesh()

        // Debug
        if(this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder(`plane-${this.index}`)
            this.debugUI();
        }

        this.moveZonMouseScroll();
    }

    setGeometry() {
        this.geometry = new THREE.PlaneGeometry(450, 250, 100, 100)
    }
    
    setMaterial() {
        this.material = new THREE.RawShaderMaterial({
            uniforms: {
                uTexture: { value: this.experience.resources.items.ratioTesting },
                uProgress: { value: 1.0 },
                uTime: { value: this.time.delta },
                uResolution: { value: new THREE.Vector2(this.experience.sizes.width, this.experience.sizes.height) },
                uQuadsize: { value: new THREE.Vector2(450, 250) },
                uOpacity: { value: 1.0 }
            },
            vertexShader: vertex,
            fragmentShader: fragment,
            side: THREE.DoubleSide,
            transparent: true
        })
    }

    setMesh() {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.scene.add(this.mesh)
        this.mesh.position.x = this.xPos
        this.mesh.position.y = this.yPos
        this.mesh.position.z = this.zPos
    }

    moveZonMouseScroll() {
        // When i scroll down move the plane zPos
        // When i scroll up move the plane zPos
        window.addEventListener('wheel', (e) => {
            console.log('I scroll')
            if(e.deltaY > 0) {
                this.zPos += 10;
                this.yPos -= 10;
                if(this.zPos === 100) {
                    console.log('zPos is 100')
                    // Opacity on the plane
                    gsap.to(this.material.uniforms.uOpacity, {
                        duration: 2,
                        value: 0,
                        ease: 'power3.inOut',
                    })
                }
            }
        })
    }


    debugUI() {
        this.settings = {
            progress: 0,
            opacity: 1
        }
        // uniforms - accéder à .value car c'est un Uniform
        this.debugFolder.add(this.settings, 'progress', 0, 1, 0.001)
        this.debugFolder.add(this.settings, 'opacity', 0, 1, 0.001)
    }

    update() {
        this.material.uniforms.uProgress.value = this.settings.progress
        this.mesh.position.z = this.zPos
        this.mesh.position.y = this.yPos
        this.material.uniforms.uOpacity.value = this.settings.opacity
    }
}
