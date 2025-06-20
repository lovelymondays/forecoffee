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
import { Perf } from "r3f-perf";

import { useRef, useState, useEffect } from "react";
import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Move the horizontal scroll logic to a separate component that runs inside Canvas
function HorizontalScrollController() {
  const scroll = useScroll();
  const [smoothProgress, setSmoothProgress] = useState(0);
  const currentX = useRef(0);
  const currentY = useRef(0);

  useFrame(() => {
    const containerEl = document.querySelector("[data-horizontal-container]");
    const contentEl = document.querySelector("[data-horizontal-content]");

    if (!containerEl || !contentEl) return;

    const scrollProgress = scroll.offset;

    const containerWidth = containerEl.offsetWidth;
    const contentWidth = contentEl.scrollWidth;
    const containerHeight = containerEl.offsetHeight;
    const contentHeight = contentEl.scrollHeight;

    const maxTranslateX = contentWidth - containerWidth;
    const maxTranslateY = contentHeight - containerHeight;

    const lerpedProgress = THREE.MathUtils.lerp(
      smoothProgress,
      scrollProgress,
      0.05
    );
    setSmoothProgress(lerpedProgress);

    const targetX = -lerpedProgress * maxTranslateX;
    const targetY = -lerpedProgress * maxTranslateY;

    currentX.current = THREE.MathUtils.lerp(currentX.current, targetX, 0.1);
    currentY.current = THREE.MathUtils.lerp(currentY.current, targetY, 0.1);

    contentEl.style.transform = `translate3d(${Math.round(
      currentX.current
    )}px , ${Math.round(currentY.current)}px, 0)`;
  });

  return null;
}

export default function App() {
  const numberOfSections = 5;

  return (
    <div className="w-full h-screen scrollbar-hide relative ">
      <Leva collapsed={true} />
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        shadows
        className="w-full h-full z-10 fixed top-0 left-0"
      >
        <Perf position="top-left" visible={false} />
        <ScrollControls pages={numberOfSections}>
          <HorizontalScrollController />
          <Lights />
          <Environment preset="city" />
          <Suspense fallback={null}>
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
            <main className="w-full p-2 lg:p-10">
              <section className="sectionOneContainer">
                <div className="divOneContainer">
                  <h1 className="sectionOneTitle">Grind The Essentials</h1>
                  <h2 className="sectionOneParagraph">
                    Made with Indonesia's Finest Beans for Your Everyday Buzz{" "}
                  </h2>
                </div>
              </section>
              <section className="sectionTwoContainer">
                <div className="divTwoContainer">
                  <h1 className="sectiontwoTitle">Fresh Beans</h1>
                  <p className="sectiontwoParagraph">
                    100% Arabica, straight from Gayo, Toraja, West Java—roasted
                    & crushed to perfection
                  </p>
                </div>
                <div className="divTwoContainer">
                  <h1 className="sectiontwoTitle">Modern Tech, OG Skill</h1>
                  <p className="sectiontwoParagraph">
                    Baristas wield next-gen gadgets, but the real magic? Human
                    touch
                  </p>
                </div>
                <div className="divTwoContainer">
                  <h1 className="sectiontwoTitle">Every Cup = Moment</h1>
                  <p className="sectiontwoParagraph">
                    Your daily dose of happiness, served one perfectly-crafted
                    cup at a time.
                  </p>
                </div>
              </section>

              {/* Section 3 - Horizontal Scrolling */}
              <section className="relative overflow-hidden">
                <div
                  data-horizontal-container
                  className="w-full h-screen overflow-hidden relative flex justify-center items-center will-change-transform"
                  style={{ height: "100vh" }}
                >
                  <div
                    data-horizontal-content
                    className="flex items-center justify-between h-full whitespace-nowrap text-white transition-transform duration-300 ease-out"
                    style={{ width: "max-content" }}
                  >
                    {/* Content Sections */}
                    <div className="flex flex-col w-1/5 justify-center items-center flex-shrink-0 px-8">
                      <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        Our Story
                      </h1>
                      <p className="text-lg md:text-xl text-center whitespace-normal">
                        Since 2018, Fore Coffee has sprung from the spirit of a
                        forest—growing fast, standing tall, breathing life into
                        the coffee culture.
                      </p>
                    </div>
                    <div className="flex  w-1/5 flex-col justify-center items-center flex-shrink-0 text-center px-8">
                      <h3 className="text-4xl md:text-6xl font-bold whitespace-normal max-w-4xl">
                        From seed to cup hand-picked beans
                      </h3>
                    </div>
                    <div className="flex flex-col  w-1/5 justify-center items-center flex-shrink-0 text-center px-8">
                      <h3 className="text-4xl md:text-6xl font-bold whitespace-normal">
                        Roasted by Us
                      </h3>
                    </div>
                    <div className="flex flex-col  w-1/5 justify-center items-center flex-shrink-0 text-center px-8">
                      <h3 className="text-4xl md:text-6xl font-bold whitespace-normal">
                        Brewed by Barista Pros
                      </h3>
                    </div>
                    <div className="flex flex-col  w-1/5 justify-center items-center flex-shrink-0 text-center px-8">
                      <h3 className="text-4xl md:text-6xl font-bold whitespace-normal max-w-4xl">
                        Delivered Straight to Your Soul
                      </h3>
                    </div>
                  </div>
                </div>
              </section>

              <section className="sectionContainer">
                <div className="text-center text-wrap lg:w-2/3 justify-between h-auto space-y-1 lg:space-y-2">
                  <h1 className="titleHeader">What's Poppin</h1>
                  <p className="paragraph">
                    Fore Experience Launch: A flagship concept store in Panglima
                    Polim that's more than coffee—it's an experience
                  </p>
                  <p className="paragraph">
                    World of Coffee 2025 Spotlight: Fore Coffee took center
                    stage, pushing sustainability & innovation to the limit
                  </p>
                  <p className="paragraph">
                    IPO Dreams Realized: Early 2025, Fore went public and
                    shattered expectations—thanks to YOU
                  </p>
                </div>
              </section>
              <section className="sectionContainer">
                <div className="text-center text-wrap lg:w-2/3 justify-between h-auto space-y-1 lg:space-y-2">
                  <h1 className="titleHeader"> 💥 Menu Must-Haves </h1>
                  <p className="paragraph">
                    Pandan Latte – IG-famous, taste viral
                  </p>
                  <p className="paragraph">Aren Latte</p>
                  <p className="paragraph">
                    Butterscotch Sea Salt Latte – sweet, salty, legendary
                  </p>
                </div>
              </section>
            </main>
          </Scroll>
        </ScrollControls>

        <color attach="background" args={["#006041"]} />
      </Canvas>
    </div>
  );
}
