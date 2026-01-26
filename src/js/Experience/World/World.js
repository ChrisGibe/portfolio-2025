import Experience from "../Experience";
import Environment from './Environment';
import Plane from './Plane';

export default class World {
    constructor() {

        // Setup
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        this.planes = [];
        this.speed = 0.0008;
        this.debug = this.experience.debug;

        this.config = {
            count: 3,
            startY: 30,
            startZ: -430,
            endY: -5,
            endZ: -320,
            colors: ["#778899", "#666666", "#555555", "#444444"],
            images: ["engie", "ampere", "dassault"],
            planeWidth: 240,
            planeHeight: 150,
        };

        this.resources.on('ready', () => {
            console.log('All the resources are loaded')
            
            this.environment = new Environment();
            this.createPlanes();
        })

        // Debug
        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder(`world`);
            this.debugUI();
        }
    }

    createPlanes() {
        for (let i = 0; i < this.config.count; i++) {
            const ratio = i / this.config.count;

            const y = this.config.startY + (this.config.endY - this.config.startY) * ratio;
            const z = this.config.startZ + (this.config.endZ - this.config.startZ) * ratio;
            const color = this.config.colors[i % this.config.colors.length];
            const img = this.config.images;

            this.planes.push(new Plane(y, z, color, this.resources.items[img[i]]));
        }
    }


    debugUI() {
        // SPEED
        this.debugFolder.add(this, "speed").min(0.0005).max(0.0010).step(0.0001).name("speed");
    }


    update() {
        this.planes.forEach(plane => plane.update());
    }
}