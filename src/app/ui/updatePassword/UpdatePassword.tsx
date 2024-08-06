import { faEye, faEyeSlash, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import SubmitError from '../SubmitError';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import SubmitSuccess from '../submitSuccess';
import useCustomerData from '../../hooks/useCustomerData';
import LoadingButton from '../../landingpage/homeNavigation/LoadingButton';
interface UpdatePasswordData {
  newPassword: string;
  confirmNewPassword: string;
}
interface UpdatePasswordProps {
  email?: string;
}
const UpdatePassword: React.FC<UpdatePasswordProps> = ({ email }) => {
  console.log(email);
  const router = useRouter();
  const [customerDataLoading, customerDatas, setCustomerDatas] = useCustomerData();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitted },
  } = useForm<UpdatePasswordData>();
  const [showPassword, setShowPassword] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const newPassword = watch('newPassword');
  const onSubmit: SubmitHandler<UpdatePasswordData> = async (data) => {
    console.log(email);
    setLoading(true);
    const dataToSend = {
      email: customerDatas.email || email,
      newPassword: data.newPassword,
    };
    const response = await axios.post(
      '/api/customer/updatePassword',
      dataToSend,
    );
    const result = response.data;
    setLoading(false);
    if (result.success) {
      setSubmitSuccess(result.message);
      toast.success(result.message);
      router.push('/customer/dashboard/main');
    } else {
      toast.error(result.message);
      setSubmitError(result.message);
    }
  };
  function toggleShowPassword(): void {
    setShowPassword(!showPassword);
  }
  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <h1 className="primary_heading" style={{ marginTop: '1rem' }}>
        Update Password
      </h1>
      {isSubmitted && submitError && <SubmitError message={submitError} />}
      {isSubmitted && submitSuccess && (
        <SubmitSuccess message={submitSuccess} />
      )}
      <div className="form_Item">
        <label htmlFor="newPassword">New Password</label>
        <div style={{ position: 'relative' }}>
          <FontAwesomeIcon icon={faLock} className="input_icon_left" />
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="New Password"
            id="newPassword"
            style={{ paddingLeft: '30px', paddingRight: '30px' }}
            {...register('newPassword', {
              required: { value: true, message: 'New Password is Required.' },
              pattern: {
                value:
                  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/,
                message:
                  'Password must be 8+ characters with uppercase, lowercase, number, and special character',
              },
            })}
          />
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye}
            className="input_icon_right"
            onClick={toggleShowPassword}
          />
        </div>
        {errors.newPassword?.message && (
          <SubmitError message={errors.newPassword.message} />
        )}
      </div>
      <div className="form_Item">
        <label htmlFor="confirmNewPassword">Confirm New Password</label>
        <div style={{ position: 'relative' }}>
          <FontAwesomeIcon icon={faLock} className="input_icon_left" />
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Confirm New Password"
            id="confirmNewPassword"
            style={{ paddingLeft: '30px', paddingRight: '30px' }}
            {...register('confirmNewPassword', {
              required: {
                value: true,
                message: 'Confirm Password is Required.',
              },
              validate: (value) =>
                value === newPassword || "Password Don't Match ! Try Again",
            })}
          />
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye}
            className="input_icon_right"
            onClick={toggleShowPassword}
          />
        </div>
        {errors.confirmNewPassword?.message && (
          <SubmitError message={errors.confirmNewPassword.message} />
        )}
      </div>
      <button type="submit" style={{ marginTop: '1rem' }} disabled={loading}>
        {loading ? <LoadingButton /> : "Update"}
      </button>
    </form>
  );
};
export default UpdatePassword;
