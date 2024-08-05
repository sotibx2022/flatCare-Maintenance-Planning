import React from 'react';
interface DeliveryDetailsProps {
    deliveryDetails: {
        roomNumber: string,
        buildingNumber: string,
        floorNumber: string,
    }
}
const ResponsiveDeliveryDetails: React.FC<DeliveryDetailsProps> = ({ deliveryDetails }) => {
    return (
        <div className="overflow-x-auto border border-gray-300 rounded-md w-[80vw] max-w-[300px]">
            <div className="flex flex-row">
                {/* Header Row */}
                <div className="flex flex-col p-2 border-b border-r border-gray-300">
                    <p className="flex-1 font-bold text-primaryDark">Building #</p>
                    <p className="flex-1 font-bold text-primaryDark">Floor #</p>
                    <p className="flex-1 font-bold text-primaryDark">Room #</p>
                </div>
                {/* Data Row */}
                <div className="flex flex-col p-2 border-b border-gray-300">
                    <p className="flex-1 text-primaryDark">Kalyanpur-{deliveryDetails.buildingNumber}</p>
                    <p className="flex-1 text-primaryDark">Business-{deliveryDetails.floorNumber}</p>
                    <p className="flex-1 text-primaryDark">KingSize-{deliveryDetails.roomNumber}</p>
                </div>
            </div>
        </div>
    )
}
export default ResponsiveDeliveryDetails;
