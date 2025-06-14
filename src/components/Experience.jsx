import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import Lights from "./Lights";
import CoffeeModel from "./CoffeModel";

export default function Experience() {
  return (
    <>
      <Canvas
        shadows
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [2.5, 4, 6],
        }}
        className="bg-blue-500 h-full w-full"
      >
        <Perf position="top-left" visible={false} />
        <OrbitControls />
        <Environment preset="sunset" />
        <Lights />
        <CoffeeModel />
      </Canvas>
    </>
  );
}
