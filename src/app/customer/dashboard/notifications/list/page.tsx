'use client';
import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import LoadingComponent from '../../../../ui/LoadingComponent';
import ResponsiveNotificationLists from './ResponsiveNotificationLists';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { isPending } from '@reduxjs/toolkit';
interface Notification {
  notificationTitle: string;
  notificationDescription: string;
  createdAt: Date;
  updatedAt: Date;
  notificationPriority: string;
  notificationCategory: string;
  _id: string;
}
interface APIResponse {
  success: boolean;
  message: string;
  status: number;
  data?: Notification[]
}
const calculateTurnAroundTime = (d: Date) => {
  const referenceDate = new Date(d);
  const currentDate = new Date();
  const timeDifferenceInMillis = currentDate.getTime() - referenceDate.getTime();
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
const page = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const deleteNotificationRequest = async (id: string): Promise<APIResponse> => {
    const response = await axios.delete(`/api/notification/${id}`);
    return response.data;
  };
  const useDeleteNotification = () => {
    return useMutation<APIResponse, AxiosError, string>({
      mutationFn: deleteNotificationRequest,
      onSuccess: (result) => {
        if (result.success) {
          toast.success(result.message || "Notification deleted successfully.");
          queryClient.invalidateQueries({ queryKey: ['notifications'] });
        } else {
          toast.error(result.message || "Problem deleting the notification.");
        }
      },
      onError: () => {
        toast.error("Unexpected Error occurred.");
      },
    });
  };
  const { mutate: deleteNotification, isPending: isDeleting } = useDeleteNotification();
  const findNotifications = async (): Promise<Notification[]> => {
    const response = await axios.get('/api/notification');
    return response.data.notifications;
  };
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
