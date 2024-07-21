"use client"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import SubmitError from '../../ui/SubmitError'
import { faEye, faEyeSlash, faLock } from '@fortawesome/free-solid-svg-icons'
import SubmitSuccess from '../../ui/submitSuccess'
import Link from 'next/link'
import axios from 'axios'
import { toast } from 'react-toastify'
interface FormData {
    email: string,
    password: string,
}
const page = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [submitsuccess, setSubmitSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors, isSubmitted, isSubmitting, isSubmitSuccessful } } = useForm<FormData>()
    const onSubmit = async (data: FormData) => {
        try {
            setLoading(true);
            const response = await axios.post("/api/customer/resendValidation", data)
            const result = response.data;
            if (result.success) {
                setLoading(false);
                setSuccessMessage(result.success)
                toast.success(result.message);
            } else {
                setLoading(false);
                setErrorMessage(result.message);
                toast.error(result.message);
            }
        } catch (error) {
        }
        finally {
            setLoading(false);
        }
    }
    return (
        <div className='loginFormContainer'>
            <form onSubmit={handleSubmit(onSubmit)} className='center_container'>
                <div className='form_container'>
                    <h1 className='primary_heading'>Resend Verification</h1>
                    <div className="form_Item">
                        <label>Email</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type="email"
                                placeholder="Email"
                                id="email"
                                {...register("email", { required: "Email is required" })}
                                style={{ paddingLeft: '30px' }}
                            />
                            <FontAwesomeIcon icon={faLock} className='input_icon_left' />
                        </div>
                        {errors.email?.message && <SubmitError message={errors.email?.message} />}
                    </div>
                    <div className="form_Item">
                        <label>Password</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                id='password'
                                {...register("password", { required: "Password is required" })}
                                style={{ paddingLeft: '30px' }}
                            />
                            <FontAwesomeIcon icon={faLock} className='input_icon_left' />
                            {showPassword ? <FontAwesomeIcon icon={faEyeSlash}
                                className='input_icon_right'
                                onClick={() => setShowPassword(false)} />
                                : <FontAwesomeIcon icon={faEye}
                                    onClick={() => setShowPassword(true)} className='input_icon_right' />}
                        </div>
                        {errors.email?.message && <SubmitError message={errors.email?.message} />}
                    </div>
                    <button type='submit'>{loading ? "Submitting" : "Submit"}</button>
                    {isSubmitted && errorMessage && <SubmitError message={errorMessage} />}
                    {isSubmitSuccessful && submitsuccess && successMessage && <SubmitSuccess message={successMessage} />}
                    <div style={{ marginTop: '20px' }}>
                        <p className='secondary_heading'>Account not created? <Link href="/customer/signup" style={{ color: '#007bff', textDecoration: 'underline' }}>Register</Link></p>
                        <p className='secondary_heading'>Forgot your password? <Link href="/customer/forgetPassword" style={{ color: '#007bff', textDecoration: 'underline' }}>Reset</Link></p>
                        <p className='secondary_heading'>Already Verified? <Link href="/customer/login" style={{ color: '#007bff', textDecoration: 'underline' }}>Login</Link></p>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default page