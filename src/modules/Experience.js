import gsap from 'gsap';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DoubleSide } from 'three';
import * as dat from 'lil-gui';
import fragmentShader from '../shaders/fragment.glsl';
import vertexShader from '../shaders/vertex.glsl';
import imgTexture from '/texture.jpg';


export default class Experience {
    constructor(options) {
        this.container = options.domElement;
        this.gui = new dat.GUI();
        this.width = window.innerWidth;
        this.height = window.innerHeight; 

        this.camera = new THREE.PerspectiveCamera( 70, this.width / this.height , 10, 1000 );
        this.camera.position.z = 600;     
        
        this.camera.fov = Math.atan((this.height / 2) / 600) * 360 / Math.PI;

        this.scene = new THREE.Scene();

        this.renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
        this.renderer.setSize( this.width, this.height );
        this.container.appendChild(this.renderer.domElement);

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);

        this.time = 0;
        this.setupSettings();
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

    setupSettings() {
        this.settings = {
            progress: 0
        }

        this.gui.add(this.settings, "progress", 0, 1, 0.001)
    }

    setupResize() {
        window.addEventListener('resize', this.resize.bind(this))
    }

    addObjects() {
        this.geometry = new THREE.PlaneGeometry(500, 500, 100, 100);
        this.material = new THREE.ShaderMaterial({
            uniforms: {
                uTexture: { value: new THREE.TextureLoader().load(imgTexture) },
                uTextureSize: { value: new THREE.Vector2(100, 100) },
                uCorners: { value: new THREE.Vector4(0, 0, 0, 0) },
                uProgress: { value: 0 },
                uTime: { value: 1.0 },
                uResolution: { value: new THREE.Vector2(this.width, this.height) },
                uQuadSize: { value: new THREE.Vector2(500, 500) },
            },
            side: DoubleSide,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader
        })

        this.tl = gsap.timeline()
        .to(this.material.uniforms.uCorners.value, { x: 1, duration: 1 })
        .to(this.material.uniforms.uCorners.value, { y: 1, duration: 1 }, 0.1)
        .to(this.material.uniforms.uCorners.value, { z: 1, duration: 1 }, 0.2)
        .to(this.material.uniforms.uCorners.value, { w: 1, duration: 1 }, 0.3)
        
        this.mesh = new THREE.Mesh( this.geometry, this.material );
        this.scene.add( this.mesh );
        this.mesh.position.x = 300;
    }

    render() {
        this.time += 0.05;
        this.material.uniforms.uTime.value = this.time;
        this.material.uniforms.uProgress.value = this.settings.progress;
        this.tl.progress(this.settings.progress)
        this.renderer.render( this.scene, this.camera );

        requestAnimationFrame(this.render.bind(this))
    }
}