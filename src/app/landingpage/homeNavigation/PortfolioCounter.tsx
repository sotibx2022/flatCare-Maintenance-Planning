"use client"
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { counter } from '@fortawesome/fontawesome-svg-core';
const PortfolioCounter = () => {
    const [counters, setCounters] = useState({
        projectsCompleted: 0,
        happyClients: 0,
        yearOfServices: 0,
        InternalSoftwares: 0
    })
    const [animationCompleted, setAnimationCompleted] = useState(false);
    useEffect(() => {
        const startTime = Date.now();
        const duration = 2000;
        const actualProjectsCompleted = 9;
        const actualhappyClients = 12;
        const actualyearOfServices = 2;
        const actualInternalServices = 18;
        const updateCounter = () => {
            const now = Date.now();
            const elapsedTime = now - startTime;
            const progress = Math.min(elapsedTime / duration, 1)
            setCounters({
                projectsCompleted: Math.floor(progress * actualProjectsCompleted),
                happyClients: Math.floor(progress * actualhappyClients),
                yearOfServices: Math.floor(progress * actualyearOfServices),
                InternalSoftwares: Math.floor(progress * actualInternalServices)
            })
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                setAnimationCompleted(true);
            }
        }
        updateCounter()
    }, [])
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
                        {counters.projectsCompleted}{animationCompleted && <FontAwesomeIcon icon={faArrowUp} className="arrow-icon" />}
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
                        {counters.happyClients}{animationCompleted && <FontAwesomeIcon icon={faArrowUp} className="arrow-icon" />}
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
                        {counters.yearOfServices}{animationCompleted && <FontAwesomeIcon icon={faArrowUp} className="arrow-icon" />}
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
                        {counters.InternalSoftwares}{animationCompleted && <FontAwesomeIcon icon={faArrowUp} className="arrow-icon" />}
                    </h2>
                    <p>Internal Softwares</p>
                </div>
            </div>
        </section>
    );
};
export default PortfolioCounter;
