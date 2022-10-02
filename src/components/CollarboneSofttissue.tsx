import { Canvas, useFrame } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { useEffect, useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { Mesh } from "three";
import { createMachine } from "xstate";
import { useMachine } from "@xstate/react";
import { useMitch } from "../hooks/useMitch";

if (import.meta.hot) {
  import.meta.hot.decline();
}

const machine = createMachine({
  tsTypes: {} as import("./CollarboneSofttissue.typegen").Typegen0,
  id: "collarbone-softtissue",
  initial: "moving",
  states: {
    moving: {
      on: {
        REACHED: { target: "stare" },
      },
    },
    stare: {
      on: {
        DANCE: { target: "dance-stare" },
      },
    },
    "dance-stare": {
      on: {
        SWITCH: { target: "dance-turn" },
      },
    },
    "dance-turn": {
      on: {
        SWITCH: { target: "dance-stare" },
      },
    },
  },
});

class Song {
  audio: HTMLAudioElement;

  constructor(url: string) {
    this.audio = new Audio(url);
    this.audio.volume = 0.3;
  }

  play() {
    this.audio.play();
  }

  stop() {
    this.audio.pause();
    this.audio.currentTime = 0;
  }
}

const song = new Song(
  `${import.meta.env.BASE_URL}check-mii-out-channel-submission-plaza-theme.mp3`
);

export function Face() {
  const ref = useRef<Mesh>(null!);

  // const [state, send] = useMachine(machine);

  const { obj } = useMitch();

  useFrame((_, delta) => {
    if (!ref.current) return;

    /*
    if (delta < 1 && ref.current.position.z < 80) {
      ref.current.position.z += 5 * delta;
      console.log(ref.current.position.z);
    }
    */
  });

  return (
    <>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <mesh ref={ref} position={[0, 0, 0]}>
        <primitive position={[0, 0, 0]} scale={80} object={obj} />
      </mesh>
    </>
  );
}

export const CollarboneSofttissue = () => {
  useEffect(() => {
    song.play();
    return () => song.stop();
  }, []);

  return (
    <Canvas camera={{ zoom: 4, near: -100, far: 100, position: [0, 0, 0] }}>
      <Face />
    </Canvas>
  );
};
