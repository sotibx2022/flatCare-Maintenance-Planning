import React from 'react';
import "../softwareFeatures/softwareFeatures.css";
import "../../landingpage/homeNavigation/landingPage.css";
const features = [
    {
        featureTitle: "Defect Maintenance",
        featureIcon: "🛠️"
    },
    {
        featureTitle: "Emergency Response",
        featureIcon: "🚒"
    },
    {
        featureTitle: "Material Planning",
        featureIcon: "📦"
    },
    {
        featureTitle: "Work Order Planning",
        featureIcon: "📝"
    },
];

const SoftwareFeatures = () => {
    return (

        <div className='features_wrapper'>
            {features.map((feature, index) => {
                return <div className='feature_box' key={index}>
                    <h1 className='secondary_heading'>{feature.featureTitle}</h1>
                    <span className='featureIcon'>{feature.featureIcon}</span>
                </div>
            })}
        </div>

    )
}

export default SoftwareFeatures