import React from "react";
import PageWithSidebarLayout from "../../layouts/PageWithSidebarLayout";
import "./Finance.css";

const Finance = () => {
  const mainContent = (
    <div className="pad-20 overflow-hidden">
      <h1> Finance </h1>
      <p>
        {" "}
        At Professional Cars, We know that purchasing a vehicle is a big investment for most people and we’re dedicated to making the buying process as straightforward and hassle-free for our customers as possible. We can help you create a finance package that could get you behind the wheel of your dream car.
        Finance is often a major part of our customers’ car buying journeys, so we have taken the necessary steps to offer some great packages as well as peace of mind. As a Financial Conduct Authority (FCA) registered dealership, we have developed relationships with a wide range of lenders nationwide for your convenience.{" "}
      </p>
      <h2> Car Finance Explained </h2>
      <p>
        {" "}
        There are three main types of finance deals that you might want to consider:{" "}
      </p>
      <h3> Hire Purchase </h3>
      <p>
        {" "}
        Sometimes just referred to as HP, this is a loan secured against the vehicle itself. This is a great choice for people who want to spread out the cost of their car. Typical HP deals involve a deposit and the rest of the balance is paid in instalments, plus interest. Once you’ve paid your final instalment, you own the car outright.{" "}
      </p>

      <h3> Personal Contract Purchase (PCP) </h3>
      <p>
        {" "}
        This is a good option for those who like to change their car every few years but don’t want to fork out a big sum each time. You will typically be asked to pay a deposit followed by monthly payments. At the end of the agreed period, for example, three years, you will have the option of paying the rest of balance, returning the vehicle or using any residual value on a deal with your next car.{" "}
      </p>

      <h3> Personal Leasing (Contract Hire) </h3>
      <p>
        {" "}
        Contract Hire deals are very much like the PCP deals described above, however, you won’t have an option to buy the car outright at the end of the deal. {" "}
      </p>

      <p>
        {" "}
        So, whatever your credit history, Professional Cars are in a position to create the perfect finance solution for you. Get in touch with a member of our friendly team to find out what your options are. {" "}
      </p>
 
      <br />
      <br />
      <ul className="space-y-2">
            <li><p><strong>Why Finance Through a Dealership?</strong> <iframe src="https://player.vimeo.com/video/102311026" width="500" height="281" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" style="max-width:100%;"></iframe></p></li>

<li><p><strong>What is Hire Purchase?</strong> <iframe src="https://player.vimeo.com/video/106279545" width="500" height="281" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" style="max-width:100%;"></iframe></p></li>

<li><p><strong>What is Personal Contract Purchase?</strong> <iframe src="https://player.vimeo.com/video/105355895" width="500" height="281" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" style="max-width:100%;"></iframe></p></li>
</ul>
      <br />
      <br />
    </div>
  );

  return (
    <PageWithSidebarLayout
      pageClass="finance-pg"
      headerTitle="Finance"
      headerClass="page-hdr--finance"
      showSidebar={false}
    >
      {mainContent}
    </PageWithSidebarLayout>
  );
};

export default Finance;
