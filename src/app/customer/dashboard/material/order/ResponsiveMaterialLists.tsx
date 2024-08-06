import React from 'react'
import { MaterialDetailsData } from '.'
import { truncateText } from './CommonFunctions'
interface MaterialListsProps {
    materials: MaterialDetailsData[]
}
const ResponsiveMaterialList: React.FC<MaterialListsProps> = ({ materials }) => {
    return (
        <div className="border border-gray-300 rounded-md w-[80vw] max-w-[300px]">
            {materials.slice(1).map((material: MaterialDetailsData, index: number) => (
                <div className="flex flex-row">
                    <div className="flex flex-col gap-2 border  text-primaryLight p-2 border-b border-gray-300">
                        <p className="w-24 font-bold text-primaryLight">SN</p>
                        <p className="w-24 font-bold text-primaryLight">Name</p>
                        <p className="w-24 font-bold text-primaryLight">Description</p>
                        <p className="w-24 font-bold text-primaryLight">Quantity</p>
                        <p className="w-24 font-bold text-primaryLight">Unit</p>
                    </div>
                    <div key={index} className="flex flex-col p-2 border-b border-gray-300">
                        <p className="w-24 text-primaryLight">{index + 1}</p>
                        <p className="w-24 text-primaryLight">{material.materialName}</p>
                        <p className="w-24 text-primaryLight">{truncateText(material.materialDescription, 30)}</p>
                        <p className="w-24 text-primaryLight">{material.materialQuantity}</p>
                        <p className="w-24 text-primaryLight">{material.unitOfMeasure}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}
export default ResponsiveMaterialList
