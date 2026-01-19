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

        this.setInsance();
       // this.setOrbitControls();
    }

    /**
     * https://threejs.org/docs/?q=PerspectiveCamera#api/en/cameras/PerspectiveCamera
     */
    setInsance() {
        this.instance = new THREE.PerspectiveCamera(70, this.sizes.width / this.sizes.height, 1, 1000);
        this.instance.position.z = 600;
        this.instance.fov = 2*Math.atan( (this.sizes.height/2)/600 ) * 180/Math.PI;
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

    update() {
       // this.controls.update();
    }
}