import React from 'react';
import { Materials } from '.';
import { truncateText } from '../order/CommonFunctions';
import FullMaterialTable from './FullMaterialTable';
interface MaterialTableProps {
    materials: Materials[];
}
const MaterialTable: React.FC<MaterialTableProps> = ({ materials }) => {
    return (
        <>
            <div className="mt-4 md:hidden">
                {materials.map((material, index) => {
                    return (
                        <div
                            className="materialTable border border-gray-300 mb-4 p-4 rounded-lg"
                            key={index}
                        >
                            <div className=""> {/* Small devices (mobile layout) */}
                                <div className="flex flex-col justify-between mb-2 border-b-[1px] border-t-[1px] border-primaryDark">
                                    <span className="font-semibold text-primaryDark">SN:</span>
                                    <span className='text-primaryDark'>{index + 1}</span>
                                </div>
                                <div className="flex flex-col justify-between mb-2 border-b-[1px] border-primaryDark">
                                    <span className="font-semibold text-primaryDark">Material Name:</span>
                                    <span className='text-primaryDark'>{material.materialName}</span>
                                </div>
                                <div className="flex flex-col justify-between mb-2 border-b-[1px] border-primaryDark">
                                    <span className="font-semibold text-primaryDark">Material Description:</span>
                                    <span className='text-primaryDark'>{truncateText(material.materialDescription, 8)}</span>
                                </div>
                                <div className="flex flex-col justify-between mb-2 border-b-[1px] border-primaryDark">
                                    <span className="font-semibold text-primaryDark">Quantity:</span>
                                    <span className='text-primaryDark'>{material.materialQuantity}</span>
                                </div>
                                <div className="flex flex-col justify-between mb-2 border-b-[1px] border-primaryDark">
                                    <span className="font-semibold text-primaryDark">Unit:</span>
                                    <span className='text-primaryDark'>{material.unitOfMeasure}</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className='sm:hidden md:table w-full'>
                <FullMaterialTable materials={materials} />
            </div>
        </>
    );
};
export default MaterialTable;
