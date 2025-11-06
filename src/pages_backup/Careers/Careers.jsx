import React from "react";
import PageWithSidebarLayout from "../../layouts/PageWithSidebarLayout";
import "./Careers.css";

const Careers = () => {
  const mainContent = (
    <div className="pad-20 overflow-hidden">
      <h2 className="snipcss0-0-0-1 tether-abutted tether-abutted-top tether-element-attached-top tether-element-attached-center tether-target-attached-top tether-target-attached-center">
        Interested in a Career in the Motor Industry with Professional Cars?
      </h2>
      <p>
        Do you live in or around the Stamford area and feel you have what it
        takes to offer great levels of service? We always want to hear from
        quality individuals who can make a difference to both Professional Cars
        and our customers.
      </p>
      <p>
        Please call on <a href="tel:07788929755">07788929755</a> for an
        informal chat.
      </p>
      <h2>Potential Roles Available:</h2>
      <h3>Vehicle Technicians</h3>
      <p>
        Joining us as a Vehicle Technician within our busy workshop team will
        mean carrying out motor vehicle servicing and repairs to approved
        standards as well as delivering unbeatable customer service every time.
      </p>
      <p>
        Our Vehicle Technicians carry out diagnosis while undertaking a wide
        range of servicing and repair work on the vehicles we sell. As a Vehicle
        Technician you will ensure effective use of technical knowledge and
        skills enabling efficient, economic and safe servicing and repair of
        customer vehicles while building long-lasting and effective working
        relationships with customers and colleagues.
      </p>
      <p>
        All Vehicle Technicians are responsible for accurately completing repair
        and service records as well as any other appropriate activities and
        supporting company policy and best practice. You will analyse work
        carefully to understand a vehicle's condition, the accuracy of the
        diagnosis, and what work has been organised.
      </p>
      <h3>Digital Marketing Executives</h3>
      <p>
        We are dedicated to delivering an unparalleled customer experience and
        are seeking a talented Digital Marketing Executive to join our dynamic
        team and enhance our online presence. The ideal candidate will have a
        passion for prestige cars, a strong background in digital marketing, and
        proficiency in photography and graphic design.
      </p>
      <p>
        As a Digital Marketing Executive, you will be responsible for developing
        and executing comprehensive digital marketing strategies that elevate
        our brand's visibility and drive engagement across various digital
        platforms.
      </p>
      <p>
        This is an exciting opportunity. If you are ready to take your career in
        digital marketing to new heights within a prestigious automotive brand
        that values innovation and excellence, we invite you to contact us
        today!
      </p>
      <h3>Sales Executives</h3>
      <p>
        Buying a car should be an enjoyable experience, especially when it's a
        quality vehicle such as the brands we represent.
      </p>
      <p>
        At Professional Cars Ltd, we have gone out of our way to create a relaxed
        and welcoming atmosphere. Most importantly, we make it our business to
        listen hard to the needs of our customers and respond with the solution
        that is right for them.
      </p>
      <p>
        It's a refreshing approach to automotive sales that's working. More and
        more motorists are visiting our dealerships and our sales keep growing
        year on year. This is why we need to recruit more people who epitomise
        our professional, empathetic approach and can build a rapport with our
        customers.
      </p>
      <p>
        Our Sales Executives plan their own daily selling activities and handle
        the whole sales process from identifying customer requirements through
        to completing the sale (including the agreement of part exchange
        prices).
      </p>
      <p>
        You will need to be of smart appearance, educated to a good level and
        possess drive, ambition, tenacity and a passion for learning. The ideal
        candidate will have car sales experience; however, training will be
        given to suitable candidates. If you believe you have the right
        attributes for a successful selling career, we want to hear from you.
      </p>
      <h3>What We're Looking For:</h3>
      <ul className="list-bullets">
        <li>
          The ability to work as part of a team to deliver excellent customer
          service
        </li>
        <li>
          A minimum of NVQ level 3 in Light Vehicle Maintenance and Repair
        </li>
        <li>Demonstrates an honest and diligent approach to work</li>
        <li>Has a flexible approach to time-keeping</li>
        <li>Systematic and organised; pays attention to the finer details</li>
        <li>
          Previous Vehicle Technician diagnostic experience would be an
          advantage and an understanding of automotive systems and
          functionalities
        </li>
        <li>Prestige vehicle experience would be an advantage</li>
        <li>A full and valid UK Driving Licence</li>
      </ul>
      <p>
        We offer a competitive basic salary and commission schemes that offer
        every incentive to excel. If you feel you are an overachiever and have
        the qualities we are looking for, we want to hear from you.
      </p>
      <p>
        Please send your CV to{" "}
        <a href="mailto:nat@professionalcars.co.uk">nat@professionalcars.co.uk</a>
      </p>
    </div>
  );

  return (
    <PageWithSidebarLayout
      pageClass="careers-pg"
      headerTitle="Careers"
      headerClass="page-hdr--careers"
      showSidebar={true}
    >
      {mainContent}
    </PageWithSidebarLayout>
  );
};

export default Careers;
