import React from "react";
import PageWithSidebarLayout from "../../layouts/PageWithSidebarLayout";
import "./About.css";

const About = () => {
  return (
    <PageWithSidebarLayout
      pageClass="about-pg"
      headerTitle="Professional Cars Limited"
      headerClass="page-hdr--about lazy-background visible"
      showSidebar={true}
    >
      <p>
        Professional Cars specialise in sourcing high quality, pre owned Nissan, BMW's,
        Audi's and Mercedes. We pride ourselves on our bespoke customisation and
        optional upgrades that we would be delighted to discuss with you.
      </p>
      <h2>Our Process</h2>
      <ul className="list-bullets">
        <li>Select your vehicle</li>
        <br />
        <li>Speak with a member of our sales team</li>
        <br />
        <li>Discuss any optional upgrades</li>
        <br />
        <li>Confirm funding options</li>
        <br />
        <li>
          Secure the vehicles with a £500 reservation fee and let the upgrades
          begin
        </li>
        <br />
        <li>Arrange a collection date</li>
        <br />
      </ul>
      <p>
        Once happy with everything, just a few signatures and you're ready to
        drive away in you beautiful, bespoke car.
      </p>
      <br />
      <h2>Optional Extras:</h2>
      <ul className="list-bullets">
        <br />
        <li>Calliper painting</li>
        <br />
        <li>Window tinting</li>
        <br />
        <li>Full styling kits</li>
        <br />
        <li>Ceramic coating</li>
        <br />
        <li>M Style wing mirrors</li>
        <br />
        <li>Wing mirror painting</li>
        <br />
        <li>Gloss black badges</li>
        <br />
        <li>De badge</li>
        <br />
        <li>De chrome</li>
        <br />
        <li>Rear spoiler</li>
        <br />
        <li>Front splitter</li>
        <br />
        <li>Quad exit rear diffuser</li>
        <br />
        <li>Alloy wheel options</li>
        <br />
      </ul>
    </PageWithSidebarLayout>
  );
};

export default About;
