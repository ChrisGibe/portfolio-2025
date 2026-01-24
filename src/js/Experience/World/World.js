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

        this.resources.on('ready', () => {
            console.log('All the resources are loaded')
            
            this.environment = new Environment();

            this.planes.push(new Plane(0, 0, -330, "blue"))
            this.planes.push(new Plane(0, 10, -350, "red"))
            this.planes.push(new Plane(0, 25, -370, "green"))
            this.planes.push(new Plane(0, 45, -390, "yellow"))
        })

        // Debug
        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder(`world`);
            this.debugUI();
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