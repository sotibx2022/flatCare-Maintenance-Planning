'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
interface CustomerData {
  fullName: string;
  imageUrl: string;
  email: string;
  buildingNumber: string;
  floorNumber: string;
  roomNumber: string;
  phoneNumber: string;
  userId: string;
}
const useCustomerData = () => {
  const [customerDatas, setCustomerDatas] = useState<CustomerData>({
    fullName: '',
    imageUrl: '',
    email: '',
    buildingNumber: '',
    floorNumber: '',
    roomNumber: '',
    phoneNumber: '',
    userId: '',
  });
  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const response = await axios.get('/api/customer/findCustomer');
        const result = response.data;
        if (result.success) {
          setCustomerDatas((prevCustomerData) => ({
            ...prevCustomerData,
            fullName: result.customer.fullName,
            imageUrl: result.customer.imageUrl,
            email: result.customer.email,
            buildingNumber: result.customer.buildingNumber,
            floorNumber: result.customer.floorNumber,
            roomNumber: result.customer.roomNumber,
            phoneNumber: result.customer.phoneNumber,
            userId: result.customer._id,
          }));
        }
      } catch (error) {
        console.error('Error fetching customer details:', error);
      }
    };
    getUserDetails();
  }, []);
  return [customerDatas, setCustomerDatas] as const;
};
export default useCustomerData;
