"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Customer } from '../../../../../models/customer.models';
import { Fascinate_Inline } from 'next/font/google';
import { useRouter } from 'next/navigation';
interface Notification {
  notificationTitle: string,
  notificationDescription: string,
  createdAt: Date,
  updatedAt: Date,
  notificationPriority: string,
  notificationCategory: string,
  _id: string,
}

const page = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    findNotifications()


  }, [])
  const findCreatedDate = (d: Date) => {
    let date = new Date(d)
    let fullYear = date.getFullYear();
    let month = date.toLocaleDateString("en-us", { month: "long" })
    let day = date.getDate()
    return `${day}/${month}/${fullYear}`
  }
  const findNotifications = async () => {
    setLoading(true);
    const response = await axios.get("/api/notification");
    const result = response.data;
    
 

     

      setNotifications(result.notifications)
    


  }
  const calculateTurnAroundTime = (d: Date) => {
    let referenceDate = new Date(d);
    let currentDate = new Date();
    let timeDifferenceInMillis = currentDate.getTime() - referenceDate.getTime();
    let timeDifferenceInDays = Math.floor(timeDifferenceInMillis / 86400000);
    return timeDifferenceInDays;
  }



  return (
    <>
      {loading ? (
        <h1>Loading ...</h1>
      ) : (
        <>
          {notifications.length === 0 ? (
            <h1>There are no Notifications Created</h1>
          ) : (
            <table className="notification-table">
              <thead>
                <tr>
                  <th>Notification#</th>
                  <th className='large_content'>Notification Title</th>
                  <th>Category</th>
                  <th>Priority</th>
                  <th>Turn Around </th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {notifications.map((notification, index) => (
                  <tr key={index}>
                    <td>1234</td>
                    <td>{notification.notificationTitle}</td>
                    <td>{notification.notificationCategory}</td>
                    {notification.notificationPriority === "Emergency" && (
                      <td className='emergencyNotification'>{notification.notificationPriority}</td>
                    )}
                    {notification.notificationPriority === "Urgent" && (
                      <td className='urgentNotification'>{notification.notificationPriority}</td>
                    )}
                    {notification.notificationPriority === "Normal" && (
                      <td className='normalNotification'>{notification.notificationPriority}</td>
                    )}
                    <td>{calculateTurnAroundTime(notification.createdAt)} Days</td>
                    <td>
                      <span onClick={() => { router.push(`/customer/dashboard/notifications/${notification._id}`) }}>Edit</span>
                      <span>Delete</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </>
  );

}

export default page