import React from 'react';
interface OrderedByInterface {
    orderedBy: {
        orderedByName: string,
        orderedByPhone: number,
        orderedByEmail: string,
    }
}
const ResponsiveOrderBy: React.FC<OrderedByInterface> = ({ orderedBy }) => {
    return (
        <div className="overflow-x-auto border border-gray-300 rounded-md w-[80vw] max-w-[300px]">
            <div className="flex flex-row">
                {/* Header Row */}
                <div className="flex flex-col border-r-2 border-bottom-2 border-gray-300 p-2 ">
                    <p className="flex-1 font-bold text-primaryDark">Name</p>
                    <p className="flex-1 font-bold text-primaryDark">Email</p>
                    <p className="flex-1 font-bold text-primaryDark">Phone</p>
                </div>
                {/* Data Row */}
                <div className="flex flex-col p-2 border-b border-gray-300">
                    <p className="flex-1 text-primaryDark">{orderedBy.orderedByName}</p>
                    <p className="flex-1 text-primaryDark">{orderedBy.orderedByEmail}</p>
                    <p className="flex-1 text-primaryDark">{orderedBy.orderedByPhone}</p>
                </div>
            </div>
        </div>
    )
}
export default ResponsiveOrderBy;
