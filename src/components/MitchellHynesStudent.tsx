import {
  EffectComposer,
  ChromaticAberration,
  Bloom,
} from "@react-three/postprocessing";
import { Resolution, KernelSize, BlendFunction } from "postprocessing";
import { Canvas } from "@react-three/fiber";
import { Vector2 } from "three";

import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import { useMitch } from "../hooks/useMitch";

if (import.meta.hot) {
  import.meta.hot.decline();
}

function Face() {
  const ref = useRef<Mesh>(null!);
  const [target, setTarget] = useState({ x: 0, y: (-30 * 3.14) / 180 });
  const { obj } = useMitch();

  useEffect(() => {
    if (!ref.current) return;

    ref.current.rotation.x = target.x;
    ref.current.rotation.y = target.y;

    const fn = () => {
      setTarget({
        y: Math.random() * (3.14 / 2) - 3.14 / 4,
        x: (Math.random() > 0.5 ? 25 : -25 * 3.14) / 180,
      });
    };

    const intervalId = setInterval(fn, 3000);
    return () => clearInterval(intervalId);
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;

    if (delta < 1) {
      let distX = target.x - ref.current.rotation.x;
      let distY = target.y - ref.current.rotation.y;
      ref.current.rotation.x += distX * delta;
      ref.current.rotation.y += distY * delta;
    }
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

const OFFSET = new Vector2(0.0025, 0.0025);

export const MitchellHynesStudent = () => (
  <Canvas
    orthographic
    camera={{ zoom: 10, near: -100, far: 100, position: [0, 0, 0] }}
    style={{ backgroundColor: "black" }}
  >
    <EffectComposer>
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL} // blend mode
        offset={OFFSET} // color offset
      />
      <Bloom
        intensity={1.0} // The bloom intensity.
        width={Resolution.AUTO_SIZE} // render width
        height={Resolution.AUTO_SIZE} // render height
        kernelSize={KernelSize.SMALL} // blur kernel size
        luminanceThreshold={0.2} // luminance threshold. Raise this value to mask out darker elements in the scene.
        luminanceSmoothing={0.025} // smoothness of the luminance threshold. Range is [0, 1]
      />
    </EffectComposer>
    <Face />
  </Canvas>
);
