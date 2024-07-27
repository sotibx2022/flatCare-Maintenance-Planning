import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import Link from 'next/link';
const page = () => {
  return (
    <div className="loginFormContainer">
      <form className="center_container">
        <div className="form_container">
          <h1 className="primary_heading">Customer Login</h1>
          <div className="form_Item">
            <label htmlFor="email">Email</label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                placeholder="Email"
                id="email"
              />
              <FontAwesomeIcon icon={faLock} className="input_icon_left" />
            </div>
          </div>
          <div className="form_Item">
            <label htmlFor="password">Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type='text'
                placeholder="Password"
                id="password"
              />
              <FontAwesomeIcon icon={faLock} className="input_icon_left" />
            </div>
          </div>
          <button type="submit">
          </button>
          <div style={{ marginTop: '20px' }}>
            <p className="secondary_heading">
              Account not created?{' '}
              <Link href="/customer/signup" className="link_style">
                Register
              </Link>
            </p>
            <p className="secondary_heading">
              Forgot your password?{' '}
              <Link href="/customer/forgetPassword" className="link_style">
                Reset
              </Link>
            </p>
            <p className="secondary_heading">
              Not Verified Yet?{' '}
              <Link href="/customer/resendValidation" className="link_style">
                Verify
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  )
}
export default page