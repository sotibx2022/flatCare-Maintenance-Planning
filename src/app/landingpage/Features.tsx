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
        <div className="container">
            <h1 className="subHeading">
                Features
            </h1>
            <div className="featureItems grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {features.map((feature, index) => (
                    <div className="featureItem bg-helper p-4 rounded-lg shadow-[var(--primaryLightBoxShadow)] hover:shadow-[var(--primaryDarkBoxShadow)] transition-shadow duration-300" key={index}>
                        <h1 className="primary_heading text-lg font-semibold text-[var(--primaryDark)]">
                            {feature}
                        </h1>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default Features;