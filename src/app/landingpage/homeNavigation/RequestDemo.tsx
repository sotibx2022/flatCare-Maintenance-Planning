"use client"
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import SubmitError from '../../ui/SubmitError';
import SubmitSuccess from '../../ui/submitSuccess';
import axios from 'axios';
import LoadingButton from './LoadingButton';
const RequestDemo = () => {
    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState("")
    const [checked, setChecked] = useState(false);
    const [successMessage, setSuccessMessage] = useState("")
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const validateInputs = (email: string, checked: boolean) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!email || email.trim().length === 0) {
            setEmailError("Email Field is Required!");
            setTimeout(clearMessages, 5000);
            return false;
        } else if (!emailRegex.test(email)) {
            setEmailError("Please Enter a Valid Email Address!");
            setTimeout(clearMessages, 5000);
            return false;
        } else if (!checked) {
            setEmailError("You Should Agree to the Processing of Your Personal Data.");
            setTimeout(clearMessages, 5000);
            return false;
        } else {
            setEmailError("");
            setTimeout(clearMessages, 5000);
            return true;
        }
    };
    const clearMessages = () => {
        setSuccessMessage("");
        setEmailError("")
    }
    const resetForm = () => {
        setEmail("")
        setChecked(false)
    }
    const submitHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const success = validateInputs(email, checked);
        setSubmitted(true);
        if (success) {
            setLoading(true);
            const response = await axios.post("/api/common/requestDemo", { email });
            const result = response.data;
            if (result.success) {
                toast.success(result.message)
                setSuccessMessage(result.message)
                setLoading(false);
            } else {
                setLoading(false);
                toast.error(result.message)
                setEmailError(result.message);
            }
            setTimeout(resetForm, 5000)
        } else {
            toast.error("Please correct the errors before Submitting again.");
            setEmailError("Please correct the errors before Submitting again.")
            setTimeout(resetForm, 5000)
        }
    }
    return (
        <div>
            <div className="requestDemo">
                <h1 className='primary_heading'>Get Your Entire Team On the Same Page !!</h1>
                <div className='input_item'>
                    <input type="text" id="email" placeholder='eg. sbinayaraj@gmail.com' value={email} onChange={(E) => { setEmail(E.target.value) }} />
                    <label htmlFor='email'>Request For Demo</label>
                </div>
                <label>
                    <input type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
                    By submitting this form, you agree to the processing of your personal data by Flatcare Maintenance Planning.
                </label>
                <button onClick={submitHandler} disabled={loading}>
                    {loading ? <LoadingButton /> : "Submit"}
                </button>
                {submitted && emailError && <SubmitError message={emailError} />}
                {successMessage && submitted && <SubmitSuccess message={successMessage} />}
            </div>
        </div>
    );
};
export default RequestDemo;
