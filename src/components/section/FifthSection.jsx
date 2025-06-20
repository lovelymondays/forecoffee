import React from "react";

function FifthSection() {
  return (
    <>
      {/* fifth screen */}
      <section className="sectionContainer items-start h-screen pb-10">
        <div className="text-center text-wrap w-full justify-between  space-y-1 lg:space-y-2">
          <h1 className="titleHeader pb-10">Menu Must-Haves </h1>
          <div className="w-full flex h-1/2 flex-row justify-around text-wrap">
            <p className="paragraph w-1/3 h=1/4">Pandan Latte</p>
            <p className="paragraph w-1/3 h-1/4">Aren Latte</p>
            <p className="paragraph w-1/3 h-1/4 break-all">
              Butterscotch Sea Salt Latte
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default FifthSection;
