import React from 'react';
interface OrderedByProps {
    orderedBy: {
        orderedByName: string,
        orderedByEmail: string,
        orderedByPhone: string,
    }
}
const OrderedBy: React.FC<OrderedByProps> = ({ orderedBy }) => {
    const { orderedByName, orderedByEmail, orderedByPhone } = orderedBy;
    return (
        <div className='md:flex md:justify-between md:gap-4'>
            <div className='form_Item'>
                <label>Ordered By Name</label>
                <input type='text' value={orderedByName} readOnly />
            </div>
            <div className='form_Item'>
                <label>Ordered By Email</label>
                <input type='text' value={orderedByEmail} readOnly />
            </div>
            <div className='form_Item'>
                <label>Ordered By Phone</label>
                <input type='text' value={orderedByPhone} readOnly />
            </div>
        </div>
    )
}
export default OrderedBy