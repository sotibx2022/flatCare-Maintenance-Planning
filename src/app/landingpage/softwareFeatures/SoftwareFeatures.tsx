import { Wrench, AlertTriangle, Package, Clipboard } from "lucide-react";
const features = [
  {
    title: "Defect Maintenance",
    icon: Wrench,
    description: "Quick and efficient defect resolution for all building systems"
  },
  {
    title: "Emergency Response",
    icon: AlertTriangle,
    description: "24/7 emergency maintenance support when you need it most"
  },
  {
    title: "Material Order Planning",
    icon: Package,
    description: "Strategic material management and procurement planning"
  },
  {
    title: "Work Order Planning",
    icon: Clipboard,
    description: "Streamlined work order creation and scheduling system"
  }
];
export const SoftwareFeatures = () => {
  return (
    <section className="py-10 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="text-center flex justify-center align-center sm:flex-col p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="w-16 h-16 bg-[var(--primaryDark)] rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-8 h-8 text-[var(--primaryLight)]" />
              </div>
              <h3 className="text-xl font-semibold text-primaryDark mb-3">
                {feature.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
