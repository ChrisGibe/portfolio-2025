import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DoubleSide } from 'three'
import fragmentShader from '../shaders/fragment.glsl'
import vertexShader from '../shaders/vertex.glsl'


export default class Experience {
    constructor(options) {
        this.container = options.domElement
        this.width = window.innerWidth,
        this.height = window.innerHeight 

        this.camera = new THREE.PerspectiveCamera( 70, this.width / this.height , 0.01, 10 );
        this.camera.position.z = 1;        

        this.scene = new THREE.Scene();

        this.renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
        this.renderer.setSize( this.width, this.height );
        this.container.appendChild(this.renderer.domElement)

        this.controls = new OrbitControls(this.camera, this.renderer.domElement)

        this.time = 0
        this.resize();
        this.addObjects();
        this.render();
        this.setupResize();
    }

    resize() {
        // Update sizes
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        // Update camera
        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix()

        // Update renderer
        this.renderer.setSize( this.width, this.height );
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }

    setupResize() {
        window.addEventListener('resize', this.resize.bind(this))
    }

    addObjects() {
        this.geometry = new THREE.PlaneGeometry(1, 1, 100, 100);
        this.material = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 1.0 }
            },
            side: DoubleSide,
            wireframe: true,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader
        })
        
        this.mesh = new THREE.Mesh( this.geometry, this.material );
        this.scene.add( this.mesh );
    }

    render() {
        this.time += 0.05;
        this.material.uniforms.uTime.value = this.time;
        this.renderer.render( this.scene, this.camera );

        requestAnimationFrame(this.render.bind(this))
    }
}