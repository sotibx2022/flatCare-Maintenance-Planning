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
const calculateTurnAroundTime = (d: Date) => {
  const referenceDate = new Date(d);
  const currentDate = new Date();
  const timeDifferenceInMillis =
    currentDate.getTime() - referenceDate.getTime();
  const timeDifferenceInDays = Math.floor(timeDifferenceInMillis / 86400000);
  return timeDifferenceInDays;
};
const truncate_title = (title: string) => {
  const words = title.split(' ');
  if (words.length > 6) {
    const truncatedTitle = words.slice(0, 3).join(' ') + '...';
    return truncatedTitle.toUpperCase();
  } else return title.toUpperCase();
};
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import LoadingComponent from '../../../../ui/LoadingComponent';
import ResponsiveNotificationLists from './ResponsiveNotificationLists';
const page = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [width, setWidth] = useState(0)
  useEffect(() => {
    findNotifications();
  }, []);
  const findScreenSize = () => {
    setWidth(window.innerWidth)
  }
  useEffect(() => {
    window.addEventListener('resize', findScreenSize);
    return (() => {
      window.removeEventListener('resize', findScreenSize);
    })
  }, [])
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
    <div className="notificationTableContainer">
      {loading ? (
        <LoadingComponent />
      ) : (
        <>
          {notifications && notifications.length === 0 ? (
            <h1 className="secondary_heading">
              There are no Notifications Created
            </h1>
          ) : (
            <>
              {width < 1000 ? <ResponsiveNotificationLists /> : <table className="notification-table">
                <thead>
                  <tr>
                    <th>SN</th>
                    <th className="large_content">Notification Title</th>
                    <th>Category</th>
                    <th>Priority</th>
                    <th>Turn Around </th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {notifications.map((notification, index) => (
                    <tr key={index} className="notificationSingleList">
                      <td>{index + 1}</td>
                      <td className='large_content'>{truncate_title(notification.notificationTitle)}</td>
                      <td>{notification.notificationCategory}</td>
                      {notification.notificationPriority === 'Emergency' && (
                        <td className="emergencyNotification">
                          {notification.notificationPriority}
                        </td>
                      )}
                      {notification.notificationPriority === 'Urgent' && (
                        <td className="urgentNotification">
                          {notification.notificationPriority}
                        </td>
                      )}
                      {notification.notificationPriority === 'Normal' && (
                        <td className="normalNotification">
                          {notification.notificationPriority}
                        </td>
                      )}
                      <td suppressHydrationWarning>
                        {calculateTurnAroundTime(notification.createdAt)} Days
                      </td>
                      <td
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                        }}
                      >
                        <span
                          onClick={() => {
                            router.push(
                              `/customer/dashboard/notifications/${notification._id}`,
                            );
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faEdit}
                            style={{ cursor: 'pointer', color: '#28a745' }}
                          />
                        </span>
                        <span onClick={() => handleDelete(notification._id)}>
                          <FontAwesomeIcon
                            icon={faTrash}
                            style={{ cursor: 'pointer', color: '#dc3545' }}
                          />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>}
            </>
          )}
        </>
      )}
    </div>
  );
};
export default page;
