import {
   AlwaysStencilFunc,
   EqualStencilFunc,
   FrontSide,
   Group,
   KeepStencilOp,
   Material,
   Mesh,
   MeshBasicMaterial,
   PlaneGeometry,
   ReplaceStencilOp,
   Vector3,
} from 'three';

const stencilConfig = {
   stencilZPass: ReplaceStencilOp,
   stencilZFail: KeepStencilOp,
   stencilFail: KeepStencilOp,
   stencilFuncMask: 0xff,
   stencilWrite: true,
};

let stencilId: number = 5;

interface ICreatePortal {
   content: Mesh[];
   portal: {
      position: Vector3;
      rotation?: Vector3;
   };
}

class Portal {
   private geometry: PlaneGeometry;

   constructor(portalSize) {
      this.geometry = new PlaneGeometry(portalSize, portalSize);
   }

   public create({ portal, content }: ICreatePortal): Group {
      const returnGroup = new Group();
      const hiddenGroup = new Group();
      stencilId++;

      const portalMesh = new Mesh(
         this.geometry,
         new MeshBasicMaterial({
            side: FrontSide,
            colorWrite: false,
            depthWrite: false,
            stencilFunc: AlwaysStencilFunc,
            stencilRef: stencilId,
            ...stencilConfig,
         })
      );

      portalMesh.position.copy(portal.position);
      if (portal.rotation) {
         portalMesh.rotation.setFromVector3(portal.rotation);
      }

      content.forEach((mesh) => {
         const material = mesh.material as Material;
         material.stencilFuncMask = stencilConfig.stencilFuncMask;
         material.stencilWrite = stencilConfig.stencilWrite;
         material.stencilZPass = stencilConfig.stencilZPass;
         material.stencilZFail = stencilConfig.stencilZFail;
         material.stencilFail = stencilConfig.stencilFail;
         material.stencilFunc = EqualStencilFunc;
         material.stencilRef = stencilId;
         hiddenGroup.renderOrder = stencilId;
         hiddenGroup.add(mesh);
      });

      returnGroup.add(hiddenGroup);
      returnGroup.add(portalMesh);

      return returnGroup;
   }
}

export { Portal };
