"use client"
import PasswordInput from '@/app/ui/passwordInput/PasswordInput';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const Login = () => {
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
            const response = await axios.post("/api/customeraccount/login", { currentEmail, currentPassword });
            const result = response.data;
            if (result) {
                console.log(result)
                alert(result.message)
            } if (result.success) {
                const router = useRouter()
                router.push("/")
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
        <form onSubmit={submitHandler}>
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
    )
}

export default Login