"use client"
import React, { useState } from 'react'
import CheckPassword from '../../../../ui/checkPassword/CheckPassword'
import UpdatePassword from '../../../../ui/updatePassword/UpdatePassword';
import SubmitSuccess from '../../../../ui/submitSuccess';


const page = () => {
  const [checkedPassed, setCheckPassed] = useState(false);
  const receiveSuccessValue = (value: boolean) => {
    setCheckPassed(value)
    console.log(value)
  }
  return (
    <div>
      <section className='form_container'>
        {checkedPassed ? <SubmitSuccess message="Original Password Validated ! Please Enter New Password" /> : <CheckPassword successValue={receiveSuccessValue} />}
        {checkedPassed ? <UpdatePassword /> : <h1>Please Enter Original Password First</h1>}



      </section>

    </div>
  )
}

export default page