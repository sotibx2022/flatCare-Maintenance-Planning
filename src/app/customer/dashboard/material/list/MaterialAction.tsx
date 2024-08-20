import React from 'react'
const MaterialAction = () => {
    return (
        <div>
            <div className=''>
                <h1>Delete/Edit Material</h1>
                <p>This Order Details already sent to the Planners WorkFlow. You cann't delete this order.
                    Please Contact Planner if you want to modify.
                </p>
                <div className='form_item'>
                    <label>Order Modification Edit</label>
                    <textarea placeholder='Please Explain what changes you want to perform to this order so that planner will take the action accordingly.'></textarea>
                    <button>Submit</button>
                    <button>Cancle</button>
                </div>
            </div>
        </div>
    )
}
export default MaterialAction