import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Experience from "./Experience";

export default class Camera {
    constructor() {

        // Setup
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.debug = this.experience.debug;

        this.setInsance();

        // Debug
        if(this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('Camera')
            this.debugUI();
        }
    }

    /**
     * https://threejs.org/docs/?q=PerspectiveCamera#api/en/cameras/PerspectiveCamera
     */
    setInsance() {
        this.debugFolder = {}
        this.instance = new THREE.PerspectiveCamera(45, this.sizes.width / this.sizes.height, 10, 600);
        this.instance.position.set(0, 30, 0);
        this.instance.updateProjectionMatrix();
    }

    setOrbitControls() {
        this.controls = new OrbitControls(this.instance, this.canvas);
        this.controls.enableDamping = true;
    }

    resize() {
        this.instance.aspect = this.sizes.width / this.sizes.height;
        this.instance.updateProjectionMatrix();
    }

    debugUI() {

        // Fov
        this.debugFolder.add(this.instance, 'fov').min(10).max(100).step(0.1).name('fov');

        // Near
        this.debugFolder.add(this.instance, 'near').min(0.1).max(100).step(0.1).name('near');

        // Far
        this.debugFolder.add(this.instance, 'far').min(100).max(2000).step(1).name('far');
    }

    update() {
        this.instance.updateProjectionMatrix();
        // this.controls.update();
    }
}