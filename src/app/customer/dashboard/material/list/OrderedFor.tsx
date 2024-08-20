import React from 'react';
import { OrderedForData } from '../order';
interface OrderedForProps {
    orderedFor: OrderedForData;
}
const OrderedFor: React.FC<OrderedForProps> = ({ orderedFor }) => {
    return (
        <div className='md:flex justify-between gap-4'>
            <div className='form_Item'>
                <label>Recipient Name</label>
                <input type='text' value={orderedFor.receipentName} readOnly />
            </div>
            <div className='form_Item'>
                <label>Recipient Email</label>
                <input type='text' value={orderedFor.receipentEmail} readOnly />
            </div>
            <div className='form_Item'>
                <label>Recipient Phone</label>
                <input type='text' value={orderedFor.receipentPhone.toString()} readOnly />
            </div>
        </div>
    );
};
export default OrderedFor;
