import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faPhone, faMapMarker } from '@fortawesome/free-solid-svg-icons';
import "../technician/technician.css";
import "../../app/landingpage/homeNavigation/landingPage.css";
import Rating from '../landingpage/homeNavigation/Rating';
import Call2Action from '../landingpage/homeNavigation/Call2Action';
import CommonHeader from '../ui/header/commonHeader/CommonHeader';
import CommonFooter from '../ui/footer/commonFooter/CommonFooter';
const technicians = [
    {
        title: "Senior Electrician",
        name: "Rajit Pathak",
        EmployeeId: "9864823",
        status: "Certified",
        Contact: "9864893602",
        photo: "/assets/images/rajitpathak.jpg",
        address: "123 Main St, Kathmandu, Nepal"
    },
    {
        title: "HVAC Technician",
        name: "Anita Sharma",
        EmployeeId: "9864824",
        status: "Certified",
        Contact: "9864893603",
        photo: "/assets/images/anitasharma.jpg",
        address: "456 Elm St, Pokhara, Nepal"
    },
    {
        title: "Plumbing Specialist",
        name: "Sanjay Kumar",
        EmployeeId: "9864825",
        status: "In-Training",
        Contact: "9864893604",
        photo: "/assets/images/sanjayakumar.jpg",
        address: "789 Pine St, Lalitpur, Nepal"
    },
    {
        title: "Carpenter",
        name: "Maya Singh",
        EmployeeId: "9864826",
        status: "Certified",
        Contact: "9864893605",
        photo: "/assets/images/mayasingh.jpg",
        address: "101 Maple St, Biratnagar, Nepal"
    },
    {
        title: "General Maintenance Technician",
        name: "Ravi Joshi",
        EmployeeId: "9864827",
        status: "Certified",
        Contact: "9864893606",
        photo: "/assets/images/ravijosi.jpg",
        address: "202 Oak St, Janakpur, Nepal"
    }
];
const TechnicianList = () => {
    return (
        <>
            <CommonHeader />
            <h1 className='subHeading'>Technicians Area</h1>
            <div className="technician-data container">
                <p className="primary_heading">Check Our Highly Rated Technicians</p>
                <Call2Action type="Start Now" link="/technician/login" />
                <div className="singleTechnician">
                    {technicians.map((tech, index) => (
                        <div className="technicianDetails" key={tech.EmployeeId}>
                            <div className="technicianDetailsLeft">
                                <div className="technicianProfile">
                                    <img src={tech.photo} alt={tech.name} className="technician_profile" />
                                    <p>{tech.name}</p>
                                </div>
                                <div className="designation">
                                    <FontAwesomeIcon icon={faBriefcase} aria-hidden="true" />
                                    <h3>{tech.title}</h3>
                                </div>
                                <div className="technicianContact">
                                    <p>
                                        <FontAwesomeIcon icon={faPhone} aria-hidden="true" className='addressIcon' />
                                        {tech.Contact}
                                    </p>
                                    <p>
                                        <FontAwesomeIcon icon={faMapMarker} aria-hidden="true" className='addressIcon' />
                                        {tech.address}
                                    </p>
                                </div>
                            </div>
                            <div className="technicianStatus">
                                <p className="statusButton">{tech.status}</p>
                                <p>
                                    Employee ID: {tech.EmployeeId}
                                </p>
                                <Rating />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <CommonFooter />
        </>
    );
};
export default TechnicianList;
