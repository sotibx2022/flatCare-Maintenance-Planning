'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEye,
    faEyeSlash,
    faLock,
} from '@fortawesome/free-solid-svg-icons';
import "../../globals.css";
import SubmitError from '../../ui/SubmitError';
type FormData = {
    email: string;
    password: string;
};
const Login = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isSubmitted },
    } = useForm<FormData>();
    const onSubmit: SubmitHandler<FormData> = async (data) => {
        console.log(data);
    };
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="center_container">
                <div className="form_container">
                    <h1 className="primary_heading">Planner Login</h1>
                    <div className="form_Item">
                        <label>Email</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type="email"
                                placeholder="Email"
                                id="email"
                                {...register('email', { required: 'Email is required' })}
                                style={{ paddingLeft: '30px' }}
                            />
                            <FontAwesomeIcon
                                icon={faLock}
                                style={{
                                    position: 'absolute',
                                    left: '10px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: '#29030d',
                                }}
                            />
                        </div>
                        {errors.email?.message && (
                            <SubmitError message={errors.email?.message} />
                        )}
                    </div>
                    <div className="form_Item">
                        <label>Password</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                id="password"
                                {...register('password', { required: 'Password is required' })}
                                style={{ paddingLeft: '30px' }}
                            />
                            <FontAwesomeIcon
                                icon={faLock}
                                style={{
                                    position: 'absolute',
                                    left: '10px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: '#29030d',
                                }}
                            />
                            {showPassword ? (
                                <FontAwesomeIcon
                                    icon={faEyeSlash}
                                    onClick={() => setShowPassword(false)}
                                    style={{
                                        position: 'absolute',
                                        right: '10px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: '#29030d',
                                        cursor: 'pointer',
                                    }}
                                />
                            ) : (
                                <FontAwesomeIcon
                                    icon={faEye}
                                    style={{
                                        position: 'absolute',
                                        right: '10px',
                                        transform: 'translateY(-50%)',
                                        top: '50%',
                                        color: '#29030d',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => setShowPassword(true)}
                                />
                            )}
                        </div>
                        {errors.email?.message && (
                            <SubmitError message={errors.email?.message} />
                        )}
                    </div>
                    <button type="submit">
                        {isSubmitting ? 'Submitting' : 'Submit'}
                    </button>
                    <SubmitError message="Please Contact Your Admin For Credentials" />
                </div>
            </form>
        </>
    );
};
export default Login;
