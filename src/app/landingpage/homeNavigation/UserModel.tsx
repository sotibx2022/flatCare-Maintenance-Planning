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
  keyword?: boolean,
}
const userModes: UserMode[] = [
  {
    userModelTitle: 'Customer Mode',
    userModelDescription:
      'Access customer-related features and manage service requests seamlessly.',
    icon: faUser,
    keyword: true,
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
      <h1 className="subHeading">
        Modes
      </h1>
      <div className="models_area">
        {userModes.map((model, index) => {
          return (
            <SingleUserModel
              userModelTitle={model.userModelTitle}
              userModelDescription={model.userModelDescription}
              icon={model.icon}
              key={index}
              keyword={model.keyword}
            />
          );
        })}
      </div>
    </div>
  );
};
export default UserModel;
