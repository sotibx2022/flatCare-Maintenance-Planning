import React from 'react';
import "../softwareFeatures/softwareFeatures.css";
const features = [
    {
        featureTitle: "Routine Maintenance",
        featureIcon: "🛠️"
    },
    {
        featureTitle: "Scheduled Maintenance",
        featureIcon: "📅"
    },
    {
        featureTitle: "Emergency Response",
        featureIcon: "🚒"
    },
    {
        featureTitle: "Cleaning and Hygiene",
        featureIcon: "🧹"
    },
    {
        featureTitle: "Facility Management",
        featureIcon: "🏢"
    },
    {
        featureTitle: "Material Planning",
        featureIcon: "📦"
    },
    {
        featureTitle: "Work Order Planning",
        featureIcon: "📝"
    },
    {
        featureTitle: "Category Management",
        featureIcon: "🏷️"
    }
];

const SoftwareFeatures = () => {
    return (
        <div className='container'>
            <h1 className='primary_heading'>Software Features</h1>
            <div className='features_wrapper'>
            {features.map((feature, index) => {
                return <div className='feature_box' key={index}>
                    <h1 className='secondary_heading'>{feature.featureTitle}</h1>
                    <span>{feature.featureIcon}</span>
                </div>
            })}
            </div>
        </div>
    )
}

export default SoftwareFeatures