import React from 'react';
export interface OrderIdentificationProps {
    materialOrderNumber: string;
    createdAt: Date;
    updatedAt: Date;
}
const formatDate = (date: Date) => {
    const validDate = (date instanceof Date) ? date : new Date(date)
    const year = validDate.getFullYear();
    const month = String(validDate.getMonth() + 1).padStart(2, '0');
    const day = String(validDate.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
};
const OrderIdentification: React.FC<OrderIdentificationProps> = ({ materialOrderNumber, createdAt, updatedAt }) => {
    console.log(typeof createdAt, updatedAt)
    return (
        <div>
            <div className='formItems flex flex-col gap-4 md:flex md:flex-row md:justify-between '>
                <div className='form_Item'>
                    <label>Order Req. Num.</label>
                    <input type='text' value={materialOrderNumber.split("-").shift()} readOnly />
                </div>
                <div className='form_Item'>
                    <label>Created On</label>
                    <input type='text' value={formatDate(createdAt)} readOnly />
                </div>
                <div className='form_Item'>
                    <label>Updated On</label>
                    <input type='text' value={formatDate(updatedAt)} readOnly />
                </div>
            </div>
        </div>
    );
};
export default OrderIdentification;
