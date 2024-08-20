import React from 'react';
import { Materials } from '.';
import { truncateText } from '../order/CommonFunctions';
interface MaterialTableProps {
    materials: Materials[];
}
const FullMaterialTable: React.FC<MaterialTableProps> = ({ materials }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th className="p-2 border text-primaryDark text-left">SN</th>
                    <th className="p-2 border text-primaryDark text-left">Material Name</th>
                    <th className="p-2 border text-primaryDark text-left">Material Description</th>
                    <th className="p-2 border text-primaryDark text-left">Quantity</th>
                    <th className="p-2 border text-primaryDark text-left">Unit</th>
                </tr>
            </thead>
            <tbody>
                {materials.map((material, index) => (
                    <tr key={index}>
                        <td className="p-2 border text-primaryDark text-left">{index + 1}</td>
                        <td className="p-2 border text-primaryDark text-left">{material.materialName}</td>
                        <td className="p-2 border text-primaryDark text-left">
                            {truncateText(material.materialDescription, 8)}
                        </td>
                        <td className="p-2 border text-primaryDark text-left">{material.materialQuantity}</td>
                        <td className="p-2 border text-primaryDark text-left">{material.unitOfMeasure}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
export default FullMaterialTable;
