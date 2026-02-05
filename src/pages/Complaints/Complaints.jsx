import PageWithSidebarLayout from '../../layouts/PageWithSidebarLayout';
import './Complaints.css';

const Complaints = () => {
  return (
    <PageWithSidebarLayout
      pageClass="complaints-pg"
      headerTitle="Complaints"
      headerClass="page-hdr--complaints lazy-background visible"
      showSidebar={true}
    >
      <div className="sm:px-unset px-[5px]">
        <p>Dear Customer,</p>
        <p>
          Our aim is always to provide an exceptionally high level of service to all of our
          customers. Where customers feel they have cause to raise a complaint it is important to us
          that these are dealt with objectively, fairly and within an acceptable time frame.
        </p>
        <p>
          The following procedure explains how we deal with complaints, our commitments to you and
          what redress you have if you think your complaint has not been resolved to your
          satisfaction.
        </p>
        <p>
          If you have a complaint about any aspect of our service then we would like to hear from
          you.
        </p>
        <h3>How to tell us if you have a complaint</h3>
        <p>
          To help us investigate and resolve your issue as quickly as possible, you can contact us
          by email, by telephone or in writing. The most appropriate person will handle your complaint in the
          quickest possible time.
        </p>
        <p>Our complaints contact details are:</p>
        <p>
          By email{' '}
          <a className="hover:underline hover:to-blue-400" href="mailto:professionalcarsltd@gmail.com">
            professionalcarsltd@gmail.com
          </a>
          <br />
          By telephone on 07788929755
        </p>
        <p>By letter to</p>
        <p>
          Professional Cars
          <br />
          Rear Yard 2
          <br />
          College Road North Business Park
          <br />
          Aston Clinton, Aylesbury
          <br />
          HP22 5EZ
        </p>
        <h3>What information do we need to address your complaint?</h3>
        <p>
          To assist us in resolving your complaint efficiently it would be helpful if you could
          provide the following information:
        </p>
        <ul className="list-ticks">
          <li>Your full name and preferred contact details</li>
          <li>Your order or vehicle registration number</li>
          <li>Full details of your complaint</li>
          <li>Copies of relevant paperwork</li>
          <li>
            Photographic evidence of any complaint relating to vehicle damage/defects where
            applicable
          </li>
          <li>What you expect us to do to put things right</li>
          <li>Any other information that you think may be relevant</li>
        </ul>
        <h3>What we do if we receive a complaint from you</h3>
        <p>
          Any complaint, verbal or written, will be allocated it to the most appropriate Complaints
          Handler.
        </p>
        <p>
          We will always try to resolve your complaint immediately. However, sometimes this may not
          be possible. In all cases we will implement the following process:
        </p>
        <h3>Complaint Process</h3>
        <ul className="list-ticks">
          <li>Your case reference will be your order/contract number</li>
          <li>We will give you the name and title of the person handling your complaint</li>
          <li>
            We will send you written acknowledgement within 3 working days of receiving your
            complaint
          </li>
          <li>Make contact to seek clarification on any points where necessary</li>
          <li>Fully investigate your complaint internally and third parties where relevant</li>
          <li>Keep you informed and fully updated regarding any progress</li>
          <li>Discuss with you our findings and our proposed response</li>
          <li>
            Our aim will be to send you our final written response within ten working days but no
            later than eight weeks as required by the Financial Conduct Authority
          </li>
        </ul>
        <h3>Investigation</h3>
        <p>
          The Customer Resolutions Department will work with the relevant department managers to
          establish the nature and scope of your complaint having due regards to the Financial
          Conduct Authority's direction:
        </p>
        <ul className="list-ticks">
          <li>Deal with complaints promptly and fairly</li>
          <li>Give complainants clear replies and, where appropriate, fair redress</li>
        </ul>
        <p>Eligibility</p>
        <p>
          It is Professional Cars Ltd policy to treat all complainants the same, however, certain
          types of complaints fall within the scope of FCA rules and consequently within the
          jurisdiction of the Financial Ombudsman Service.
        </p>
        <h3>FCA Complaints Rules</h3>
        <ul className="list-ticks">
          <li>
            Complaints made by, or on behalf of an eligible complainant; Eligible Complainants are
            essentially individuals and certain small businesses
          </li>
          <li>
            The Complainant must relate to the provision of or failure to provide a financial
            service or a redress determination and;
          </li>
          <li>
            The Cinokaubabt must allege that they have suffered, or may suffer, financial loss,
            material distress or material inconvenience
          </li>
        </ul>
        <h3>Final Response</h3>
        <p>
          This will set out clearly the final decision and the reasons for it. If any compensation
          is offered a clear method of calculation will be shown.
        </p>
        <p>
          Where appropriate we are required to include details of the Financial Ombudsman Service in
          the final response. If dealing with an eligible complainant and a regulated activity, we
          will:
        </p>
        <ul className="list-ticks">
          <li>
            Explain that the complainant must refer the matter to the Ombudsman within six months of
            the date of this letter or the right to use this service is lost
          </li>
          <li>Indicate whether we consent to waive the relevant time limits.</li>
        </ul>
        <h3>Complaints settled within 3 business days</h3>
        <p>
          Complaints that can be settled to your satisfaction within 3 business days can be recorded
          and communicated differently. Where we consider a complaint to be resolved to your
          satisfaction under this section, we will promptly send you a Summary Resolution
          Communication, being a written communication from us which:
        </p>
        <ul className="list-ticks">
          <li>
            Refers to the fact that you have made a complaint and informs you that we now consider
            the complaint to have been resolved to your satisfaction;
          </li>
          <li>
            We will tell you that if you subsequently decide that you are dissatisfied with the
            resolution of the complaint you may be able to refer the complaint back to us for
            further consideration or alternatively refer the complaint to the Financial Ombudsman
            Service.
          </li>
          <li>
            Indicates if we consent to waive the relevant time limits, (where we have discretion in
            such matters)
          </li>
          <li>Provide the relevant addresses of the Financial Ombudsman Service.</li>
          <li>
            Refer to the availability of further information on the website of the Financial
            Ombudsman Service.
          </li>
        </ul>
        <h3>Closing a complaint</h3>
        <p>
          We will consider a complaint closed when we have made our final response to you. This does
          not prevent you from exercising any rights you may have to refer the matter to the
          Financial Ombudsman Service.
        </p>
        <h3>What to do if you are not happy with our decision</h3>
        <p>
          If you have a regulated consumer credit contract arranged by us and are not satisfied with
          our Final Response, you may be eligible to refer the matter to the Financial Ombudsman
        </p>
        <h3>Financial Ombudsman Service</h3>
        <p>
          If relevant then you can refer your complaint to the Financial Ombudsman Service - you
          must do this within six months of our final response. When we send you a final response,
          we will also provide you with a copy of the Financial Ombudsman Service's explanatory
          leaflet.
        </p>
        <p>
          We will co-operate fully with the Ombudsman in resolving any complaints made against us
          and agree to be bound by any awards made by them.
        </p>
        <p>You can contact the financial Ombudsman at the following address:</p>
        <p>
          The Financial Ombudsman Service
          <br />
          Exchange Tower
          <br />
          London
          <br />
          E14 9SR
        </p>
        <p>
          Tel: 0800 023 4567 (free for most people from a fixed line) or 0300 123 9123 (cheaper for
          those calling using a mobile) or 020 7964 0500 (if calling from abroad)
        </p>
        <p>Email: complaint.info@financial-ombudsman.org.uk</p>
        <p>Website: www.financial-ombudsman.org.uk</p>
      </div>
    </PageWithSidebarLayout>
  );
};

export default Complaints;
