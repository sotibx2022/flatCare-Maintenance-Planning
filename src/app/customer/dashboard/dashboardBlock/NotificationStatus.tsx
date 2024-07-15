"use client"
import React from 'react'
import useAllNotifications from '../../../hooks/useAllNotifications'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faCircleDown, faCircleUp } from '@fortawesome/free-solid-svg-icons';
import "../dashboardBlock/dashboardBlock.css";
const NotificationStatus = () => {
    const [allNotifications] = useAllNotifications();
    return (
        <div>
            <div className='block totalBlock'>
                <div className='blockHeading'>
                    <h1 className='secondary_heading'> Active Notifications</h1>
                    <FontAwesomeIcon icon={faCircleUp} />
                </div>
                <span>{allNotifications.length}</span>
            </div>
            <div className='block activeBlock'>
                <div className='blockHeading'>
                    <h1 className='secondary_heading'> Competed Notifications</h1>
                    <FontAwesomeIcon icon={faCircleDown} />
                </div>
                <span>0</span>
            </div>

        </div>

    )
}

export default NotificationStatus
