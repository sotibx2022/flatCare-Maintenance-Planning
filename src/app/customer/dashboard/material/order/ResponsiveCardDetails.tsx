import React from 'react';
interface CardDetailsProps {
    paymentDetails: {
        cardNumber: string,
        cardHolderName: string,
        expiryDate: Date,
        cvvNumber: string,
    }
}
// Format the date as a string
const formatDate = (date: string | Date) => {
    if (typeof date === "string") {
        return date;
    } else if (date instanceof Date) {
        return date.toLocaleString();
    } else {
        return "Invalid Date";
    }
}
const ResponsiveCardDetails: React.FC<CardDetailsProps> = ({ paymentDetails }) => {
    return (
        <div className="overflow-x-auto border border-gray-300 rounded-md w-[80vw] max-w-[300px]">
            <div className="flex flex-row">
                {/* Header Row */}
                <div className="flex flex-col border-r p-2 border-b border-gray-300">
                    <path className="flex-1 font-bold text-primaryDark">Card Number</path>
                    <path className="flex-1 font-bold text-primaryDark">Card Holder Name</path>
                    <path className="flex-1 font-bold text-primaryDark">Expiry Date</path>
                    <path className="flex-1 font-bold text-primaryDark">CVV Number</path>
                </div>
                {/* Data col */}
                <div className="flex flex-col p-2 border-b border-gray-300">
                    <p className="flex-1 text-primaryDark">{paymentDetails.cardNumber}</p>
                    <p className="flex-1 text-primaryDark">{paymentDetails.cardHolderName}</p>
                    <p className="flex-1 text-primaryDark">{formatDate(paymentDetails.expiryDate)}</p>
                    <p className="flex-1 text-primaryDark">{paymentDetails.cvvNumber}</p>
                </div>
            </div>
        </div>
    )
}
export default ResponsiveCardDetails;
