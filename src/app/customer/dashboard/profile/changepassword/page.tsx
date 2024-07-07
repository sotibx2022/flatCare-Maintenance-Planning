"use client"
import React, { useState } from 'react'
import CheckPassword from '../../../../ui/checkPassword/CheckPassword'
import UpdatePassword from '../../../../ui/updatePassword/UpdatePassword';


const page = () => {
  const [checkedPassed, setCheckPassed] = useState(false);
  const receiveSuccessValue = (value: boolean) => {
    setCheckPassed(value)
    console.log(value)
  }
  return (
    <div>
      <section>
        {checkedPassed ? <h1>Check Passed</h1> : <CheckPassword successValue={receiveSuccessValue} />}
        {checkedPassed ? <UpdatePassword /> : <h1>Please Enter Original Password First</h1>}



      </section>

    </div>
  )
}

export default page