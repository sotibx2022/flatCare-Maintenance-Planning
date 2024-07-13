import React from 'react';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type SubmitErrorProps = {
    message: string;
};

const SubmitError: React.FC<SubmitErrorProps> = ({ message }) => {
    return (
        <div>
            <FontAwesomeIcon icon={faExclamationCircle} style={{ color: '#FF6347', marginTop: '10px' }} />
            <small style={{ color: '#FF6347', fontSize: '14px', marginLeft: "5px" }}>{message}</small>
        </div>
    );
};

export default SubmitError;
