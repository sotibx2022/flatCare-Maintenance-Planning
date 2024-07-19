"use client"
import React, { useEffect, useState } from 'react';
import useCustomerData from '../../../../hooks/useCustomerData';
import axios from 'axios';
import dummyProfile from "@/../../public/assets/images/dummyprofile.png"
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import SubmitError from '../../../../ui/SubmitError';
import { error } from 'console';
import SubmitSuccess from '../../../../ui/submitSuccess';
import ProfileImage from '../../../../ui/ProfileImage';
interface FieldValues {
  fullName: string,
  phoneNumber: string,
  imageUrl: string,
  roomNumber: string,
  buildingNumber: string,
  floorNumber: string,
  email: string,
}
const EditCustomerProfile = () => {
  const { register, setValue, handleSubmit, formState: { isSubmitting, errors, isSubmitted } } = useForm<FieldValues>();
  const router = useRouter();
  const [customerDatas, setCustomerDatas] = useCustomerData();
  const [loading, setLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  useEffect(() => {
    if (customerDatas) {
      Object.keys(customerDatas).forEach((key) => {
        setValue(key as keyof FieldValues, customerDatas[key as keyof FieldValues])
      })
    }
  }, [customerDatas, setValue])
  const onSubmit = async (data: FieldValues) => {
    const form = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === 'file') {
        return;
      }
      form.append(key, data[key as keyof FieldValues]);
    });
    if (file) {
      form.append('file', file);
    }
    try {
      setLoading(true);
      const response = await axios.put("/api/customer/updateProfile", form);
      const result = response.data;
      if (!result.success) {
        toast.error(result.message);
        setSubmitError(true)
      } else {
        toast.success(result.message);
        setSubmitSuccess(true);
        setCustomerDatas({
          ...customerDatas,
          fullName: result.fullName,
          email: result.email,
          imageUrl: result.imageUrl,
          buildingNumber: result.buildingNumber,
          floorNumber: result.floorNumber,
          roomNumber: result.roomNumber,
          phoneNumber: result.phoneNumber
        });
        router.push("/customer/dashboard/profile/view");
      }
    } catch (error) {
      console.error("Error updating customer details:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files?.[0];
    if (imageFile) {
      setFile(imageFile);
      const imageUrl = URL.createObjectURL(imageFile);
      setCustomerDatas({ ...customerDatas, imageUrl: imageUrl })
    }
  }
  return (
    <section style={{ display: 'flex', justifyContent: 'flex-start', gap: '30px', marginTop: '20px' }}>
      <h1 className='primary_heading'>Customer Edit Profile</h1>
      <ProfileImage imageUrl={customerDatas.imageUrl} onChange={handleImageChange} />
      <form className='editForm' style={{ minWidth: '400px', marginTop: '50px' }} onSubmit={handleSubmit(onSubmit)}>
        {isSubmitted && submitError && <SubmitError message='Nothing to Update ! Please Modify Form Data' />}
        {isSubmitted && submitSuccess && <SubmitSuccess message="Datas Updated SuccessFully ! wait for Redirection" />}
        <div className="form_Item">
          <label>Full Name:</label>
          <input
            type="text"
            id='fullName'
            {...register("fullName", {
              required: { value: true, message: "This Field is Required" },
              minLength: { value: 5, message: "Minimum 5 Characters are required" },
              maxLength: { value: 50, message: "Maximum 50 Characters are allowed." },
              pattern: {
                value: /^[a-zA-Z\s]*$/,
                message: "Invalid Format. Only Contains Letters and Spaces."
              }
            })}
          />
          {errors?.fullName?.message && <SubmitError message={errors?.fullName?.message} />}
        </div>
        <div className="form_Item">
          <label>Email:</label>
          <input
            type="text"
            id='email'
            {...register("email", {
              required: { value: true, message: "This Field is Required" },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })}
          />
          {errors?.email?.message && <SubmitError message={errors?.email?.message} />}
        </div>
        <div className="form_Item">
          <label>Building Number:</label>
          <input
            type="text"
            id='buildingNumber'
            {...register("buildingNumber", {
              required: { value: true, message: "This Field is Required" },
              minLength: { value: 1, message: "Minimum 1 Character is required" },
              maxLength: { value: 10, message: "Maximum 10 Characters are allowed." }
            })}
          />
          {errors?.buildingNumber?.message && <SubmitError message={errors?.buildingNumber?.message} />}
        </div>
        <div className="form_Item">
          <label>Floor Number:</label>
          <input
            type="text"
            id="floorNumber"
            {...register("floorNumber", {
              required: { value: true, message: "This Field is Required" },
              minLength: { value: 1, message: "Minimum 1 Character is required" },
              maxLength: { value: 5, message: "Maximum 5 Characters are allowed." }
            })}
          />
        </div>
        <div className="form_Item">
          <label>Room Number:</label>
          <input
            type="text"
            id="roomNumber"
            {...register("roomNumber", {
              required: { value: true, message: "This Field is Required" },
              minLength: { value: 1, message: "Minimum 1 Character is required" },
              maxLength: { value: 5, message: "Maximum 5 Characters are allowed." }
            })}
          />
          {errors?.roomNumber?.message && <SubmitError message={errors?.roomNumber?.message} />}
        </div>
        <div className="form_Item">
          <label>Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            {...register("phoneNumber", {
              required: { value: true, message: "This Field is Required" },
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Invalid Phone Number"
              }
            })}
          />
          {errors?.phoneNumber?.message && <SubmitError message={errors?.phoneNumber?.message} />}
        </div>
        <button type="submit" disabled={isSubmitting}>{loading ? "Loading..." : "Update"}</button>
      </form>
    </section>
  );
};
export default EditCustomerProfile;
