import {
   BackSide,
   BoxGeometry,
   CapsuleGeometry,
   Color,
   DodecahedronGeometry,
   DoubleSide,
   Group,
   Mesh,
   MeshBasicMaterial,
   MeshStandardMaterial,
   NearestFilter,
   OctahedronGeometry,
   Scene,
   SphereGeometry,
   TextureLoader,
   TorusGeometry,
   Vector3,
} from 'three';

import boxTexture from '../assets/boxTexture.png';
import { Portal } from './portal';
import { isDesktop } from 'utils/constants';

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
      if (isDesktop) {
         this.meshes.forEach((mesh, index) => {
            mesh.rotation.y += time * 0.05 * (index + 1);
            mesh.rotation.z -= time * 0.1 * (index + 1);
         });
      }
   }

   private createEdges() {
      const texture = new TextureLoader().load(boxTexture);
      texture.minFilter = NearestFilter;
      texture.magFilter = NearestFilter;

      const boxEdges = new Mesh(
         new BoxGeometry(8, 8, 8),
         new MeshBasicMaterial({
            map: texture,
            transparent: true,
            side: DoubleSide,
         })
      );

      if (isDesktop) {
         boxEdges.castShadow = true;
      }

      this.group.add(boxEdges);
   }

   private createPortals() {
      const backgroundGeometry = new SphereGeometry(12, 12, 12);

      //*** Create backgrounds */
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

      //*** Create objects */
      this.meshes.push(
         new Mesh(
            new BoxGeometry(3, 3, 3),
            new MeshStandardMaterial({
               color: new Color(0xff003c),
            })
         )
      );

      this.meshes.push(
         new Mesh(
            new TorusGeometry(1.5, 1, 6, 6),
            new MeshStandardMaterial({
               color: new Color(0xfc68f7),
               flatShading: true,
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
            new OctahedronGeometry(2, 0),
            new MeshStandardMaterial({
               color: new Color(0x426bff),
               flatShading: true,
            })
         )
      );

      this.meshes.push(
         new Mesh(
            new SphereGeometry(2, 6, 6),
            new MeshStandardMaterial({
               color: new Color(0xf06748),
               flatShading: true,
            })
         )
      );

      this.meshes.push(
         new Mesh(
            new CapsuleGeometry(1, 2.5, 1, 6),
            new MeshStandardMaterial({
               color: new Color(0x8ff2bf),
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
