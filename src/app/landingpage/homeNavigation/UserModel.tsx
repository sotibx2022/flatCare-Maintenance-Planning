import React from 'react';
import { User, Wrench, Calendar } from 'lucide-react';
interface UserMode {
  userModelTitle: string;
  userModelDescription: string;
  icon: any;
}
const userModes: UserMode[] = [
  {
    userModelTitle: 'Customer Mode',
    userModelDescription:
      'Access customer-related features and manage service requests seamlessly.',
    icon: User,
  },
  {
    userModelTitle: 'Technician Mode',
    userModelDescription:
      'Handle technical tasks, inspections, and equipment maintenance efficiently.',
    icon: Wrench,
  },
  {
    userModelTitle: 'Planner Mode',
    userModelDescription:
      'Plan schedules, manage resources, and optimize maintenance activities.',
    icon: Calendar,
  },
];
const UserModel = () => {
  return (
    <div className="container">
      <h1 className="subHeading">
        Modes
      </h1>
      <div className="models_area grid grid-cols-1 md:grid-cols-3 gap-6">
        {userModes.map((model, index) => {
          const IconComponent = model.icon;
          return (
            <div
              key={index}
              className="model-item bg-[var(--primaryDark)] border border-[var(--primaryLight)] rounded-xl p-6 shadow-[var(--primaryLightBoxShadow)] hover:shadow-[var(--primaryDarkBoxShadow)] transition-all duration-300 hover:-translate-y-1 text-center"
            >
              <div className="userModelIcon flex justify-center mb-4">
                <IconComponent
                  size={40}
                  style={{ color: "var(--primaryLight)" }}
                />
              </div>
              <h2 className="model_title text-lg font-semibold text-[var(--primaryLight)] mb-3">
                {model.userModelTitle}
              </h2>
              <p className="text-[var(--primaryLight)]">
                {model.userModelDescription}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default UserModel;