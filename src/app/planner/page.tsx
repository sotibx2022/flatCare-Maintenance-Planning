import React from 'react';
import "../planner/planner.css";
import Call2Action from '../landingpage/homeNavigation/Call2Action';
import "../../app/landingpage/homeNavigation/landingPage.css";
import CommonHeader from '../ui/header/commonHeader/CommonHeader';
import CommonFooter from '../ui/footer/commonFooter/CommonFooter';
const cardData = [
  {
    title: "Work Order Planning",
    desc: "Review Notification, Collect Requirements, Create Order, Request Materials, Track Materials, Mobilize Manpower, Execute Job, Close Order, and Others"
  },
  {
    title: "Material Planning",
    desc: "Find Catalogued, Request Quotation, Place Order, Check Purchase, Purchase Order, Follow-up, Track Delivery, Request Shipment, Receive Material, Keep Inventory, and Others"
  },
  {
    title: "Scheduling",
    desc: "Review Orders, Update Orders, Check Priority, Calculate Backlog, Prepare Work Schedule, Weekly Schedule, Monthly Schedule, Quarterly Schedule, Annual Schedule , and Others"
  },
  {
    title: "Project Management",
    desc: "Start Date, End Date, Project Cost, Required Materials, Available Manpower, Team Leadership, Project Effectiveness, Reporting Standards, Presentation Quality, Follow-up Actions, and Others"
  },
  {
    title: "Data Analysis",
    desc: "Analyze Work Orders, Track Notifications, Order Types, Wrong Orders, Backlog Management, Planning Effectiveness, Turnaround Time, Material Usage, Excessive Materials, Cost Analysis, and Others"
  },
  {
    title: "Leadership",
    desc: "Mobilize Team, Implement Projects, Provide Motivation, Effective Communication, Offer Guidance , and Others"
  }
];
const Page = () => {
  return (
    <>
      <CommonHeader />
      <main className='container'>
        <div className='sectionHeading'>
          <h1 className='primary_heading'>A goal without a plan is just a wish</h1>
          <p>Effective planning turns goals into reality. A clear plan provides direction, outlines steps, and anticipates challenges, transforming ambitions into achievable milestones.</p>
          <Call2Action type="Register Now" link="/planner/login" />
        </div>
        <div className="technicianFeatures ">
          {cardData.map((card, index) => (
            <div className="card" key={index}>
              <p className="title">{card.title}</p>
              <p className="desc">
                {card.desc.split(',').map((item, i) => (
                  <span key={i} className="desc-item">
                    {item.trim()}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
      </main>
      <CommonFooter />
    </>
  );
}
export default Page;
