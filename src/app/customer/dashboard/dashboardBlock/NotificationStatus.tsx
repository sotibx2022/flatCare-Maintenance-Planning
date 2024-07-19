"use client"
import React from 'react'
import useAllNotifications from '../../../hooks/useAllNotifications'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faCircleDown, faCircleUp } from '@fortawesome/free-solid-svg-icons';
import "../dashboardBlock/dashboardBlock.css";
const NotificationStatus = () => {
    const [allNotifications] = useAllNotifications();
    return (
        <div className='statusBlocks'>
            <div className='block totalBlock'>
                <div className='blockHeading'>
                    <h1 className='secondary_heading'> Active </h1>
                </div>
                <div className='blockData'>
                    <FontAwesomeIcon icon={faCircleUp} />
                    <span>{allNotifications.length}</span>
                </div>
            </div>
            <div className='block activeBlock'>
                <div className='blockHeading'>
                    <h1 className='secondary_heading'> Competed </h1>
                </div>
                <div className='blockData'>
                    <FontAwesomeIcon icon={faCircleDown} />
                    <span>0</span>
                </div>
            </div>
        </div>
    )
}
export default NotificationStatus
