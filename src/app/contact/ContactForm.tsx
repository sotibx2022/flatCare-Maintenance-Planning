"use client";
import { faCheckCircle, faPaperPlane, faTimes } from '@fortawesome/free-solid-svg-icons';
import emailjs from '@emailjs/browser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from "react";
import { useForm } from 'react-hook-form';
import SubmitError from '../ui/SubmitError';
import { toast } from 'react-toastify';
import axios from 'axios';
import LoadingButton from '../landingpage/homeNavigation/LoadingButton';
const optionsArray = [
    'Maintenance Services',
    'Service Request',
    'Schedule a Visit',
    'Feedback/Suggestions',
    'Other Reason'
];
interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
    reason: string;
}
const ContactForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [loading, setLoading] = useState(false)
    const contactForm = useRef<HTMLFormElement>(null); // Typed ref
    // Validate word count
    const validateWordCount = (value: string, minWords: number) => {
        if (value.trim().split(/\s+/).length < minWords) { // Split on any whitespace
            return `Minimum ${minWords} words are required`;
        } else {
            return true;
        }
    };
    // Handle form submission
    const onSubmit = async (formDatas: FormData) => {
        try {
            setLoading(true)
            const response = await axios.post("api/common/sendEmail", { formDatas });
            const result = response.data;
            if (result.success) {
                if (contactForm.current) {
                    //send Email to the Admin
                    emailjs.sendForm("service_mx67b0s", "template_3z3a6qp", contactForm.current, "TkO6wP16iwEsiTJjT").then(() => {
                        console.log("Email Submitted to the Admin")
                    }).catch((error: Error) => {
                        console.log("There is something wrong to send email to the Admin")
                    })
                    //Reply Email to the Customer
                    emailjs.sendForm("service_mx67b0s", "template_89lqelo", contactForm.current, "TkO6wP16iwEsiTJjT").then(() => {
                        console.log("Email auto Replied to the Customer")
                    }).catch((error: Error) => {
                        console.log("Error to send Auto Reply to the Customer")
                    })
                } else {
                    console.log("There is something wrong to send Email")
                }
                setLoading(false)
                contactForm.current && contactForm.current.reset();
                toast.success(result.message)
            } else {
                setLoading(false);
                toast.error(result.message)
            }
        } catch (error) {
            if (error instanceof Error) {
                throw new Error("There is someThing wrong", error)
            } else {
                throw new Error("Unknown Error Occured.")
            }
        }
    };
    return (
        <div>
            <div className="contact-form">
                <FontAwesomeIcon icon={faPaperPlane} aria-hidden="true" />
                <form className="form-items" onSubmit={handleSubmit(onSubmit)} ref={contactForm} noValidate>
                    <div className="form-item">
                        <input
                            type="text"
                            id="name"
                            placeholder=" "
                            autoComplete="off"
                            {...register("name", {
                                required: {
                                    value: true,
                                    message: "Name field is required."
                                },
                                pattern: {
                                    value: /^(?:[A-Za-z]{2,}\s){1,4}[A-Za-z]{2,}$/,
                                    message: "Minimum Two Words required. Only characters are allowed"
                                }
                            })}
                        />
                        <span>Name</span>
                        {errors.name?.message && <SubmitError message={errors.name.message} />}
                    </div>
                    <div className="form-item">
                        <input
                            type="text"
                            id="email"
                            placeholder=" "
                            autoComplete="off"
                            {...register("email", {
                                required: {
                                    value: true,
                                    message: "Email field is required."
                                },
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Invalid email format."
                                }
                            })}
                        />
                        <span>Email</span>
                        {errors.email?.message && <SubmitError message={errors.email.message} />}
                    </div>
                    <div className="form-item">
                        <input
                            type="text"
                            id="subject"
                            placeholder=" "
                            autoComplete="off"
                            {...register("subject", {
                                required: {
                                    value: true,
                                    message: "Subject field is required."
                                },
                                validate: (value) => validateWordCount(value, 5)
                            })}
                        />
                        <span>Subject</span>
                        {errors.subject?.message && <SubmitError message={errors.subject.message} />}
                    </div>
                    <select
                        id="reason"
                        autoComplete="off"
                        required
                        className='contactForm-select'
                        {...register("reason", {
                            required: {
                                value: true,
                                message: "Please select at least one reason."
                            }
                        })}
                    >
                        <option value="">Select One</option>
                        {optionsArray.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    {errors.reason?.message && <SubmitError message={errors.reason.message} />}
                    <div className="form-item">
                        <textarea
                            rows={5}
                            id="message"
                            placeholder=" "
                            autoComplete="off"
                            className="contactForm-textarea"
                            {...register("message", {
                                required: {
                                    value: true,
                                    message: "Message field is required."
                                },
                                validate: (value) => validateWordCount(value, 10)
                            })}
                        />
                        <span>Message</span>
                        {errors.message?.message && <SubmitError message={errors.message.message} />}
                    </div>
                    <button type="submit" disabled={loading}>{loading ? <LoadingButton /> : "Submit"}</button>
                </form>
            </div>
        </div>
    );
};
export default ContactForm;
