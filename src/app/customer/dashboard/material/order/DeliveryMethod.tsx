import React from 'react';
interface DeliveryMethodProps {
    deliveryMethod: string | { deliveryOption: string }; // Use union type `|` instead of `||`
}
const DeliveryMethod: React.FC<DeliveryMethodProps> = ({ deliveryMethod }) => {
    // Determine if `deliveryMethod` is a string or an object with `deliveryOption`
    const method = typeof deliveryMethod === 'string' ? deliveryMethod : deliveryMethod.deliveryOption;
    return (
        <div>
            <div className="deliveryMethodsWrapper flex flex-col max-w-[50vw] md:flex-row">
                <p className={method === 'paymentOnDelivery' ? 'activeDeliveryOption' : 'normalDeliveryOption'}>
                    Payment On Delivery
                </p>
                <p className={method === 'pickupFromStore' ? 'activeDeliveryOption' : 'normalDeliveryOption'}>
                    Pickup From Store
                </p>
                <p className={method === 'debitCard' ? 'activeDeliveryOption' : 'normalDeliveryOption'}>
                    Debit Card
                </p>
            </div>
        </div>
    );
};
export default DeliveryMethod;
