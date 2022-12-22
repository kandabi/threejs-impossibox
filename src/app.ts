import { Portal } from 'content/portal';
import {
   AmbientLight,
   BackSide,
   BoxGeometry,
   Clock,
   Color,
   ConeGeometry,
   CubeTextureLoader,
   DodecahedronGeometry,
   Group,
   Mesh,
   MeshStandardMaterial,
   NearestFilter,
   OctahedronGeometry,
   PerspectiveCamera,
   PointLight,
   Scene,
   ShaderMaterial,
   SphereGeometry,
   TorusGeometry,
   Vector3,
   WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import fragmentShader from './shaders/fragment.glsl';
import vertexShader from './shaders/vertex.glsl';

import transparent from './assets/transparent.png';
import './styles/styles.sass';

const textures = [transparent, transparent, transparent, transparent, transparent, transparent];

export class App {
   private camera: THREE.PerspectiveCamera;
   private renderer: THREE.WebGLRenderer;
   private controls: OrbitControls;
   private impossibleBox: Group;
   private scene: THREE.Scene;
   private portal: Portal;
   private clock: Clock;
   private stats: Stats;

   constructor() {
      this.scene = new Scene();
      this.clock = new Clock();
      this.stats = Stats();

      this.camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.001, 1000);
      this.camera.position.z = 15;

      this.renderer = new WebGLRenderer({
         antialias: true,
         stencil: true,
         alpha: true,
      });

      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setPixelRatio(window.devicePixelRatio);
      window.addEventListener('resize', this.onWindowResize.bind(this), false);

      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enablePan = false;

      document.body.appendChild(this.renderer.domElement);
      document.body.appendChild(this.stats.dom);

      this.addContent();
      this.render();
   }

   private addContent() {
      this.impossibleBox = new Group();
      this.portal = new Portal(8);

      this.addBoxEdges();
      this.addPortals();
      this.addLights();

      this.scene.add(this.impossibleBox);
   }

   private addBoxEdges() {
      const cubeTexture = new CubeTextureLoader().load(textures);
      cubeTexture.minFilter = NearestFilter;
      cubeTexture.magFilter = NearestFilter;

      const boxEdges = new Mesh(
         new BoxGeometry(8, 8, 8),
         new ShaderMaterial({
            fragmentShader: fragmentShader,
            vertexShader: vertexShader,
            transparent: true,
            uniforms: {
               cubeMap: { value: cubeTexture },
            },
         })
      );

      this.impossibleBox.add(boxEdges);
   }

   private addPortals() {
      const backgroundGeometry = new SphereGeometry(16, 16, 30);

      const background_1 = new Mesh(
         backgroundGeometry,
         new MeshStandardMaterial({
            color: new Color(0x8ff2bf),
            flatShading: true,
            side: BackSide,
         })
      );

      const background_2 = new Mesh(
         backgroundGeometry,
         new MeshStandardMaterial({
            color: new Color(0xfc68f7),
            flatShading: true,
            side: BackSide,
         })
      );

      const background_3 = new Mesh(
         backgroundGeometry,
         new MeshStandardMaterial({
            color: new Color(0xf5fa6e),
            flatShading: true,
            side: BackSide,
         })
      );

      const background_4 = new Mesh(
         backgroundGeometry,
         new MeshStandardMaterial({
            color: new Color(0xf06748),
            flatShading: true,
            side: BackSide,
         })
      );

      const background_5 = new Mesh(
         backgroundGeometry,
         new MeshStandardMaterial({
            color: new Color(0x426bff),
            flatShading: true,
            side: BackSide,
         })
      );

      const background_6 = new Mesh(
         backgroundGeometry,
         new MeshStandardMaterial({
            color: new Color(0xff003c),
            flatShading: true,
            side: BackSide,
         })
      );

      const mesh_1 = new Mesh(
         new BoxGeometry(3, 3, 3),
         new MeshStandardMaterial({
            color: new Color(0x8ff2bf),
         })
      );

      const mesh_2 = new Mesh(
         new SphereGeometry(2, 8, 8),
         new MeshStandardMaterial({
            flatShading: true,
            color: new Color(0xfc68f7),
         })
      );

      const mesh_3 = new Mesh(
         new ConeGeometry(3, 3, 4),
         new MeshStandardMaterial({
            color: new Color(0xf5fa6e),
         })
      );

      const mesh_4 = new Mesh(
         new DodecahedronGeometry(2),
         new MeshStandardMaterial({
            color: new Color(0xf06748),
         })
      );

      const mesh_5 = new Mesh(
         new TorusGeometry(2, 1, 8, 8),
         new MeshStandardMaterial({
            color: new Color(0x426bff),
            flatShading: true,
         })
      );

      const mesh_6 = new Mesh(
         new OctahedronGeometry(3, 0),
         new MeshStandardMaterial({
            color: new Color(0xff003c),
            flatShading: true,
         })
      );

      this.impossibleBox.add(
         this.portal.create({
            content: [background_1, mesh_1],
            portal: {
               position: new Vector3(0, 0, 4),
            },
         })
      );

      this.impossibleBox.add(
         this.portal.create({
            content: [background_2, mesh_2],
            portal: {
               position: new Vector3(4.0, 0, 0),
               rotation: new Vector3(0, Math.PI * 0.5, 0),
            },
         })
      );

      this.impossibleBox.add(
         this.portal.create({
            content: [background_3, mesh_3],
            portal: {
               position: new Vector3(-4, 0, 0),
               rotation: new Vector3(0, Math.PI * -0.5, 0),
            },
         })
      );

      this.impossibleBox.add(
         this.portal.create({
            content: [background_4, mesh_4],
            portal: {
               position: new Vector3(0, 0, -4),
               rotation: new Vector3(0, Math.PI, 0),
            },
         })
      );

      this.impossibleBox.add(
         this.portal.create({
            content: [background_5, mesh_5],
            portal: {
               position: new Vector3(0, 4, 0),
               rotation: new Vector3(Math.PI * -0.5, 0, 0),
            },
         })
      );

      this.impossibleBox.add(
         this.portal.create({
            content: [background_6, mesh_6],
            portal: {
               position: new Vector3(0, -4, 0),
               rotation: new Vector3(Math.PI * 0.5, 0, 0),
            },
         })
      );
   }

   private addLights() {
      const ambientLight = new AmbientLight(0xffffff, 0.2);
      const pointLight_1 = new PointLight(0xffffff, 0.45, 50.0, 0.5);
      const pointLight_2 = new PointLight(0xffffff, 0.45, 50.0, 0.5);
      pointLight_1.position.set(0, 7, 3);
      pointLight_2.position.set(3, -7, 3);
      this.scene.add(ambientLight);
      this.scene.add(pointLight_1);
      this.scene.add(pointLight_2);
   }

   private onWindowResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
   }

   private render() {
      requestAnimationFrame(this.render.bind(this));
      this.stats.begin();
      const time = this.clock.getDelta();
      this.impossibleBox.rotation.y += time * 0.15;
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
      this.stats.end();
   }
}

new App();
