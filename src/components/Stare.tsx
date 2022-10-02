import { Canvas } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { Mesh } from "three";

if (import.meta.hot) {
  import.meta.hot.decline();
}

export function Face() {
  const ref = useRef<Mesh>(null!);

  const mtl = useLoader(MTLLoader, "./model.mtl");
  const obj = useLoader(OBJLoader, "./model.obj", (loader) => {
    mtl.preload();
    // TODO fix ts-ignore
    // @ts-ignore-next-line
    loader.setMaterials(mtl);
  });

  return (
    <>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <mesh ref={ref}>
        <primitive position={[0, 0, 48]} scale={140} object={obj} />
      </mesh>
    </>
  );
}

export const Stare = () => (
  <Canvas
    orthographic
    camera={{ zoom: 10, near: -100, far: 100, position: [0, 0, 0] }}
  >
    <Face />
  </Canvas>
);
