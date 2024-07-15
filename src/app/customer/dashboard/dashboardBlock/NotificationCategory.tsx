"use client"
import React from 'react'
import useAllNotifications from '../../../hooks/useAllNotifications'

const NotificationCategory = () => {
    const [allNotifications] = useAllNotifications();
    let PlumningNotifications = 9;
    let ElectricalNotifiations = 6;
    let PaintaingNotifications = 2;
    let OtherNotifications = 4;
    let HVACNotification = 1;
    let totalNotifications = 22;

    return (
        <div>
            <div className='bar'></div>
            <div className='bar'></div>
            <div className='bar'></div>
            <div className='bar'></div>
            <div className='bar'></div>
            <div className='bar'></div>
            <div className='bar'></div>
        </div>
    )
}

export default NotificationCategory