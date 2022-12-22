import { ImpossibleBox } from 'content/impossible-box';
import {
   AmbientLight,
   Clock,
   Color,
   EqualStencilFunc,
   KeepStencilOp,
   Mesh,
   MeshBasicMaterial,
   MeshStandardMaterial,
   PCFSoftShadowMap,
   PerspectiveCamera,
   PlaneGeometry,
   PointLight,
   ReplaceStencilOp,
   Scene,
   WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import './styles/styles.sass';

export class App {
   private camera: THREE.PerspectiveCamera;
   private renderer: THREE.WebGLRenderer;
   private impossibleBox: ImpossibleBox;
   private controls: OrbitControls;
   private scene: THREE.Scene;
   private floor: Mesh;
   private clock: Clock;

   constructor() {
      this.scene = new Scene();
      this.clock = new Clock();

      this.camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.001, 200);
      this.camera.position.z = 20;

      this.renderer = new WebGLRenderer({
         antialias: true,
         stencil: true,
         alpha: true,
      });

      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = PCFSoftShadowMap;

      this.renderer.setClearColor(0x000000, 1.0);

      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setPixelRatio(window.devicePixelRatio);

      this.createControls();

      window.addEventListener('resize', this.onWindowResize.bind(this), false);
      document.body.appendChild(this.renderer.domElement);

      this.addContent();
      this.addLights();
      this.render();
   }

   private addContent() {
      this.impossibleBox = new ImpossibleBox(this.scene);
      this.impossibleBox.create();

      this.floor = new Mesh(
         new PlaneGeometry(128, 128, 1, 1),
         new MeshStandardMaterial({
            color: new Color(0x3d3b3b),
            depthWrite: false,
         })
      );

      this.floor.receiveShadow = true;
      this.floor.rotation.x = -Math.PI * 0.5;
      this.floor.position.y = -7;

      this.scene.add(this.floor);
   }

   private addLights() {
      const ambientLight = new AmbientLight(0xffffff, 0.2);
      const pointLight_1 = new PointLight(0xffffff, 0.9, 80, 0.5);
      const pointLight_2 = new PointLight(0xffffff, 0.45, 50.0, 0.5);
      pointLight_1.position.set(0, 60, 0);
      pointLight_2.position.set(3, -7, 0);

      pointLight_1.castShadow = true;

      pointLight_1.shadow.bias = 0.0001;
      pointLight_1.shadow.radius = 25;

      pointLight_1.shadow.mapSize.height = 1024;
      pointLight_1.shadow.mapSize.width = 1024;

      this.scene.add(ambientLight);
      this.scene.add(pointLight_1);
      this.scene.add(pointLight_2);
   }

   private onWindowResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
   }

   private createControls() {
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;
      this.controls.enablePan = false;
      this.controls.dampingFactor = 0.03;
      this.controls.rotateSpeed = 0.35;
      this.controls.maxDistance = 55;
      this.controls.zoomSpeed = 0.7;
   }

   private render() {
      requestAnimationFrame(this.render.bind(this));
      const time = this.clock.getDelta();
      this.impossibleBox.render(time);
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
   }
}

new App();
