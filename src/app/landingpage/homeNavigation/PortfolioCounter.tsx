"use client"
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { counter } from '@fortawesome/fontawesome-svg-core';
import gsap from 'gsap';
const PortfolioCounter = () => {
    const [counters, setCounters] = useState({
        projectsCompleted: 0,
        happyClients: 0,
        yearOfServices: 0,
        InternalSoftwares: 0
    })
    const [animationCompleted, setAnimationCompleted] = useState(false);
    useEffect(() => {
        gsap.to(".counter-item", {
            y: 0,
            stagger: 0.2,
            duration: 1,
            opacity: 1,
            ease: "power1.out",
            onComplete: () => {
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
            }
        })
    }, [])
    return (
        <section className="portfolio-counter section">
            <div className="container grid grid-col-4">
                <div className="counter-item projects-completed">
                    <h2 className="counter-numbers" data-number="20">
                        {counters.projectsCompleted}{animationCompleted}
                    </h2>
                    <p>Projects Installed</p>
                </div>
                <div className="counter-item happy-clients">
                    <h2 className="counter-numbers" data-number="10">
                        {counters.happyClients}{animationCompleted}
                    </h2>
                    <p>Happy Clients</p>
                </div>
                <div className="counter-item years">
                    <h2 className="counter-numbers" data-number="12">
                        {counters.yearOfServices}{animationCompleted}
                    </h2>
                    <p>Years of Service</p>
                </div>
                <div className="counter-item skills">
                    <h2 className="counter-numbers" data-number="10">
                        {counters.InternalSoftwares}{animationCompleted}
                    </h2>
                    <p>Internal Softwares</p>
                </div>
            </div>
        </section >
    );
};
export default PortfolioCounter;
