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
            <div className="section-heading">
                <ul className="bouncing-ball">
                    <li>F</li>
                    <li>E</li>
                    <li>A</li>
                    <li>T</li>
                    <li>U</li>
                    <li>R</li>
                    <li>E</li>
                    <li>S</li>
                </ul>
            </div>
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