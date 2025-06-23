import { useRef, useState } from "react";
import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import FirstSection from "./section/FirstSection";
import SecondSection from "./section/SecondSection";
import FourthSection from "./section/FourthSection";
import FifthSection from "./section/FifthSection";

export default function Content() {
  const containerRef = useRef();
  const contentRef = useRef();
  const scroll = useScroll();

  const [smoothProgress, setSmoothProgress] = useState(0);
  const currentX = useRef(0);
  const currentY = useRef(0);

  useFrame(() => {
    if (!containerRef.current || !contentRef.current) return;

    const scrollProgress = scroll.offset;

    const containerWidth = containerRef.current.offsetWidth;
    const contentWidth = contentRef.current.scrollWidth;
    const containerHeight = containerRef.current.offsetHeight;
    const contentHeight = contentRef.current.scrollHeight;

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

    contentRef.current.style.transform = `translate3d(${Math.round(
      currentX.current
    )}px, ${Math.round(currentY.current)}px, 0)`;

    // console.log(
    //   "IN VIEW:",
    //   "scroll:",
    //   scrollProgress.toFixed(2),
    //   "progress:",
    //   lerpedProgress.toFixed(2)
    // );
  });

  return (
    <>
      <main className="w-full p-2 lg:p-10">
        <FirstSection />
        <SecondSection />

        {/* Section 3 - Horizontal Scrolling */}
        <section className="relative overflow-hidden">
          <div
            ref={containerRef}
            className="w-full h-screen overflow-hidden relative flex justify-center items-center will-change-transform"
            style={{ height: "100vh" }}
          >
            <div
              ref={contentRef}
              className="flex items-center justify-between h-full whitespace-nowrap text-white transition-transform duration-300 ease-out w-full"
            >
              {/* Content Sections */}
              <div className="divThreeContainer">
                <h1 className="sectionThreeTitle">Our Story</h1>
                <p className="sectionThreeParagraph">
                  Since 2018, Fore Coffee has sprung from the spirit of a
                  forest—growing fast, standing tall, breathing life into the
                  coffee culture.
                </p>
              </div>
              <div className="divThreeContainer">
                <h1 className="sectionThreeTitle">Our Story</h1>
                <p className="sectionThreeParagraph">
                  Since 2018, Fore Coffee has sprung from the spirit of a
                  forest—growing fast, standing tall, breathing life into the
                  coffee culture.
                </p>
              </div>
              <div className="divThreeContainer">
                <h1 className="sectionThreeTitle">Our Story</h1>
                <p className="sectionThreeParagraph">
                  Since 2018, Fore Coffee has sprung from the spirit of a
                  forest—growing fast, standing tall, breathing life into the
                  coffee culture.
                </p>
              </div>
            </div>
          </div>
        </section>

        <FourthSection />
        <FifthSection />
      </main>
    </>
  );
}
