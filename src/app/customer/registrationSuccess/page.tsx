"use client"
import { useSearchParams } from 'next/navigation';
import "../registrationSuccess/registrationSuccess.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
const page: React.FC = () => {
    const searchParams = useSearchParams()
    const name = searchParams.get("name");
    const email = searchParams.get("email");
    return (
        <div className="registration-success-container">
            <h1 className="registration-success-title">
                <span className="success-icon">
                    <FontAwesomeIcon icon={faCheckCircle} style={{ marginRight: '10px' }} />
                </span>
                Registration Successful!
            </h1>
            <p className="registration-success-message">
                Hello <strong>{name}</strong>, your account with email <strong>{email}</strong> has been created.
                Please verify your email to access the dashboard.
            </p>
            <p className="registration-success-instruction">
                Note : Your Verification Token will expire in 30 Minutes.
            </p>
            <Link href="/customer/resendValidation">Resend Validation Link</Link>
        </div>
    );
};
export default page;
