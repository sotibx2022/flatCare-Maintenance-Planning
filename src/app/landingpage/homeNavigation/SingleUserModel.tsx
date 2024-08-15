import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
interface SingleUserModelProps {
  userModelTitle: string;
  userModelDescription: string;
  icon: any;
  keyword?: boolean,
}
const SingleUserModel: React.FC<SingleUserModelProps> = ({
  userModelTitle,
  userModelDescription,
  icon,
  keyword,
}) => {
  return (
    <div className="model-item" style={{ position: keyword ? 'relative' : 'static' }}>
      <FontAwesomeIcon icon={icon} className="userModelIcon" />
      <h2 className="model_title">{userModelTitle}</h2>
      <p>{userModelDescription}</p>
      {keyword && <span className='bg-helper text-white w-[4rem] py-1  rounded-md absolute -top-4 -right-[2rem] text-center'>Free</span>}
    </div>
  );
};
export default SingleUserModel;
