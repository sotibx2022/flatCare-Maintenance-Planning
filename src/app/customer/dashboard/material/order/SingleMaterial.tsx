"use client"
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeMaterial } from '../../../../../Redux/formSlice'
import { MaterialDetailsData } from '.';
import EditMaterial from './EditMaterial';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faPlus, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { truncateText } from './CommonFunctions';
interface SingleMaterialProps {
    setshowAddMaterialForm: (value: boolean) => void;
}
const SingleMaterial: React.FC<SingleMaterialProps> = ({ setshowAddMaterialForm }) => {
    const materials = useSelector((state: any) => state.form.materials)
    const dispatch = useDispatch()
    const [editForm, setEditForm] = useState(false);
    const [editValue, setEditValue] = useState(false);
    const [editIndex, setEditIndex] = useState<number>(0)
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
    const sendIndicator = (value: boolean) => {
        setEditForm(value)
    }
    if (editForm) {
        return <EditMaterial index={editIndex} setEditForm={sendIndicator} edit={editValue} />
    } else {
        return (
            <div className='materialTableContainer'>
                <div className='materialTableTitle flex justify-between items-center'>
                    <h1 className='secondary_heading'>List Of Materials.</h1>
                    <button type="submit" onClick={() => setshowAddMaterialForm(true)} className='flex justify-start px-1 py-0 m-0'>
                        <FontAwesomeIcon icon={faPlusCircle} className='mr-1' /> Add Material
                    </button>
                </div>
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
                            {materials.slice(1).map((material: MaterialDetailsData, index: number) => (
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
}
export default SingleMaterial