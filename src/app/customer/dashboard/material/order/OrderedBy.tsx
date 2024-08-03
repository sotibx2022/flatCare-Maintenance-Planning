import React from 'react';
interface OrderedByInterface {
    orderedBy: {
        orderedByName: string,
        orderedByPhone: number,
        orderedByEmail: string,
    }
}
const OrderedBy: React.FC<OrderedByInterface> = ({ orderedBy }) => {
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
                        <td>{orderedBy.orderedByName}</td>
                        <td>{orderedBy.orderedByEmail}</td>
                        <td>{orderedBy.orderedByPhone}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
export default OrderedBy