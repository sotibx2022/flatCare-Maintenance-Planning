import React from 'react';
import { DeliveryDetailsData } from '../order';
interface DeliveryDetailsProps {
    deliveryDetails: DeliveryDetailsData
}
const DeliveryDetails: React.FC<DeliveryDetailsProps> = ({ deliveryDetails }) => {
    return (
        <div className='md:flex md:justify-between md:gap-4'>
            <div className='form_Item'>
                <label>Building Number </label>
                <input type='text' value={`Kalyanpur-${deliveryDetails.buildingNumber}`} readOnly />
            </div>
            <div className='form_Item'>
                <label>Floor Number </label>
                <input type='text' value={`Business-${deliveryDetails.floorNumber}`} readOnly />
            </div>
            <div className='form_Item'>
                <label>Room Number </label>
                <input type='text' value={`KingSize-${deliveryDetails.roomNumber}`} readOnly />
            </div>
        </div>
    )
}
export default DeliveryDetails