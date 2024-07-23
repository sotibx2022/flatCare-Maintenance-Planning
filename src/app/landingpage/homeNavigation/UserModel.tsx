import {
  faCalendar,
  faUser,
  faWrench,
} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import SingleUserModel from './SingleUserModel';
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
    icon: faUser,
  },
  {
    userModelTitle: 'Technician Mode',
    userModelDescription:
      'Handle technical tasks, inspections, and equipment maintenance efficiently.',
    icon: faWrench,
  },
  {
    userModelTitle: 'Planner Mode',
    userModelDescription:
      'Plan schedules, manage resources, and optimize maintenance activities.',
    icon: faCalendar,
  },
];
const UserModel = () => {
  return (
    <div className="userModelWrapper">
      <div className="section-heading">
        <ul className="bouncing-ball">
          <li>M</li>
          <li>0</li>
          <li>D</li>
          <li>E</li>
          <li>S</li>
        </ul>
      </div>
      <div className="models_area">
        {userModes.map((model, index) => {
          return (
            <SingleUserModel
              userModelTitle={model.userModelTitle}
              userModelDescription={model.userModelDescription}
              icon={model.icon}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default UserModel;
