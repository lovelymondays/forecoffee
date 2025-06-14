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
    showPerformance: { value: true },
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
    backgroundColor: { value: "#0a0a0a" },
  });

  // Dynamic section data
  const sectionData = [
    {
      title: "Classic",
      subtitle: "Roast",
      color: "amber",
      description:
        "Experience the rich, bold flavors of our signature dark roast. Carefully crafted for the perfect morning ritual.",
      buttonText: "Discover More",
      alignment: "justify-end pr-16",
    },
    {
      title: "Golden",
      subtitle: "Blend",
      color: "orange",
      description:
        "A lighter, more delicate blend with notes of caramel and vanilla. Perfect for afternoon contemplation.",
      buttonText: "Explore Blend",
      alignment: "justify-start pl-16",
    },
    {
      title: "Premium",
      subtitle: "Selection",
      color: "emerald",
      description:
        "Discover our exclusive collection of single-origin beans from around the world.",
      buttonText: "View Collection",
      alignment: "justify-center",
    },
    {
      title: "Perfect",
      subtitle: "Brew",
      color: "purple",
      description:
        "Master the art of coffee brewing with our expert tips and premium equipment.",
      buttonText: "Learn More",
      alignment: "justify-end pr-16",
    },
    {
      title: "Artisan",
      subtitle: "Craft",
      color: "blue",
      description:
        "Handcrafted by master roasters with decades of experience in the art of coffee.",
      buttonText: "Meet Artisans",
      alignment: "justify-start pl-16",
    },
    {
      title: "Organic",
      subtitle: "Origin",
      color: "green",
      description:
        "Sustainably sourced from organic farms committed to environmental responsibility.",
      buttonText: "Learn Origin",
      alignment: "justify-center",
    },
    {
      title: "Limited",
      subtitle: "Edition",
      color: "red",
      description:
        "Exclusive seasonal blends available only for a limited time. Don't miss out.",
      buttonText: "Get Limited",
      alignment: "justify-end pr-16",
    },
    {
      title: "Master",
      subtitle: "Class",
      color: "indigo",
      description:
        "Join our coffee masterclasses and learn from industry experts.",
      buttonText: "Book Class",
      alignment: "justify-start pl-16",
    },
  ];

  // Get the actual sections to display based on numberOfSections
  const activeSections = sectionData.slice(0, numberOfSections);

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
              color={"cyan"}
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
              {activeSections.map((section, index) => (
                <section
                  key={`section-${index}`}
                  className={`h-screen flex items-center ${section.alignment} relative`}
                >
                  <div
                    className={`max-w-md text-white ${
                      section.alignment.includes("center") ? "text-center" : ""
                    }`}
                  >
                    <h1 className="text-6xl font-bold mb-6 leading-tight">
                      {section.title}
                      <br />
                      <span className={`text-${section.color}-400`}>
                        {section.subtitle}
                      </span>
                    </h1>
                    <p className="text-xl text-white/80 mb-8 leading-relaxed">
                      {section.description}
                    </p>
                    <button
                      className={`bg-${section.color}-600 hover:bg-${section.color}-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg`}
                    >
                      {section.buttonText}
                    </button>
                  </div>
                </section>
              ))}
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
