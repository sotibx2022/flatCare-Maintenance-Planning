import React from 'react';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type SubmitSuccessProps = {
    message: string;
};

const SubmitSuccess: React.FC<SubmitSuccessProps> = ({ message }) => {
    return (
        <div>
            <FontAwesomeIcon icon={faCheckCircle} style={{ color: '#28a745', marginTop: '10px' }} />
            <small style={{ color: '#28a745', fontSize: '14px', marginLeft: '5px' }}>{message}</small>
        </div>
    );
};

export default SubmitSuccess;
