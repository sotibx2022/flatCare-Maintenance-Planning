import React from 'react';
interface DeliveryDetailsProps {
    deliveryDetails: {
        roomNumber: string,
        buildingNumber: string,
        floorNumber: String,
    }
}
const DeliveryDetails: React.FC<DeliveryDetailsProps> = ({ deliveryDetails }) => {
    return (
        <div>
            <table className="materialTable">
                <thead>
                    <tr>
                        <th>Building #</th>
                        <th>Floor #</th>
                        <th>Room #</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Kalyanpur-{deliveryDetails.buildingNumber}</td>
                        <td>Business-{deliveryDetails.floorNumber}</td>
                        <td>KingSize-{deliveryDetails.roomNumber}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
export default DeliveryDetails