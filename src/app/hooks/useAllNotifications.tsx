"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const useAllNotifications = () => {
    const [allNotifications, setAllNotifications] = useState([]);
    useEffect(() => {
        const findAllNotifications = async () => {
            const response = await axios.get("/api/notification/findAllNotifications");
            const result = response.data;
            console.log(result.allNotifications.length)
            setAllNotifications(result.allNotifications);
        }
        findAllNotifications()
    }, [])
    return [allNotifications]
}

export default useAllNotifications