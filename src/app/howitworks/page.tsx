import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faMapMarker, faArrowCircleUp } from '@fortawesome/free-solid-svg-icons';
import "../howitworks/howitworks.css";
interface ExperienceProps {
    number: string;
    title: string;
    company: string;
    location: string;
    type: string;
    responsibilities: string;
    startDate: string;
    endDate: string;
}
const ExperienceItem: React.FC<ExperienceProps> = ({
    number,
    title,
    company,
    location,
    type,
    responsibilities,
    startDate,
    endDate
}) => {
    const isLeft = parseInt(number) % 2 !== 0; // Determine left or right alignment based on the experience number
    return (
        <div className={`content-wrapper ${isLeft ? 'left-container' : 'right-container'}`}>
            <span>{number}</span>
            <div className={`experience-item ${isLeft ? 'left-content' : 'right-content'}`}>
                <h2>
                    <FontAwesomeIcon icon={faBriefcase} aria-hidden="true" />
                    {title}
                </h2>
                <h3>{company}</h3>
                <div className="employment-details">
                    <p>
                        <FontAwesomeIcon icon={faMapMarker} aria-hidden="true" />
                        {location}
                    </p>
                    <small>{type}</small>
                </div>
                <p>Responsibilities: <br />{responsibilities}</p>
                <div className="duration">
                    <p className="start-date">{startDate}</p>
                    <h6 className="duration">Duration: {new Date(endDate).getFullYear() - new Date(startDate).getFullYear()} year</h6>
                    <p className="end-date">{endDate}</p>
                </div>
            </div>
        </div>
    );
};
const ExperienceSection: React.FC = () => {
    const experiences = [
        {
            number: "I",
            title: "SEO & Online Advertising Officer",
            company: "Ved International Company",
            location: "Kathmandu, Nepal",
            type: "Homebased",
            responsibilities: "Online Micro Projects, Forum Posting, Blog Posting, Basic SEO, Content Writing, Website Promotion, Social Media Advertising",
            startDate: "2010-01-01",
            endDate: "2011-01-01"
        },
        {
            number: "II",
            title: "Data Entry Officer",
            company: "Nepal Art & Ocean Training Institute",
            location: "Kathmandu, Nepal",
            type: "Homebased",
            responsibilities: "Data Entry, Ad-Posting, Excel Entry, Online Advertising, Content Creation, Report Processing",
            startDate: "2011-01-01",
            endDate: "2012-01-01"
        },
        {
            number: "III",
            title: "Data Entry Trainer",
            company: "Bridge Tech Pvt. Ltd.",
            location: "Kathmandu, Nepal",
            type: "Homebased",
            responsibilities: "Training, Counseling, Data Entry, Ad-Posting, Excel Entry, Online Advertising, Content Creation, Report Processing",
            startDate: "2010-01-01",
            endDate: "2011-01-01"
        },
        {
            number: "IV",
            title: "Online Job Trainer",
            company: "Nexon Education Consultancy",
            location: "Kathmandu, Nepal",
            type: "Homebased",
            responsibilities: "Training, Counseling, Data Entry, Ad-Posting, Excel Entry, Online Advertising, Content Creation, Report Processing",
            startDate: "2010-01-01",
            endDate: "2011-01-01"
        },
        {
            number: "V",
            title: "Junior Graphics Designer",
            company: "Bholenath Printing Press",
            location: "Kathmandu, Nepal",
            type: "Full Time",
            responsibilities: "Designing, Printing, Office Assistance, Record Keeping, Customer Dealing, Product Delivery",
            startDate: "2010-01-01",
            endDate: "2011-01-01"
        },
        {
            number: "VI",
            title: "Web Project Manager",
            company: "Frntech Pvt. Ltd.",
            location: "Kathmandu, Nepal",
            type: "Full Time",
            responsibilities: "Designing, Development, Web Customization, Team Handling, Client Relations, Consulting, CMS Training, Client Visiting, Reporting",
            startDate: "2010-01-01",
            endDate: "2011-01-01"
        },
        {
            number: "VII",
            title: "SAP Maintenance Planner",
            company: "Saudi Aramco Oil Company",
            location: "Saudi Arabia",
            type: "Full Time",
            responsibilities: "Work Orders, Materials, Schedule, Planning, Tracking, SAP System, Heavy Equipment, Reporting, Presentation",
            startDate: "2010-01-01",
            endDate: "2011-01-01"
        },
        {
            number: "VIII",
            title: "Web Developer",
            company: "Upwork Freelancing",
            location: "Chitwan, Nepal",
            type: "Homebased",
            responsibilities: "Designing, Development, HTML, CSS, JavaScript, Bootstrap, WordPress, Content Writing",
            startDate: "2010-01-01",
            endDate: "2011-01-01"
        }
    ];
    return (
        <section id="experience">
            <section className="experience-area container">
                <div className="experience-items timeline">
                    {experiences.map((exp) => (
                        <ExperienceItem
                            key={exp.number}
                            number={exp.number}
                            title={exp.title}
                            company={exp.company}
                            location={exp.location}
                            type={exp.type}
                            responsibilities={exp.responsibilities}
                            startDate={exp.startDate}
                            endDate={exp.endDate}
                        />
                    ))}
                    <a href='/experience'>
                        <FontAwesomeIcon icon={faArrowCircleUp} aria-hidden="true" />
                    </a>
                </div>
            </section>
        </section>
    );
};
export default ExperienceSection;
