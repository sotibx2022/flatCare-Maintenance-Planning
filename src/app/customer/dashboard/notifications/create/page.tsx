"use client"
import React, { useEffect, useState } from 'react';
import useCustomerData from '../../../../hooks/useCustomerData';
import { getCategoreis } from '../../../../../helper/getCategories';
import validateNotificationDetails from '../../../../../helper/validateNotificationDetails';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import SubmitError from '../../../../ui/SubmitError';
import { toast } from 'react-toastify';
import SubmitSuccess from '../../../../ui/submitSuccess';
const Page = () => {
  const [customerDatas, setCustomerDatas] = useCustomerData();
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [categories, setCategories] = useState<string[]>([]);
  const [priority, setPriority] = useState("");
  const [categoryValue, setCategoryValue] = useState("");
  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationDescription, setNotificationDescription] = useState("");
  const [noficationErrors, setNotificationErrors] = useState({
    notificationTitle: "",
    notificationDescription: "",
    notificationPriority: "",
    notificationCategory: ""
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter()
  useEffect(() => {
    const findCategories = async () => {
      const allCategories: string[] | undefined = await getCategoreis();
      if (allCategories) {
        setCategories(allCategories);
      }
    };
    findCategories();
  }, []);
  const selectPriority = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPriority(e.target.value);
  };
  const selectCategoryValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryValue(e.target.value);
  };
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNotificationTitle(e.target.value);
  };
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotificationDescription(e.target.value);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const error = validateNotificationDetails(
      notificationTitle,
      notificationDescription,
      priority,
      categoryValue
    );
    setNotificationErrors(error);
    if (!noficationErrors.notificationTitle || !noficationErrors.notificationDescription ||
      !noficationErrors.notificationCategory || !noficationErrors.notificationPriority
    ) {
      setLoading(true);
      try {
        const dataToSend = {
          notificationTitle,
          notificationDescription,
          notificationPriority: priority,
          notificationCategory: categoryValue,
          createdBy: customerDatas.fullName,
          userId: customerDatas.userId,
          address: {
            buildingNumber: customerDatas.buildingNumber,
            flatNumber: customerDatas.floorNumber,
            roomNumber: customerDatas.roomNumber
          }
        };
        const response = await axios.post('http://localhost:3000/api/notification', dataToSend);
        const result = response.data;
        setLoading(false);
        if (result.success) {
          setSubmitSuccess(true)
          toast.success(result.success)
          router.push('/customer/dashboard/notifications/list');
        } else {
          toast.error(result.message)
        }
      } catch (error) {
        console.error('Error submitting notification:', error);
        setLoading(false);
        // Handle error display or logging as needed
      }
    } else {
      console.log('Form validation failed');
    }
  };
  return (
    <div className='create_Notification_container'>
      <h1 className='primary_heading'>Create Notification</h1>
      <div>
        {submitSuccess && <SubmitSuccess message='Notification Created Successfully ! Wait for Redirection' />}
        <form onSubmit={handleSubmit}>
          <div className="form_Item">
            <label>Notification Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={notificationTitle}
              onChange={handleTitleChange}
            />
            {noficationErrors.notificationTitle && (
              <SubmitError message={noficationErrors.notificationTitle} />
            )}
          </div>
          <div className="form_Item">
            <label>Notification Description:</label>
            <textarea
              id="description"
              name="description"
              rows={5}
              value={notificationDescription}
              onChange={handleDescriptionChange}
            ></textarea>
            {noficationErrors.notificationDescription && (
              <SubmitError message={noficationErrors.notificationDescription} />
            )}
          </div>
          <div className="form_Item">
            <label>Notification Priority:</label>
            <select
              id="priority"
              name="priority"
              value={priority}
              onChange={selectPriority}
            >
              <option value="">Select One</option>
              <option value="Normal">Normal</option>
              <option value="Urgent">Urgent</option>
              <option value="Emergency">Emergency</option>
            </select>
            {noficationErrors.notificationPriority && (
              <SubmitError message={noficationErrors.notificationPriority} />
            )}
          </div>
          <div className="form_Item">
            <label>Notification Categories:</label>
            <select
              id="categories"
              name="categories"
              value={categoryValue}
              onChange={selectCategoryValue}
            >
              <option value="">Select One</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {noficationErrors.notificationCategory && (
              <SubmitError message={noficationErrors.notificationCategory} />
            )}
          </div>
          <div className="form_Item">
            <label>Created By:</label>
            <input
              type="text"
              id="createdBy"
              name="createdBy"
              value={customerDatas.fullName}
              readOnly
            />
          </div>
          <div className="form_Item">
            <label>Location</label>
            <input
              type="text"
              id="address"
              name="address"
              value={`Building Number -${customerDatas.buildingNumber},Floor Number - ${customerDatas.floorNumber},Room Number - ${customerDatas.roomNumber} `}
              readOnly
            />
          </div>
          <button type="submit" disabled={loading} style={{ minWidth: '200px' }}>{loading ? "Loading" : "Create Notification"}</button>
        </form>
      </div>
    </div>
  );
};
export default Page;
