'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import LoadingComponent from '../../../../ui/LoadingComponent';
import ResponsiveNotificationLists from './ResponsiveNotificationLists';
import { useDeleteNotification } from '../../../../hooks/useDeleteNotification';
import { findNotifications } from '../../../../hooks/useDeleteNotification';
import { useQuery } from '@tanstack/react-query';
import { Notification } from '../../../../hooks/useDeleteNotification';
import { truncate_title } from '../../../../hooks/useDeleteNotification';
import { calculateTurnAroundTime } from '../../../../hooks/useDeleteNotification';
const page = () => {
  const router = useRouter();
  const { mutate: deleteNotification, isPending: isDeleting } = useDeleteNotification();
  const { data: notifications = [], isPending: isFetching } = useQuery({
    queryKey: ['notifications'],
    queryFn: findNotifications,
    // Optionally add staleTime or cacheTime to control when data is considered stale
  });
  const handleDelete = (id: string) => {
    deleteNotification(id); // Use the mutate function from useDeleteNotification
  };
  const [width, setWidth] = useState(0);
  const findScreenSize = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    findScreenSize();
    window.addEventListener('resize', findScreenSize);
    return () => {
      window.removeEventListener('resize', findScreenSize);
    };
  }, []);
  return (
    <div className="notificationTableContainer">
      {isDeleting || isFetching ? (
        <LoadingComponent />
      ) : (
        <>
          {notifications.length === 0 ? (
            <h1 className="secondary_heading">
              There are no Notifications Created
            </h1>
          ) : (
            <>
              {width < 1000 ? (
                <ResponsiveNotificationLists />
              ) : (
                <table className="notification-table">
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
                    {notifications.map((notification: Notification, index: number) => (
                      <tr key={notification._id} className="notificationSingleList">
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
                              router.push(`/customer/dashboard/notifications/${notification._id}`);
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
                </table>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};
export default page;
