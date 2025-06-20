import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Horizontal() {
  const mainRef = useRef();
  const horizontalSectionRef = useRef();
  const scrollWrapperRef = useRef();

  useGSAP(
    () => {
      const horizontalSection = horizontalSectionRef.current;
      const scrollWrapper = scrollWrapperRef.current;
      const contents = gsap.utils.toArray(scrollWrapper.children);

      // Calculate the total width of all content sections
      let totalWidth = 0; // Initialize with 0, as we will add individual widths
      contents.forEach((content) => {
        totalWidth += content.offsetWidth;
      });

      const initialOffset = window.innerWidth / 2; // Half the screen width

      // Create a GSAP timeline for the horizontal scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: horizontalSection,
          pin: true,
          start: "top top", // The pinning still starts when the section hits the top
          end: () => "+=" + (totalWidth - window.innerWidth),
          scrub: 0.2,
          invalidateOnRefresh: true,
        },
      });

      // Animate the scrollWrapper horizontally
      tl.fromTo(
        scrollWrapper,
        {
          x: initialOffset, // Start with "Content 1" pushed right by half screen width
        },
        {
          x: () => -(totalWidth - window.innerWidth), // End at the same final position
          ease: "none", // Use 'none' for scrubbed animations
        }
      );

      // Optional: Add individual animations for each content section as it comes into view
      contents.forEach((content) => {
        ScrollTrigger.create({
          trigger: content,
          containerAnimation: tl,
          start: "left center",
          end: "right center",
          // onLeave: () => gsap.to(content, { autoAlpha: 1, scale: 1 }),
          // onEnterBack: () => gsap.to(content, { autoAlpha: 1, scale: 1 }),
          // onLeaveBack: () => gsap.to(content, { autoAlpha: 1, scale: 1 }),
          // markers: true, // Uncomment for debugging
        });
      });
    },
    { scope: mainRef }
  );

  return (
    <>
      <main className="w-full p-2 lg:p-10" ref={mainRef}>
        {/* first screen */}
        <section className="w-full bg-red-400">
          <h1>start section</h1>
        </section>

        {/* horizontal screen */}
        <section
          ref={horizontalSectionRef}
          className="sticky top-0 m-auto h-screen overflow-hidden"
        >
          <div
            ref={scrollWrapperRef}
            className="flex h-full w-fit items-center justify-center"
          >
            {/* Content 1 */}
            <div className=" w-screen flex-shrink-0 flex flex-col items-center justify-center">
              <h1 className="sectionThreeTitle  w-1/2">Our Story</h1>
              <p className="paragraph max-w-md mx-auto">
                Since 2018, Fore Coffee has sprung from the spirit of a
                forest—growing fast, standing tall, breathing life into the
                coffee culture.
              </p>
            </div>
            {/* Content 2 */}
            <div className=" w-screen flex-shrink-0 flex items-center justify-center">
              <h3 className="sectionThreeTitle text-center w-1/2">
                From seed to cup hand-picked beans
              </h3>
            </div>
            {/* Content 3 */}
            <div className=" w-screen flex-shrink-0 flex items-center justify-center">
              <h3 className="sectionThreeTitle text-center  w-1/2">
                Roasted by Us
              </h3>
            </div>
            {/* Content 4 */}
            <div className=" w-screen flex-shrink-0 flex items-center justify-center">
              <h3 className="sectionThreeTitle text-center  w-1/2">
                Brewed by Barista Pros
              </h3>
            </div>
            {/* Content 5 */}
            <div className=" w-screen flex-shrink-0 flex items-center justify-center">
              <h3 className="sectionThreeTitle text-center  w-1/2">
                Delivered Straight to Your Soul
              </h3>
            </div>
          </div>
        </section>

        {/* fourth screen */}
        <section className="sectionContainer">
          <div className="text-center text-wrap lg:w-2/3 justify-between h-auto space-y-1 lg:space-y-2">
            <h1 className="titleHeader">What's Poppin</h1>
            <p className="paragraph">
              Fore Experience Launch: A flagship concept store in Panglima Polim
              that's more than coffee—it's an experience
            </p>
            <p className="paragraph">
              World of Coffee 2025 Spotlight: Fore Coffee took center stage,
              pushing sustainability & innovation to the limit
            </p>
            <p className="paragraph">
              IPO Dreams Realized: Early 2025, Fore went public and shattered
              expectations—thanks to YOU
            </p>
          </div>
        </section>

        {/* fifth screen */}
        <section className="sectionContainer">
          <div className="text-center text-wrap lg:w-2/3 justify-between h-auto space-y-1 lg:space-y-2">
            <h1 className="titleHeader"> 💥 Menu Must-Haves </h1>
            <p className="paragraph">Pandan Latte – IG-famous, taste viral</p>
            <p className="paragraph">Aren Latte</p>
            <p className="paragraph">
              Butterscotch Sea Salt Latte – sweet, salty, legendary
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
