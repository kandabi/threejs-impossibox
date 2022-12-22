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
         new PlaneGeometry(100, 100, 1, 1),
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
      const ambientLight = new AmbientLight(0xffffff, 0.3);
      const pointLight = new PointLight(0xffffff, 0.8, 80, 0.5);
      pointLight.position.set(0, 60, 0);

      pointLight.castShadow = true;
      pointLight.shadow.bias = 0.001;
      pointLight.shadow.radius = 5;
      pointLight.shadow.mapSize.height = 256;
      pointLight.shadow.mapSize.width = 256;

      this.scene.add(ambientLight);
      this.scene.add(pointLight);
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
      this.controls.maxDistance = 50;
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
