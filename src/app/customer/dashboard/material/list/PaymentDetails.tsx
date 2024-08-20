import React from 'react';
import { PaymentDetailsData } from '../order';
import { formatDate } from '../order/CommonFunctions';
interface DeliveryMethodProps {
    paymentDetails: PaymentDetailsData;
}
const DeliveryMethod: React.FC<DeliveryMethodProps> = ({ paymentDetails }) => {
    return (
        <div className='md:flex md:justify-between md:gap-4'>
            <div className="form_Item">
                <label>Card Number</label>
                <input type="text" value={paymentDetails.cardNumber} readOnly />
            </div>
            <div className="form_Item">
                <label>Card Holder Name</label>
                <input type="text" value={paymentDetails.cardHolderName} readOnly />
            </div>
            <div className="form_Item">
                <label>Expiry Date</label>
                <input type="text" value={formatDate(paymentDetails.expiryDate).split("T")[0]} readOnly />
            </div>
            <div className="form_Item">
                <label>CVV Number</label>
                <input type="text" value={paymentDetails.cvvNumber} readOnly />
            </div>
        </div>
    );
};
export default DeliveryMethod;
