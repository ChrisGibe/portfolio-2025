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
        this.nbOfPlanes = 6;
        this.planes = [];
        this.planeColors = [
            new THREE.Color(0xff0000),
            new THREE.Color(0x00ff00),
            new THREE.Color(0x0000ff),
            new THREE.Color(0xffff00),
            new THREE.Color(0x00ffff),
            new THREE.Color(0xff00ff),
        ];

        this.resources.on('ready', () => {
            console.log('All the resources are loaded')
            this.environment = new Environment();

            for (let i = 0; i < this.nbOfPlanes; i++) {
                this.planes.push(
                        new Plane(
                            0, 
                            i * 0.05, 
                            -i * 0.1, 
                            this.planeColors[i], 
                            i
                        )
                );
            }

            this.animate();
        })
    }

    animate() {
        this.planes.forEach((plane, index) => {
            gsap.from(plane.mesh.position, {
                duration: 1.2,
                y: 5,
                stagger: 0.05,
                delay: index * 0.2,
                ease: 'power3.out',
            })
        })

        gsap.to(this.planes[0].mesh.position, {
            duration: 1.2,
            x: 2.4,
            y: 0,
            z: -1.4,
            delay: 2.2,
            ease: 'power3.out',
        })

        gsap.to(this.planes[1].mesh.position, {
            duration: 1.2,
            x: -2.4,
            y: 0,
            z: -1.4,
            delay: 2.2,
            ease: 'power3.out',
        })

        gsap.to(this.planes[2].mesh.position, {
            duration: 1.2,
            x: 2.4,
            y: 1,
            z: -1.4,
            delay: 2.2,
            ease: 'power3.out',
        })

        gsap.to(this.planes[3].mesh.position, {
            duration: 1.2,
            x: -2.4,
            y: 1,
            z: -1.4,
            delay: 2.2,
            ease: 'power3.out',
        })

        gsap.to(this.planes[4].mesh.position, {
            duration: 1.2,
            x: 2.4,
            y: -1,
            z: -1.4,
            delay: 2.2,
            ease: 'power3.out',
        })

        gsap.to(this.planes[5].mesh.position, {
            duration: 1.2,
            x: -2.4,
            y: -1,
            z: -1.4,
            delay: 2.2,
            ease: 'power3.out',
        })
    }

    update() {}
}