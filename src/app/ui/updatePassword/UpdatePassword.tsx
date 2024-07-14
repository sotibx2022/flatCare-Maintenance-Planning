"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faLock } from '@fortawesome/free-solid-svg-icons';
import SubmitError from '../SubmitError';
import { toast } from 'react-toastify';

interface CustomerData {

    fullName: string;
    imageUrl: string;
    email: string;
    buildingNumber: string;
    floorNumber: string;
    roomNumber: string;
    phoneNumber: string;
}
const UpdatePassword = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [customerDatas, setCustomerDatas] = useState<CustomerData>({
        fullName: '',
        imageUrl: '',
        email: '',
        buildingNumber: '',
        floorNumber: '',
        roomNumber: '',
        phoneNumber: ''
    });

    useEffect(() => {
        const getUserDetails = async () => {
            try {
                let response = await axios.get("/api/customer/findCustomer");
                let result = response.data;
                console.log(result.customer);

                setCustomerDatas(prevCustomerData => ({
                    ...prevCustomerData,
                    fullName: result.customer.fullName,
                    imageUrl: result.customer.imageUrl,
                    email: result.customer.email,
                    buildingNumber: result.customer.buildingNumber,
                    floorNumber: result.customer.floorNumber,
                    roomNumber: result.customer.roomNumber,
                    phoneNumber: result.customer.phoneNumber
                }));
            } catch (error) {
                console.error("Error fetching customer details:", error);
            }
        };

        getUserDetails();
    }, []);
    const [passwordValue, setPasswordValue] = useState({
        newPassword: "",
        confirmNewPassword: ""
    });

    const [focus, setFocus] = useState({
        newPassword: false,
        confirmNewPassword: false
    });

    const [newPasswordError, setNewPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPasswordValue({
            ...passwordValue,
            [name]: value
        });
    };

    const blurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let error = "";

        if (name === "newPassword") {
            error = validatePassword(value);
            setNewPasswordError(error);
            setFocus({ ...focus, newPassword: true });
        } else if (name === "confirmNewPassword") {
            if (value !== passwordValue.newPassword) {
                error = "Passwords do not match.";
            }
            setConfirmPasswordError(error);
            setFocus({ ...focus, confirmNewPassword: true });
        }
    };

    const validatePassword = (password: string) => {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (password.length < minLength) {
            return "Password must be at least 8 characters long.";
        }
        if (!hasUpperCase) {
            return "Password must contain at least one uppercase letter.";
        }
        if (!hasLowerCase) {
            return "Password must contain at least one lowercase letter.";
        }
        if (!hasNumber) {
            return "Password must contain at least one number.";
        }
        if (!hasSpecialChar) {
            return "Password must contain at least one special character.";
        }
        return "";
    };
    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (newPasswordError === "" && confirmPasswordError === "") {
                const { newPassword } = passwordValue;
                const dataToSend = { email: customerDatas.email, newPassword }
                const response = await axios.post("/api/customer/updatePassword", dataToSend);
                const result = response.data;
                if (result.success) {
                    toast.success(result.message)
                    router.push("/customer/dashboard/main")
                }
            }
        } catch (error) {

        }
    }
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    return (
        <form onSubmit={submitHandler} >
            <h1 className='primary_heading' style={{ marginTop: '1rem' }}>Update Password</h1>
            <div className='form_Item'>
                <label>New Password</label>
                <div style={{ position: 'relative' }}>
                    <FontAwesomeIcon icon={faLock} style={{
                        position: 'absolute', top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#29030d',
                        left: '10px'
                    }} />
                    <input
                        type='password'
                        placeholder="New Password"
                        value={passwordValue.newPassword}
                        name="newPassword"
                        onChange={changeHandler}
                        onBlur={blurHandler}
                        style={{ paddingLeft: '30px', paddingRight: '30px' }}
                    />
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} style={{
                        position: 'absolute', color: '#29030d',
                        top: '50%', right: '10px', transform: 'translateY(-50%)'
                    }} onClick={toggleShowPassword} />
                </div>
            </div>
            {focus.newPassword && newPasswordError && <SubmitError message={newPasswordError} />}
            <div className='form_Item'>
                <label>Confirm New Password</label>
                <div style={{ position: 'relative' }}>
                    <FontAwesomeIcon icon={faLock} style={{
                        position: 'absolute', top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#29030d',
                        left: '10px'
                    }} />
                    <input
                        type='password'
                        placeholder="Confirm New Password"
                        value={passwordValue.confirmNewPassword}
                        name="confirmNewPassword"
                        onChange={changeHandler}
                        onBlur={blurHandler}
                        style={{ paddingLeft: '30px', paddingRight: '30px' }}
                    />
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} style={{
                        position: 'absolute', color: '#29030d',
                        top: '50%', right: '10px', transform: 'translateY(-50%)'
                    }} onClick={toggleShowPassword} />
                </div>
            </div>
            {focus.confirmNewPassword && confirmPasswordError && <SubmitError message={confirmPasswordError} />}
            <button type="submit" style={{ marginTop: '1rem' }}>Submit</button>
        </form>
    );
};

export default UpdatePassword;
