import {
   BackSide,
   BoxGeometry,
   Color,
   ConeGeometry,
   CubeTextureLoader,
   DodecahedronGeometry,
   Group,
   Mesh,
   MeshStandardMaterial,
   NearestFilter,
   OctahedronGeometry,
   Scene,
   ShaderMaterial,
   SphereGeometry,
   TorusGeometry,
   Vector3,
} from 'three';

import fragmentShader from '../shaders/fragment.glsl';
import vertexShader from '../shaders/vertex.glsl';
import boxTexture from '../assets/boxTexture.png';
import { Portal } from './portal';

const textures = [boxTexture, boxTexture, boxTexture, boxTexture, boxTexture, boxTexture];

class ImpossibleBox {
   private portal: Portal;
   private scene: Scene;
   private meshes: Mesh[];
   private group: Group;

   constructor(_scene: Scene) {
      this.scene = _scene;
      this.group = new Group();
      this.portal = new Portal(8);
      this.meshes = [];
   }

   public create() {
      this.createEdges();
      this.createPortals();

      this.scene.add(this.group);
   }

   public render(time: number) {
      this.group.rotation.y += time * 0.15;

      this.meshes.forEach((mesh, index) => {
         mesh.rotation.z -= time * 0.1 * (index + 1);
         mesh.rotation.y += time * 0.05 * (index + 1);
      });
   }

   private createEdges() {
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

      boxEdges.castShadow = true;

      this.group.add(boxEdges);
   }

   private createPortals() {
      const backgroundGeometry = new SphereGeometry(16, 16, 30);

      const background_0 = new Mesh(
         backgroundGeometry,
         new MeshStandardMaterial({
            color: new Color(0xf5fa6e),
            flatShading: true,
            side: BackSide,
         })
      );

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
            color: new Color(0xff003c),
            flatShading: true,
            side: BackSide,
         })
      );

      const background_3 = new Mesh(
         backgroundGeometry,
         new MeshStandardMaterial({
            color: new Color(0xf06748),
            flatShading: true,
            side: BackSide,
         })
      );

      const background_4 = new Mesh(
         backgroundGeometry,
         new MeshStandardMaterial({
            color: new Color(0x426bff),
            flatShading: true,
            side: BackSide,
         })
      );

      const background_5 = new Mesh(
         backgroundGeometry,
         new MeshStandardMaterial({
            color: new Color(0xfc68f7),
            flatShading: true,
            side: BackSide,
         })
      );

      this.meshes.push(
         new Mesh(
            new BoxGeometry(3, 3, 3),
            new MeshStandardMaterial({
               color: new Color(0x5c595b),
            })
         )
      );

      this.meshes.push(
         new Mesh(
            new SphereGeometry(2, 8, 8),
            new MeshStandardMaterial({
               flatShading: true,
               color: new Color(0x426bff),
            })
         )
      );

      this.meshes.push(
         new Mesh(
            new DodecahedronGeometry(2),
            new MeshStandardMaterial({
               color: new Color(0xf5fa6e),
            })
         )
      );

      this.meshes.push(
         new Mesh(
            new OctahedronGeometry(3, 0),
            new MeshStandardMaterial({
               color: new Color(0xff003c),
               flatShading: true,
            })
         )
      );

      this.meshes.push(
         new Mesh(
            new ConeGeometry(3, 3, 4),
            new MeshStandardMaterial({
               color: new Color(0xf06748),
            })
         )
      );

      this.meshes.push(
         new Mesh(
            new TorusGeometry(1.5, 1, 6, 6),
            new MeshStandardMaterial({
               color: new Color(0xffffff),
               flatShading: true,
            })
         )
      );

      //*** Create portals */
      this.group.add(
         this.portal.create({
            content: [background_0, this.meshes[0]],
            portal: {
               position: new Vector3(0, 0, 4),
            },
         })
      );

      this.group.add(
         this.portal.create({
            content: [background_1, this.meshes[1]],
            portal: {
               position: new Vector3(4.0, 0, 0),
               rotation: new Vector3(0, Math.PI * 0.5, 0),
            },
         })
      );

      this.group.add(
         this.portal.create({
            content: [background_2, this.meshes[2]],
            portal: {
               position: new Vector3(-4, 0, 0),
               rotation: new Vector3(0, Math.PI * -0.5, 0),
            },
         })
      );

      this.group.add(
         this.portal.create({
            content: [background_3, this.meshes[3]],
            portal: {
               position: new Vector3(0, 0, -4),
               rotation: new Vector3(0, Math.PI, 0),
            },
         })
      );

      this.group.add(
         this.portal.create({
            content: [background_4, this.meshes[4]],
            portal: {
               position: new Vector3(0, 4, 0),
               rotation: new Vector3(Math.PI * -0.5, 0, 0),
            },
         })
      );

      this.group.add(
         this.portal.create({
            content: [background_5, this.meshes[5]],
            portal: {
               position: new Vector3(0, -4, 0),
               rotation: new Vector3(Math.PI * 0.5, 0, 0),
            },
         })
      );
   }
}

export { ImpossibleBox };
