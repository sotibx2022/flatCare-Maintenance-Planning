import React from 'react';
import { OrderedForData } from '.';
interface OrderedForProps {
    orderedFor: {
        receipentName: string,
        receipentEmail: string,
        receipentPhone: number,
    }
}
const OrderedFor: React.FC<OrderedForProps> = ({ orderedFor }) => {
    return (
        <div>
            <table className="materialTable">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{orderedFor.receipentName}</td>
                        <td>{orderedFor.receipentEmail}</td>
                        <td>{orderedFor.receipentPhone}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
export default OrderedFor