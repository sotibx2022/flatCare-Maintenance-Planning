"use client"

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import PasswordInput from '../../ui/passwordInput/PasswordInput';
import Header from '../header/CustomerHeader';

const Login = () => {
    const router = useRouter()
    const [currentEmail, setCurrentEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [focus, setFocus] = useState({
        email: false,
        password: false,
    })
    const [errors, setErrors] = useState({
        email: "",
        password: ""
    })
    const blurHandler = (e: React.FocusEvent<HTMLInputElement>) => {

    }
    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await axios.post("/api/customer/login", { currentEmail, currentPassword });
            const result = response.data;
            if (result) {
                alert(result.message)
            } if (result.success) {
                router.push("/customer/dashboard/main")
            }
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message)
            }

            else {
                console.log("unknown error occured.")
            }
        }

    }
    return (
        <>
            <Header />
            <form onSubmit={submitHandler} className='stepInputs_Wrapper'>
                <div className="form_item">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={currentEmail}
                        onChange={(e) => setCurrentEmail(e.target.value)}
                        onBlur={(e) => blurHandler(e)}
                    />
                    {errors.email && focus.email && <span className='error_message'>{errors.email}</span>}
                </div>

                <div className="form_item">
                    <label>Password</label>
                    <PasswordInput name="password"
                        placeholder="Password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        onBlur={(e) => blurHandler(e)}
                    />
                    {errors.password && focus.password && <span className='error_message'>{errors.password}</span>}
                </div>
                <button type='submit'>SUbmit</button>
            </form>
        </>
    )
}

export default Login