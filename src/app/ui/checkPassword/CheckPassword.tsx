"use client"
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PasswordInput from '../passwordInput/PasswordInput'
import useCustomerData from '../../hooks/useCustomerData'


interface checkPasswordProps {
    successValue: (value: boolean) => void;
}
interface CustomerData {

    fullName: string;
    imageUrl: string;
    email: string;
    buildingNumber: string;
    floorNumber: string;
    roomNumber: string;
    phoneNumber: string;
}
const CheckPassword: React.FC<checkPasswordProps> = ({ successValue }) => {



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
    const [originalPassword, setOriginalPassword] = useState("");
    const [passwordError, setPasswordError] = useState("")
    const [focus, setFocus] = useState(false);
    const [updateField, setUpdateField] = useState(false)
    const [loading, setLoading] = useState(false);
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
    const blurHandler = (e: React.FocusEvent<HTMLInputElement>) => {

        const error = validatePassword(originalPassword);
        setPasswordError(error)
        setFocus(true);
    };
    const CheckPassword = async () => {
        const error = validatePassword(originalPassword);
        setPasswordError(error)
        setFocus(true);
        if (error === "") {
            try {
                setLoading(true)
                const dataToSend = { originalPassword, email: customerDatas.email }
                const response = await axios.post("/api/customer/checkPassword", dataToSend);
                const result = response.data;
                alert(result.message)
                setLoading(false)
                successValue(!!result.success)
            } catch (error) {
                setLoading(false);
            }


        }
    }
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOriginalPassword(e.target.value);
        setFocus(false);
    }

    return (
        <div>
            <h1>Customer Change Password</h1>
            <div>
                <PasswordInput
                    placeholder="Original Password"
                    value={originalPassword} name="password"
                    onChange={changeHandler} onBlur={blurHandler} />
                {focus && <span>{passwordError}</span>}
                <button onClick={CheckPassword}>{loading ? "Loading" : "Check"}</button>
            </div>

        </div>
    )
}

export default CheckPassword