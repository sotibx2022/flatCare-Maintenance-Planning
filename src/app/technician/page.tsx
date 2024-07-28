import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faBuilding, faMapMarker, faCalendar, faUser } from '@fortawesome/free-solid-svg-icons';
import "./../technician/technician.css";
interface JobExperience {
    title: string;
    company: string;
    location: string;
    roleType: string;
    dateRange: string;
}
interface Certification {
    title: string;
    institution: string;
    location: string;
    status: string;
    professional: string;
}
const jobExperiences: JobExperience[] = [
    {
        title: "Web Developer",
        company: "Freelancing",
        location: "Chitwan, Nepal",
        roleType: "Full Time",
        dateRange: "Dec. 2021 - Present"
    },
    {
        title: "SAP Maintenance Planner",
        company: "Saudi Aramco Oil Company",
        location: "Shaybah, Saudi Arabia",
        roleType: "Fulltime",
        dateRange: "July 2015 - Dec. 2021"
    },
    {
        title: "Project Manager for Web Development",
        company: "Frntech Pvt. Ltd.",
        location: "Kathmandu, Nepal",
        roleType: "Fulltime",
        dateRange: "Nov. 2013 - May 2015"
    }
];
const certifications: Certification[] = [
    {
        title: "SAP Maintenance Planner",
        institution: "SAP System",
        location: "Saudi Arabia",
        status: "Certified",
        professional: "SAP professional"
    },
    {
        title: "Project Management",
        institution: "Harvard (eLearning)",
        location: "Boston, USA",
        status: "Certified",
        professional: "Project Mgmt."
    }
];
const Technician: React.FC = () => {
    return (
        <section className="resume-data">
            <p className="resume-para">Experiences</p>
            {jobExperiences.map((job, index) => (
                <div className="resume-data-subsection" key={index}>
                    <div className="resume-data-left">
                        <div className="designation">
                            <FontAwesomeIcon icon={faBriefcase} aria-hidden="true" />
                            <h3>{job.title}</h3>
                        </div>
                        <div className="grid grid-two-col">
                            <p>
                                <FontAwesomeIcon icon={faBuilding} aria-hidden="true" />
                                {job.company}
                            </p>
                            <p>
                                <FontAwesomeIcon icon={faMapMarker} aria-hidden="true" />
                                {job.location}
                            </p>
                        </div>
                    </div>
                    <div className="resume-data-right">
                        <p className="resume-data-button">{job.roleType}</p>
                        <p>
                            <FontAwesomeIcon icon={faCalendar} aria-hidden="true" />
                            {job.dateRange}
                        </p>
                    </div>
                </div>
            ))}
            <div className="resume-data-bottom-subsection">
                <p className="resume-para">Certifications</p>
                {certifications.map((cert, index) => (
                    <div className={`resume-data-subsection ${index > 0 ? 'margin-small' : ''}`} key={index}>
                        <div className="resume-data-left">
                            <div className="designation">
                                <FontAwesomeIcon icon={faBriefcase} aria-hidden="true" />
                                <h3>{cert.title}</h3>
                            </div>
                            <div className="grid grid-two-col">
                                <p>
                                    <FontAwesomeIcon icon={faBuilding} aria-hidden="true" />
                                    {cert.institution}
                                </p>
                                <p>
                                    <FontAwesomeIcon icon={faMapMarker} aria-hidden="true" />
                                    {cert.location}
                                </p>
                            </div>
                        </div>
                        <div className="resume-data-right">
                            <p className="resume-data-button">{cert.status}</p>
                            <p>
                                <span>
                                    <FontAwesomeIcon icon={faUser} aria-hidden="true" />
                                    {cert.professional}
                                </span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
export default Technician;
