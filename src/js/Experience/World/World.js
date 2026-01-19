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
            this.plane = new Plane(0, 0, 0)
            this.plane2 = new Plane(0, -20, 20)
            this.plane3 = new Plane(0, -40, 40)
            this.plane4 = new Plane(0, -60, 60)

            // this.animate();
        })
    }


    update() {
        if (this.plane) this.plane.update();
        if (this.plane2) this.plane2.update();
        if (this.plane3) this.plane3.update();
        if (this.plane4) this.plane4.update();
    }
}