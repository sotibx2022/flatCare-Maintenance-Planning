import "../landingpage/homeNavigation/landingPage.css";
import RequestDemo from "./homeNavigation/RequestDemo";
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
        <>
            <h1 className="subHeading">
                FEATURES
            </h1>
            <div className="featureItems">
                {features.map((feature, index) => (
                    <div className="featureItem" key={index}>
                        <h1 className="primary_heading">{feature}</h1>
                    </div>
                ))}
            </div>
            <RequestDemo />
        </>
    );
};
export default Features;