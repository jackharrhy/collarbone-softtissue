import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";
import { useMitch } from "../hooks/useMitch";

if (import.meta.hot) {
  import.meta.hot.decline();
}

export function Face() {
  const ref = useRef<Mesh>(null!);
  const { obj } = useMitch();

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
