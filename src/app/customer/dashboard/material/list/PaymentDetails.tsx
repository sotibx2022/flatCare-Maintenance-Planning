import React from 'react'
const PaymentDetails = () => {
    return (
        <div>
            <div className='form_Item'>
                <label>Card Holder Name</label>
                <input type='text' value="card Holder Name" />
            </div>
            <div className='form_Item'>
                <label>Card Number</label>
                <input type='text' value="card Holder Name" />
            </div>
            <div className='form_Item'>
                <label>Expiry Date</label>
                <input type='text' value="card Holder Name" />
            </div>
            <div className='form_Item'>
                <label>CVV Number</label>
                <input type='text' value="card Holder Name" />
            </div>
        </div>
    )
}
export default PaymentDetails