"use client"
import React, { useState } from 'react'
import CheckEmail from '../../ui/checkEmail/CheckEmail'
import UpdatePassword from '../../ui/updatePassword/UpdatePassword'
import SubmitSuccess from '../../ui/submitSuccess'
const page = () => {
  const [successValue, setSuccessValue] = useState(false)
  const [email, setEmail] = useState("")
  const handleReceiveValue = (data: { success: boolean, email: string }) => {
    setSuccessValue(data.success);
    setEmail(data.email)
  }
  return (
    <div>
      {successValue && <SubmitSuccess message="Email Check Passed ! Please Enter New Password" />}
      {successValue ? <UpdatePassword email={email} /> : <CheckEmail successValue={handleReceiveValue} />}
    </div>
  )
}
export default page