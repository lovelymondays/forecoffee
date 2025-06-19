import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  ScrollControls,
  Scroll,
} from "@react-three/drei";
import { Leva } from "leva";
import CoffeeModel from "./components/CoffeModel";
import Lights from "./components/Lights";
import Content from "./components/Content";
import "./index.css";

export default function App() {
  const numberOfSections = 5; // Define the number of sections

  return (
    <div className="w-full h-screen scrollbar-hide relative ">
      <Leva collapsed={true} />
      {/* <Content /> */}
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        shadows
        className="w-full h-full z-10 fixed top-0 left-0"
      >
        {/* <Perf position="top-left" visible={false} /> */}

        <ScrollControls pages={numberOfSections}>
          <Lights />
          <Environment preset="city" />
          <Suspense fallback={null}>
            {/* Single coffee model with scroll animation for sections 1-4 */}
            <CoffeeModel
              scale={0.4}
              scrollBasedAnimation={true}
              numberOfSections={numberOfSections}
              isMultiple={false}
            />

            {/* Three coffee models that appear at the end */}
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
            {/* Dynamic HTML Content */}
            <Content />
          </Scroll>
        </ScrollControls>

        {/* Dynamic Background Color */}
        <color attach="background" args={["#006041"]} />
      </Canvas>
    </div>
  );
}
