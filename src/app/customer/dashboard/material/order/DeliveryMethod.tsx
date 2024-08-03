import React from 'react'
interface DeliveryMethodProps {
    deliveryMethod: string
}
const DeliveryMethod: React.FC<DeliveryMethodProps> = ({ deliveryMethod }) => {
    return (
        <div>
            <div className="methodsWrapper flex justify-between gap-2 flex-col md:flex-row">
                <p className={deliveryMethod === "paymentOnDelivery" ? "activeDeliveryOption" : "normalDeliveryOption"}>payment On Delivery</p>
                <p className={deliveryMethod === "pickupFromStore" ? "activeDeliveryOption" : "normalDeliveryOption"}>pickup From Store</p>
                <p className={deliveryMethod === "debitCard" ? "activeDeliveryOption" : "normalDeliveryOption"}>debit Card</p>
            </div>
        </div>
    )
}
export default DeliveryMethod