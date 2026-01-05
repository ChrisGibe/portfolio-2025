import Experience from "../Experience";
import Environment from './Environment';
import FLoor from './Floor';
import Fox from './Fox';

export default class World {
    constructor() {

        // Setup
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        this.resources.on('ready', () => {
            console.log('All the resources are loaded')

            this.floor = new FLoor();
            this.fox = new Fox();
            this.environment = new Environment();
        })
    }

    update() {
        if(this.fox) {
            this.fox.update();
        }
    }
}