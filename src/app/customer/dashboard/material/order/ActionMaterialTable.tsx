import React, { useState } from 'react'
import { MaterialDetailsData } from '.';
import { truncateText } from './CommonFunctions';
import { useDispatch, useSelector } from 'react-redux';
import { removeMaterial } from '../../../../../Redux/formSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Materials } from '../list';
interface ActionMaterialTableProps {
    setEditIndex: (value: number) => void;
    setEditForm: (value: boolean) => void;
    setEditValue: (value: boolean) => void;
}
const ActionMaterialTable: React.FC<ActionMaterialTableProps> = ({ setEditIndex, setEditForm, setEditValue }) => {
    const materials = useSelector((state: any) => state.form.materials)
    const dispatch = useDispatch()
    const handleRemoveMaterial = (index: number) => {
        dispatch(removeMaterial({ data: index }))
    }
    const editHandler = (index: number) => {
        setEditForm(true)
        setEditIndex(index)
        setEditValue(true)
    }
    const viewHandler = (index: number) => {
        setEditForm(true);
        setEditIndex(index);
        setEditValue(false);
    }
    return (
        <div className='mt-4'>
            {materials.length > 1 && (
                <table className='materialTable'>
                    <thead>
                        <tr>
                            <th className='tdSmailContainer'>SN</th>
                            <th>Material Name</th>
                            <th>Material Description</th>
                            <th className='tdSmailContainer'>Quantity</th>
                            <th className='tdSmailContainer'>Unit</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {materials.splice(0).map((material: MaterialDetailsData, index: number) => (
                            <tr key={index}>
                                <td className='tdSmailContainer'>{index + 1}</td>
                                <td>{material.materialName}</td>
                                <td>{truncateText(material.materialDescription, 8)}</td>
                                <td className='tdSmailContainer'>{material.materialQuantity}</td>
                                <td className='tdSmailContainer'>{material.unitOfMeasure}</td>
                                <td className='flex justify-between items-center gap-1 h-full'>
                                    <span onClick={() => handleRemoveMaterial(index)} title="Remove" className='text-red-400 cursor-pointer'>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </span>
                                    <span onClick={() => viewHandler(index)} title="View" className='text-green-400 cursor-pointer'>
                                        <FontAwesomeIcon icon={faEye} />
                                    </span>
                                    <span onClick={() => editHandler(index)} title="Edit" className='text-blue-400 cursor-pointer'>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}
export default ActionMaterialTable