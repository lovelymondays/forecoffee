import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  ScrollControls,
  Scroll,
} from "@react-three/drei";
import { Leva, useControls } from "leva";
import CoffeeModel from "./components/CoffeModel";
import Lights from "./components/Lights";
import { Perf } from "r3f-perf";
import "./index.css";

export default function App() {
  // Global controls for the entire scene
  const {
    numberOfSections,
    numberOfModels,
    scrollDamping,
    shadowOpacity,
    shadowScale,
    showPerformance,
    environmentPreset,
    backgroundColor,
  } = useControls("Global Settings", {
    numberOfSections: { value: 4, min: 2, max: 8, step: 1 },
    numberOfModels: { value: 1, min: 1, max: 10, step: 1 },
    scrollDamping: { value: 0.1, min: 0.01, max: 1, step: 0.01 },
    shadowOpacity: { value: 0.3, min: 0, max: 1, step: 0.01 },
    shadowScale: { value: 10, min: 1, max: 20, step: 0.5 },
    showPerformance: { value: false },
    environmentPreset: {
      value: "city",
      options: [
        "city",
        "sunset",
        "dawn",
        "night",
        "studio",
        "forest",
        "apartment",
      ],
    },
    backgroundColor: { value: "#006041" },
  });

  return (
    <div className="w-full h-screen">
      {/* Leva Controls Panel */}
      <Leva collapsed={false} />

      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        shadows
        className="w-full h-full"
      >
        {showPerformance && <Perf position="top-left" />}

        <ScrollControls pages={numberOfSections} damping={scrollDamping}>
          <Suspense fallback={null}>
            <Lights />
            <Environment preset={environmentPreset} />
            <ContactShadows
              position-y={-2}
              opacity={shadowOpacity}
              scale={shadowScale}
              blur={5}
              color={"#006041"}
            />

            {/* Render multiple coffee models */}
            {Array.from({ length: numberOfModels }, (_, index) => (
              <CoffeeModel
                key={`coffee-model-${index}`}
                scale={0.4}
                initialPosition={[index * 2 - numberOfModels, 0, 0]}
                scrollBasedAnimation={true}
                sectionIndex={index}
                totalSections={numberOfSections}
              />
            ))}
          </Suspense>

          {/* Dynamic HTML Content */}
          <Scroll html style={{ width: "100%" }}>
            <div className="w-full">
              {/* first screen */}
              <section className="flex text-white h-screen justify-center items-center text-wrap">
                <div className="text-center text-wrap lg:w-2/3 justify-between h-auto  space-y-1 lg:space-y-2">
                  <h1 className="font-onder w-full  text-2xl lg:text-6xl">
                    Grind The Essentials
                  </h1>
                  <h2 className="font-grotesk w-full text-md tracking-tighter lg:text-4xl md:text-2xl lg:tracking-tight">
                    Made with Indonesia's Finest Beans for Your Everyday Buzz{" "}
                  </h2>
                  {/* <p className="font-gortesk text-md lg:text-3xl tracking-tighter lg:tracking-wide">
                    Your go-to coffee, elevated—because basic? That’s so
                    yesterday.
                  </p>
                  <p className="font-gortesk text-md lg:text-3xl">
                    Sip bold. Live loud. You in?
                  </p> */}
                </div>
              </section>
              {/* second screen */}
              <section className="flex text-white h-screen justify-center items-center text-wrap">
                <div className="text-center text-wrap lg:w-2/3 justify-between h-auto  space-y-1 lg:space-y-2">
                  <div>
                    <h1 className="font-onder w-full text-xl lg:text-2xl text-">
                      Fresh Beans
                    </h1>
                    <p className="paragraph">
                      100% Arabica, straight from Gayo, Toraja, West
                      Java—roasted & crushed to perfection
                    </p>
                  </div>
                  <div>
                    <h1 className="titleHeader">Modern Tech, OG Skill</h1>
                    <p className="paragraph">
                      Baristas wield next-gen gadgets, but the real magic? Human
                      touch
                    </p>
                  </div>
                  <div>
                    <h1 className="font-onder w-full text-xl lg:text-2xl">
                      Every Cup = Moment
                    </h1>
                    <p className="paragraph">
                      Your daily dose of happiness, served one perfectly-crafted
                      cup at a time.
                    </p>
                  </div>
                </div>
              </section>
              {/* third screen */}
              <section className="flex text-white h-screen justify-center items-center text-wrap">
                <div className="text-center text-wrap lg:w-2/3 justify-between h-auto  space-y-1 lg:space-y-2">
                  <h1 className="titleHeader">Our Story</h1>
                  <p className="paragraph">
                    Since 2018, Fore Coffee has sprung from the spirit of a
                    forest—growing fast, standing tall, breathing life into the
                    coffee culture fore.coffee +14 fore.coffee +14 fore.coffee
                    +14 . From seed to cup: hand-picked beans → roasted by us →
                    brewed by barista pros → delivered straight to your soul.
                  </p>
                </div>
              </section>
              {/* fourth screen */}
              <section className="flex text-white h-screen justify-center items-center text-wrap">
                <div className="text-center text-wrap lg:w-2/3 justify-between h-auto  space-y-1 lg:space-y-2">
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
              {/* fitfth screen */}
              <section className="flex text-white h-screen justify-center items-center text-wrap">
                <div className="text-center text-wrap lg:w-2/3 justify-between h-auto  space-y-1 lg:space-y-2">
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
            </div>
          </Scroll>
        </ScrollControls>

        {/* Dynamic Background Color */}
        <color attach="background" args={[backgroundColor]} />
      </Canvas>

      {/* CSS Background Gradient */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${backgroundColor}cc, #1a1a1acc, ${backgroundColor}cc)`,
        }}
      ></div>
    </div>
  );
}
