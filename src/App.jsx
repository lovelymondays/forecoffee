import { Scroll, ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Lights from "./components/Lights";
import CoffeeModel from "./components/CoffeModel";
import { Suspense } from "react";
import Content from "./components/Content";

export default function App() {
  const numberOfSections = 5;
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 50 }}
      shadows
      className="w-full h-full z-10 fixed top-0 left-0"
      // numberOfSections={numberOfSections}
    >
      <ScrollControls pages={numberOfSections}>
        <Suspense fallback={null}>
          <Lights />

          <CoffeeModel
            scale={0.4}
            scrollBasedAnimation={true}
            numberOfSections={numberOfSections}
            isMultiple={false}
          />
          {[0, 1, 2].map((index) => (
            <CoffeeModel
              key={`multiple-coffee-${index}`}
              scale={0.3}
              scrollBasedAnimation={true}
              numberOfSections={numberOfSections}
              isMultiple={true}
              multipleIndex={index}
            />
          ))}
        </Suspense>
        <Scroll html style={{ width: "100%" }}>
          <Content numberOfSections={numberOfSections} />
        </Scroll>
      </ScrollControls>

      <color attach="background" args={["#006041"]} />
    </Canvas>
  );
}
