import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
const pricingData = [
    {
        title: "Free Plan",
        price: 0,
        description: "Our Free Plan offers basic features to get you started with Flatcare Maintenance Planning. Ideal for individual users who want to explore the platform.",
        features: [
            "Basic Work Order Management",
            "View Material Requests",
            "Track Limited Work Orders",
            "Basic Reporting Tools",
            "Limited User Access"
        ]
    },
    {
        title: "Premium Plan",
        price: 99,
        description: "The Premium Plan provides comprehensive access to all features, including advanced management tools for customers, technicians, planners, and admins.",
        features: [
            "Advanced Work Order Management",
            "Full Material Management",
            "Track and Manage All Work Orders",
            "Detailed Reporting and Analytics",
            "Customizable User Roles",
            "Priority Support",
            "Integration with Third-Party Tools"
        ]
    }
];
const Pricing = () => {
    return (
        <section id="pricing-section">
            <div className="section-heading">
                <ul className="bouncing-ball">
                    {['P', 'R', 'I', 'C', 'I', 'N', 'G'].map((letter, index) => (
                        <li key={index}>{letter}</li>
                    ))}
                </ul>
            </div>
            <div className="pricing-area">
                {pricingData.map((item, index) => (
                    <div className="pricing-item" key={index}>
                        <h2 className="primary_heading">{item.title}</h2>
                        <span><sup className='dollor'>$</sup>{item.price}</span>
                        <div className="pricing-details">
                            <p className="section-paragraph">{item.description}</p>
                            <ul>
                                {item.features.map((feature, i) => (
                                    <li key={i}>
                                        <FontAwesomeIcon icon={faCheck} /> {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
export default Pricing;
