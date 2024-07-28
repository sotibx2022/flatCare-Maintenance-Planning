import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
const PortfolioCounter = () => {
    return (
        <section className="portfolio-counter section">
            <div className="container grid grid-col-4">
                <div className="counter-item projects-completed">
                    <img
                        src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-completed-customer-feedback-flaticons-lineal-color-flat-icons.png"
                        className="counter-icon"
                        alt="Projects Completed"
                    />
                    <h2 className="counter-numbers" data-number="20">
                        12<FontAwesomeIcon icon={faArrowUp} className="arrow-icon" />
                    </h2>
                    <p>Projects Installed</p>
                </div>
                <div className="counter-item happy-clients">
                    <img
                        src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-clients-productivity-flaticons-lineal-color-flat-icons-2.png"
                        className="counter-icon"
                        alt="Happy Clients"
                    />
                    <h2 className="counter-numbers" data-number="10">
                        10<FontAwesomeIcon icon={faArrowUp} className="arrow-icon" />
                    </h2>
                    <p>Happy Clients</p>
                </div>
                <div className="counter-item years">
                    <img
                        src="https://img.icons8.com/color/64/000000/new-year-calendar-.png"
                        className="counter-icon"
                        alt="Years of Service"
                    />
                    <h2 className="counter-numbers" data-number="12">
                        2<FontAwesomeIcon icon={faArrowUp} className="arrow-icon" />
                    </h2>
                    <p>Years of Service</p>
                </div>
                <div className="counter-item skills">
                    <img
                        src="https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/64/000000/external-skills-business-and-management-kiranshastry-lineal-color-kiranshastry.png"
                        className="counter-icon"
                        alt="Internal Features"
                    />
                    <h2 className="counter-numbers" data-number="10">
                        18<FontAwesomeIcon icon={faArrowUp} className="arrow-icon" />
                    </h2>
                    <p>Internal Features</p>
                </div>
            </div>
        </section>
    );
};
export default PortfolioCounter;
