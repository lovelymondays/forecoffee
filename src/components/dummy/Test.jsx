import { useEffect, useRef } from "react";
import FirstSection from "./section/FirstSection";
import SecondSection from "./section/SecondSection";
import FourthSection from "./section/FourthSection";
import FifthSection from "./section/FifthSection";
import { useScroll } from "@react-three/drei";

export default function Content() {
  const mainRef = useRef();
  const horizontalSectionRef = useRef();
  const scrollWrapperRef = useRef();
  const scrollData = useScroll();

  useEffect(() => {
    if (!scrollWrapperRef.current) return;

    const handleScroll = () => {
      // Get the scroll progress (0 to 1)
      const progress = scrollData.offset;

      // Calculate the total width of the horizontal content
      const scrollableWidth =
        scrollWrapperRef.current.scrollWidth - window.innerWidth;

      // Apply the horizontal transform based on scroll progress
      const translateX = -progress * scrollableWidth;

      scrollWrapperRef.current.style.transform = `translateX(${translateX}px)`;
    };

    // Listen to scroll events
    const unsubscribe =
      scrollData.el?.addEventListener?.("scroll", handleScroll) ||
      window.addEventListener("scroll", handleScroll);

    return () => {
      if (typeof unsubscribe === "function") {
        unsubscribe();
      } else {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [scrollData]);

  return (
    <>
      <main className="w-full p-2 lg:p-10" ref={mainRef}>
        <FirstSection />
        <SecondSection />

        {/* horizontal screen */}
        <section
          ref={horizontalSectionRef}
          className="sticky top-0 m-auto h-screen overflow-hidden"
        >
          <div
            ref={scrollWrapperRef}
            className="flex h-full w-fit items-center justify-center transition-transform duration-100 ease-out"
          >
            {/* Content 1 */}
            <div className=" w-screen flex-shrink-0 flex flex-col items-center justify-center">
              <h1 className="text-4xl font-bold w-1/2">Our Story</h1>
              <p className="text-lg max-w-md mx-auto mt-4">
                Since 2018, Fore Coffee has sprung from the spirit of a
                forest—growing fast, standing tall, breathing life into the
                coffee culture.
              </p>
            </div>
            {/* Content 2 */}
            <div className=" w-screen flex-shrink-0 flex items-center justify-center">
              <h3 className="text-4xl font-bold text-center w-1/2">
                From seed to cup hand-picked beans
              </h3>
            </div>
            {/* Content 3 */}
            <div className=" w-screen flex-shrink-0 flex items-center justify-center">
              <h3 className="text-4xl font-bold text-center  w-1/2">
                Roasted by Us
              </h3>
            </div>
            {/* Content 4 */}
            <div className=" w-screen flex-shrink-0 flex items-center justify-center">
              <h3 className="text-4xl font-bold text-center  w-1/2">
                Brewed by Barista Pros
              </h3>
            </div>
            {/* Content 5 */}
            <div className=" w-screen flex-shrink-0 flex items-center justify-center">
              <h3 className="text-4xl font-bold text-center  w-1/2">
                Delivered Straight to Your Soul
              </h3>
            </div>
          </div>
        </section>

        <FourthSection />
        <FifthSection />
      </main>
    </>
  );
}
