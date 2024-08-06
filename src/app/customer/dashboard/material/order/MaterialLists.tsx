import React from 'react'
import { MaterialDetailsData } from '.'
import { truncateText } from './CommonFunctions'
interface MaterialListsProps {
    materials: [MaterialDetailsData]
}
const MaterialLists: React.FC<MaterialListsProps> = ({ materials }) => {
    return (
        <div>
            <table className='materialTable'>
                <thead>
                    <tr>
                        <th className='tdSmailContainer'>SN</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th className='tdSmailContainer'>Quantity</th>
                        <th className='tdSmailContainer'>Unit</th>
                    </tr>
                </thead>
                <tbody>
                    {materials.slice(1).map((material: MaterialDetailsData, index: number) => (
                        <tr key={index}>
                            <td className='tdSmailContainer'>{index + 1}</td>
                            <td>{material.materialName}</td>
                            <td>{truncateText(material.materialDescription, 6)}</td>
                            <td className='tdSmailContainer'>{material.materialQuantity}</td>
                            <td className='tdSmailContainer'>{material.unitOfMeasure}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default MaterialLists