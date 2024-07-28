import React from 'react';
const RequestDemo = () => {
    return (
        <div>
            <div className="requestDemo">
                <h1 className='primary_heading'>Get Your Entire Team On the Same Page !!</h1>
                <div className='input_item'>
                    <input type="text" id="email" placeholder='eg. sbinayaraj@gmail.com' />
                    <label htmlFor='email'>Request For Demo</label>
                </div>
                <label>
                    <input type="checkbox" name="data_processing_agreement" />
                    By submitting this form, you agree to the processing of your personal data by Flatcare Maintenance Planning.
                </label>
                <button>Submit</button>
            </div>
        </div>
    );
};
export default RequestDemo;
