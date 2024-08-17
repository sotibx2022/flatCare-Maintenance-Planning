'use client';
interface Notification {
    notificationTitle: string;
    notificationDescription: string;
    createdAt: Date;
    updatedAt: Date;
    notificationPriority: string;
    notificationCategory: string;
    _id: string;
}
const truncate_title = (title: string) => {
    const words = title.split(' ');
    if (words.length > 6) {
        const truncatedTitle = words.slice(0, 3).join(' ') + '...';
        return truncatedTitle.toUpperCase();
    } else return title.toUpperCase();
};
const calculateTurnAroundTime = (d: Date) => {
    const referenceDate = new Date(d);
    const currentDate = new Date();
    const timeDifferenceInMillis =
        currentDate.getTime() - referenceDate.getTime();
    const timeDifferenceInDays = Math.floor(timeDifferenceInMillis / 86400000);
    return timeDifferenceInDays;
};
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
const ResponsiveNotificationLists = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        findNotifications();
    }, []);
    const findNotifications = async () => {
        setLoading(true);
        const response = await axios.get('/api/notification');
        const result = response.data;
        setNotifications(result.notifications);
        setLoading(false);
    };
    const handleDelete = async (id: string) => {
        try {
            const response = await axios.delete(`/api/notification/${id}`);
            const result = response.data;
            console.log(result);
            if (result.success) {
                toast.success(result.message);
            } else {
                toast.error(result.message);
            }
        } catch (error) { }
    };
    return (
        <div className=" flex flex-wrap w-full justify-between gap-4">
            {notifications.map((notification, index) => (
                <div key={index} className=" min-w-[300px] justify-between">
                    <div className="">
                        <div className="flex justify-between items-center border-t-[1px] border-b-[1px] border-helper">
                            <span className="">{index + 1}.</span>
                            <div className="">
                                <span
                                    onClick={() => {
                                        router.push(
                                            `/customer/dashboard/notifications/${notification._id}`
                                        );
                                    }}
                                >
                                    <FontAwesomeIcon
                                        icon={faEdit}
                                        style={{ cursor: 'pointer', color: '#28a745', marginRight: '1rem' }}
                                    />
                                </span>
                                <span onClick={() => handleDelete(notification._id)}>
                                    <FontAwesomeIcon
                                        icon={faTrash}
                                        style={{ cursor: 'pointer', color: '#dc3545' }}
                                    />
                                </span>
                            </div>
                        </div>
                        <h3 className=" text-primaryDark">
                            {truncate_title(notification.notificationTitle)}
                        </h3>
                    </div>
                    <div className="flex justify-between my-4">
                        <p className="">
                            {notification.notificationCategory}
                        </p>
                        <p >
                            <span
                                className={
                                    notification.notificationPriority === "Normal"
                                        ? "bg-green-500 text-green-100 px-4 py-1"
                                        : notification.notificationPriority === "Urgent"
                                            ? "bg-orange-500 text-orange-100 px-4 py-1"
                                            : notification.notificationPriority === "Emergency"
                                                ? "bg-red-500 text-red-100 px-4 py-1"
                                                : ""
                                }
                            >
                                {notification.notificationPriority}
                            </span>
                        </p>
                        <p className="">
                            {calculateTurnAroundTime(notification.createdAt)} Days Old
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}
export default ResponsiveNotificationLists;
