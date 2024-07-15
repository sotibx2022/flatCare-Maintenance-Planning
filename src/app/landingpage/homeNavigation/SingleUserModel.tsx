import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface SingleUserModelProps {

    userModelTitle: string;
    userModelDescription: string;
    icon: any;

}

const SingleUserModel: React.FC<SingleUserModelProps> = ({

    userModelTitle,
    userModelDescription,
    icon,

}) => {
    return (
        <div className="model-item">
            <FontAwesomeIcon icon={icon} className='userModelIcon' />
            <h2>{userModelTitle}</h2>
            <p>{userModelDescription}</p>

        </div>
    );
}

export default SingleUserModel;
