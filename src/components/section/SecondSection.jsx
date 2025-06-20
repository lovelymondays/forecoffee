import React from "react";

function SecondSection() {
  return (
    <>
      {/* second screen */}
      <section className="sectionTwoContainer">
        <div className="divTwoContainer">
          <h1 className="sectiontwoTitle">Fresh Beans</h1>
          <p className="sectiontwoParagraph">
            100% Arabica, straight from Gayo, Toraja, West Java—roasted &
            crushed to perfection
          </p>
        </div>
        <div className="divTwoContainer">
          <h1 className="sectiontwoTitle">Modern Tech, OG Skill</h1>
          <p className="sectiontwoParagraph">
            Baristas wield next-gen gadgets, but the real magic? Human touch
          </p>
        </div>
        <div className="divTwoContainer">
          <h1 className="sectiontwoTitle">Every Cup = Moment</h1>
          <p className="sectiontwoParagraph">
            Your daily dose of happiness, served one perfectly-crafted cup at a
            time.
          </p>
        </div>
      </section>
    </>
  );
}

export default SecondSection;
