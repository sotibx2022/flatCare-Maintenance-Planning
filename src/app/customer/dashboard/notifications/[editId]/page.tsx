'use client';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getCategoreis } from '../../../../../helper/getCategories';
import useSingleNotification from '../../../../hooks/useSingleNotification';
import useCustomerData from '../../../../hooks/useCustomerData';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import SubmitSuccess from '../../../../ui/submitSuccess';
import SubmitError from '../../../../ui/SubmitError';
import { toast } from 'react-toastify';
import LoadingButton from '../../../../landingpage/homeNavigation/LoadingButton';
interface FormData {
  notificationTitle: string;
  notificationDescription: string;
  notificationPriority: string;
  notificationCategory: string;
}
interface EditNotificationProps {
  params: {
    editId: string;
  };
}
const FormComponent: React.FC<EditNotificationProps> = (props) => {
  const router = useRouter();
  const editId = props.params.editId;
  const [categories, setCategories] = useState<string[] | undefined>();
  const [notification, setNotification] = useSingleNotification(editId);
  const [customerDataLoading, customerDatas, setCustomerDatas] = useCustomerData();
  const [submitError, setSubmitError] = useState();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitted, isValid, isSubmitting },
  } = useForm<FormData>();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  useEffect(() => {
    const findCategory = async () => {
      const categoreis = await getCategoreis();
      setCategories(categoreis);
    };
    findCategory();
  }, []);
  useEffect(() => {
    if (notification.notificationTitle) {
      setValue('notificationTitle', notification.notificationTitle);
      setValue('notificationDescription', notification.notificationDescription);
      setValue('notificationPriority', notification.notificationPriority);
      setValue('notificationCategory', notification.notificationCategory);
    }
  }, [notification, setValue]);
  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.put(`/api/notification/${editId}`, {
        editId,
        data,
      });
      const result = response.data;
      if (result.success) {
        toast.success(result.message);
        router.push('/customer/dashboard/notifications/list');
      } else {
        toast.error(result.message);
        setSubmitError(result.message);
      }
    } catch (error) {
      console.error('Failed to update notification:', error);
      alert(
        'An error occurred while updating the notification. Please try again.',
      );
    }
  };
  return (
    <div className="create_Notification_container">
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <h1 className="primary_heading">Edit Notification</h1>
        {submitError && <SubmitError message={submitError} />}
        <div className="form_Item">
          <label htmlFor="notificationTitle">Notification Title</label>
          <input
            type="text"
            placeholder="Enter Notification Title"
            id="notificationTitle"
            {...register('notificationTitle', {
              required: 'Notification Title is required',
              minLength: {
                value: 10,
                message: 'Minimum 10 characters required',
              },
              maxLength: {
                value: 100,
                message: 'Maximum 100 characters allowed',
              },
              pattern: {
                value: /^[a-zA-Z0-9\s\-_\.\,\!\?\']+$/,
                message: 'Invalid format',
              },
            })}
          />
          {errors?.notificationTitle?.message && (
            <SubmitError message={errors.notificationTitle.message} />
          )}
        </div>
        <div className="form_Item">
          <label htmlFor="notificationDescription">
            Notification Description
          </label>
          <textarea
            placeholder="Enter Notification Description"
            rows={5}
            id="notificationDescription"
            {...register('notificationDescription', {
              required: 'Notification Description is required',
              minLength: {
                value: 20,
                message: 'Minimum 20 characters required',
              },
              maxLength: {
                value: 500,
                message: 'Maximum 500 characters allowed',
              },
              pattern: {
                value: /^[a-zA-Z][a-zA-Z0-9\s\-_\.\,\!\?\']+$/,
                message:
                  'Invalid format, cannot start with numbers or special characters',
              },
            })}
          />
          {errors?.notificationDescription?.message && (
            <SubmitError message={errors.notificationDescription.message} />
          )}
        </div>
        <div className="form_Item">
          <label htmlFor="notificationPriority">Notification Priority</label>
          <select
            id="notificationPriority"
            {...register('notificationPriority', {
              required: {
                value: true,
                message: 'Please select one Priority',
              },
            })}
          >
            <option value="">Select One</option>
            <option value="Emergency">Emergency</option>
            <option value="Urgent">Urgent</option>
            <option value="Normal">Normal</option>
          </select>
          {errors?.notificationPriority?.message && (
            <SubmitError message={errors.notificationPriority.message} />
          )}
        </div>
        <div className="form_Item">
          <label htmlFor="notificationCategory">Notification Category</label>
          <select
            id="notificationCategory"
            {...register('notificationCategory', {
              required: {
                value: true,
                message: 'Please Select One Category',
              },
            })}
          >
            <option value="">Select One</option>
            {categories ? (
              categories.map((category, index) => (
                <option value={category} key={index}>
                  {category}
                </option>
              ))
            ) : (
              <option value="">Loading Categories</option>
            )}
          </select>
          {errors?.notificationCategory?.message && (
            <SubmitError message={errors.notificationCategory.message} />
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
        <button type="submit">{isSubmitting ? <LoadingButton /> : 'submit'}</button>
      </form>
      {isSubmitted && showSuccessMessage && (
        <SubmitSuccess message="Notification SuccessFully Updated." />
      )}
    </div>
  );
};
export default FormComponent;
