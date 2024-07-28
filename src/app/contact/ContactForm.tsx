import { faCheckCircle, faPaperPlane, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from "react";
const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        reason: '',
        message: ''
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [id]: value
        }));
    };
    // Handle form submission
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Add form validation and submission logic here
    };
    return (
        <div>
            <div className="contact-form">
                <FontAwesomeIcon icon={faPaperPlane} aria-hidden="true" />
                <form className="form-items" id="form" onSubmit={handleSubmit}>
                    <div className="form-item">
                        <input
                            type="text"
                            id="name"
                            placeholder=" "
                            autoComplete="off"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <span>Name</span>
                        <div id="nameerror" className="error-message"></div>
                        <FontAwesomeIcon icon={faCheckCircle} className="success-icon" id="si1" aria-hidden="true" />
                        <FontAwesomeIcon icon={faTimes} className="error-icon" id="ei1" aria-hidden="true" />
                    </div>
                    <div className="form-item">
                        <input
                            type="text"
                            id="email"
                            placeholder=" "
                            autoComplete="off"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <span>Email</span>
                        <div id="emailerror" className="error-message"></div>
                        <FontAwesomeIcon icon={faCheckCircle} className="success-icon" id="si1" aria-hidden="true" />
                        <FontAwesomeIcon icon={faTimes} className="error-icon" id="ei1" aria-hidden="true" />
                    </div>
                    <div className="form-item">
                        <input
                            type="text"
                            id="subject"
                            placeholder=" "
                            autoComplete="off"
                            value={formData.subject}
                            onChange={handleChange}
                        />
                        <span>Subject</span>
                        <div id="subjecterror" className="error-message"></div>
                        <FontAwesomeIcon icon={faCheckCircle} className="success-icon" id="si1" aria-hidden="true" />
                        <FontAwesomeIcon icon={faTimes} className="error-icon" id="ei1" aria-hidden="true" />
                    </div>
                    <select
                        id="reason"
                        name="reason"
                        autoComplete="off"
                        required
                        value={formData.reason}
                        onChange={handleChange}
                    >
                        <option value="">Select One</option>
                        <option value="To Build Website">To Build Website</option>
                        <option value="To Share Project Ideas">To Share Project Ideas</option>
                        <option value="Any Feedback/Suggestions">Any Feedback/Suggestions</option>
                        <option value="Other Reason">Other Reason</option>
                    </select>
                    <div className="form-item">
                        <textarea
                            rows={5}
                            id="message"
                            placeholder=" "
                            autoComplete="off"
                            value={formData.message}
                            onChange={handleChange}
                        ></textarea>
                        <span>Message</span>
                        <div id="messageerror" className="error-message"></div>
                        <FontAwesomeIcon icon={faCheckCircle} className="success-icon" id="si1" aria-hidden="true" />
                        <FontAwesomeIcon icon={faTimes} className="error-icon" id="ei1" aria-hidden="true" />
                    </div>
                    <input type="submit" value="Submit" id="submit-form" required />
                    <div id="submiterror" className="error-message"></div>
                </form>
            </div>
        </div>
    )
}
export default ContactForm