"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faLock } from '@fortawesome/free-solid-svg-icons';
import Header from '../header/CustomerHeader';
import SubmitError from '../../ui/SubmitError';
import { toast } from 'react-toastify';
import SubmitSuccess from '../../ui/submitSuccess';
import Link from 'next/link';

type FormData = {
    email: string;
    password: string;
};

const Login = () => {
    const router = useRouter();
    const [submitsuccess, setSubmitSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false)
    const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitted, isSubmitSuccessful } } = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        setSubmitSuccess(false)
        try {
            const response = await axios.post("/api/customer/login", { currentEmail: data.email, currentPassword: data.password });
            const result = response.data;
            console.log(result.success)
            if (result.success === false) {
                setSubmitSuccess(false);
                toast.error(result.message)

            } else {
                setSubmitSuccess(true)
                router.push("/customer/dashboard/main");
                toast.success(result.message)
            }



        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            } else {
                console.log("Unknown error occurred.");
            }
        }
    };

    return (
        <>
            <Header />
            <div className='loginFormContainer'>
                <form onSubmit={handleSubmit(onSubmit)} className='center_container'>
                    <div className='form_container'>
                        <h1 className='primary_heading'>Customer Login</h1>
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
                                <FontAwesomeIcon icon={faLock} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#29030d' }} />
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
                                <FontAwesomeIcon icon={faLock}
                                    style={{
                                        position: 'absolute', left: '10px', top: '50%',
                                        transform: 'translateY(-50%)', color: '#29030d'
                                    }} />

                                {showPassword ? <FontAwesomeIcon icon={faEyeSlash}
                                    onClick={() => setShowPassword(false)} style={{
                                        position: 'absolute', right: '10px', top: '50%',
                                        transform: 'translateY(-50%)', color: "#29030d",
                                        cursor: 'pointer'
                                    }} />
                                    : <FontAwesomeIcon icon={faEye} style={{
                                        position: 'absolute', right: '10px',
                                        transform: 'translateY(-50%)', top: '50%',
                                        color: "#29030d", cursor: 'pointer'
                                    }}
                                        onClick={() => setShowPassword(true)} />}

                            </div>
                            {errors.email?.message && <SubmitError message={errors.email?.message} />}
                        </div>
                        <button type='submit'>{isSubmitting ? "Submitting" : "Submit"}</button>
                        {isSubmitted && !submitsuccess && <SubmitError message="Please Correct The Errors Before Submitting Again" />}
                        {isSubmitSuccessful && submitsuccess && <SubmitSuccess message="Login Success, wait for redirection" />}
                        <div style={{ marginTop: '20px', textAlign: 'center' }}>
                            <p style={{ marginBottom: '10px' }}>Account not created yet? Please <Link href="/customer/signup" style={{ color: '#007bff', textDecoration: 'underline' }}>Register</Link></p>
                            <p>Forgot your password? <Link href="/customer/resetPassword" style={{ color: '#007bff', textDecoration: 'underline' }}>Reset</Link></p>
                        </div>

                    </div>

                </form>

            </div>
        </>
    );
};

export default Login;
