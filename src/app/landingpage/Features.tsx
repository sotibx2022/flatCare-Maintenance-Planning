import "../landingpage/homeNavigation/landingPage.css";
const features = [
    "24/7 Support",
    "Industry Expertise",
    "Custom Solutions",
    "Fast Turnaround",
    "Detailed Reporting",
    "Automated Scheduling",
    "Real-Time Updates",
    "Cost Efficiency",
    "Compliance Assurance"
];
const Features = () => {
    return (
        <div className="featureItems">
            {features.map((feature, index) => (
                <div className="featureItem" key={index}>
                    <h1 className="primary_heading">{feature}</h1>
                </div>
            ))}
        </div>
    );
};
export default Features;