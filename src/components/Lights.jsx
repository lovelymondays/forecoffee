import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function Lights() {
  const ligths = useRef();
  useFrame((state) => {
    ligths.current.position.z = state.camera.position.z + 1;
    ligths.current.target.position.z = state.camera.position.z;
    ligths.current.target.updateMatrixWorld();
  });

  return (
    <>
      <directionalLight
        ref={ligths}
        castShadow
        position={[4, 4, 1]}
        intensity={4.5}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={10}
        shadow-camera-right={10}
        shadow-camera-bottom={-10}
        // intensity={4.5}
        shadow-normalBias={0.04}
        shadow-camera-left={-10}
      />
      <ambientLight intensity={1.5} />
    </>
  );
}
