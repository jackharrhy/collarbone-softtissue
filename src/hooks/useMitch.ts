import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { useLoader } from "@react-three/fiber";

export const useMitch = () => {
  const mtl = useLoader(MTLLoader, `${import.meta.env.BASE_URL}model.mtl`);
  const obj = useLoader(
    OBJLoader,
    `${import.meta.env.BASE_URL}model.obj`,
    (loader) => {
      mtl.preload();
      // TODO fix ts-ignore
      // @ts-ignore-next-line
      loader.setMaterials(mtl);
    }
  );

  return { obj };
};
