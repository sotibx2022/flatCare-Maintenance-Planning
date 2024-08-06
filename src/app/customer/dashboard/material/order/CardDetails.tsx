const formatDate = (date: string | Date) => {
    if (typeof date === "string") {
        return date;
    } else if (date instanceof Date) {
        return date.toLocaleString()
    } else {
        return "Invalid Date"
    }
}
import React from 'react';
interface CardDetailsProps {
    paymentDetails: {
        cardNumber: string,
        cardHolderName: string,
        expiryDate: Date,
        cvvNumber: string,
    }
}
const CardDetails: React.FC<CardDetailsProps> = ({ paymentDetails }) => {
    return (
        <div>
            <table className="materialTable">
                <thead>
                    <tr>
                        <th>Card Number</th>
                        <th>Card Holder Name</th>
                        <th>Expiry Date</th>
                        <th>CVV Number</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{paymentDetails.cardNumber}</td>
                        <td>{paymentDetails.cardHolderName}</td>
                        <td>{formatDate(paymentDetails.expiryDate)}</td>
                        <td>{paymentDetails.cvvNumber}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
export default CardDetails