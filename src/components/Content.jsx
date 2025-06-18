import React from "react";

export default function Content() {
  return (
    <>
      <main className="w-full p-10">
        {/* first screen */}
        <section className="sectionContainer">
          <div className="text-center text-wrap lg:w-2/3 justify-between h-auto  space-y-1 lg:space-y-2">
            <h1 className="font-onder w-full  text-2xl lg:text-6xl">
              Grind The Essentials
            </h1>
            <h2 className="font-grotesk w-full text-md tracking-tighter lg:text-4xl md:text-2xl lg:tracking-tight">
              Made with Indonesia's Finest Beans for Your Everyday Buzz{" "}
            </h2>
          </div>
        </section>
        {/* second screen */}
        <section className="flex h-screen text-wrap justify-center text-white flex-col items-end">
          <div className=" h-1/4 w-1/2 lg:w-1/3">
            <h1 className="font-onder w-full lg:text-2xl text-xl">
              Fresh Beans
            </h1>
            <p className="hidden lg:block font-gortesk  text-lg tracking-tighter lg:text-3xl">
              100% Arabica, straight from Gayo, Toraja, West Java—roasted &
              crushed to perfection
            </p>
          </div>
          <div className="h-1/4 w-1/3">
            <h1 className="titleHeader">Modern Tech, OG Skill</h1>
            <p className="paragraph">
              Baristas wield next-gen gadgets, but the real magic? Human touch
            </p>
          </div>
          <div className="h-1/4 w-1/3">
            <h1 className="titleHeader">Every Cup = Moment</h1>
            <p className="paragraph">
              Your daily dose of happiness, served one perfectly-crafted cup at
              a time.
            </p>
          </div>
        </section>
        {/* third screen */}
        <section className="sectionContainer">
          <div className="text-center text-wrap lg:w-2/3 justify-between h-auto  space-y-1 lg:space-y-2">
            <h1 className="titleHeader">Our Story</h1>
            <p className="paragraph">
              Since 2018, Fore Coffee has sprung from the spirit of a
              forest—growing fast, standing tall, breathing life into the coffee
              culture fore.coffee +14 fore.coffee +14 fore.coffee +14 . From
              seed to cup: hand-picked beans → roasted by us → brewed by barista
              pros → delivered straight to your soul.
            </p>
          </div>
        </section>
        {/* fourth screen */}
        <section className="sectionContainer">
          <div className="text-center text-wrap lg:w-2/3 justify-between h-auto  space-y-1 lg:space-y-2">
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
          <div className="text-center text-wrap lg:w-2/3 justify-between h-auto  space-y-1 lg:space-y-2">
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
