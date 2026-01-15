import * as THREE from 'three';
import gsap from 'gsap';
import Experience from "../Experience";
import Environment from './Environment';
import Plane from './Plane';

export default class World {
    constructor() {

        // Setup
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        this.resources.on('ready', () => {
            console.log('All the resources are loaded')
            this.environment = new Environment();
            this.plane = new Plane()

            // this.animate();
        })
    }


    update() {
        if (this.plane) this.plane.update();
    }
}