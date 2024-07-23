import axios from 'axios';
import React, { useEffect, useState } from 'react';

const useSingleNotification = (id: string) => {
  console.log(id);
  const [notification, setNotification] = useState({
    notificationTitle: '',
    notificationDescription: '',
    notificationCategory: '',
    notificationPriority: '',
  });
  useEffect(() => {
    findNotification();
  }, [id]);
  const findNotification = async () => {
    const response = await axios.get(`/api/notification/${id}`);
    const result = response.data;
    if (result.notification && result.notification[0]) {
      const {
        notificationTitle,
        notificationDescription,
        notificationCategory,
        notificationPriority,
      } = result.notification[0];

      setNotification({
        notificationTitle,
        notificationDescription,
        notificationCategory,
        notificationPriority,
      });
    }
  };

  return [notification, setNotification] as const;
};

export default useSingleNotification;
