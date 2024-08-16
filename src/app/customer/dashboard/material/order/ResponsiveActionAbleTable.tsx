import React, { useState } from 'react';
import { MaterialDetailsData } from '.';
import { truncateText } from './CommonFunctions';
import { useDispatch, useSelector } from 'react-redux';
import { removeMaterial } from '../../../../../Redux/formSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
interface ActionMaterialTableProps {
    setEditIndex: (value: number) => void;
    setEditForm: (value: boolean) => void;
    setEditValue: (value: boolean) => void;
}
const ResponsiveActionAbleTable: React.FC<ActionMaterialTableProps> = ({ setEditIndex, setEditForm, setEditValue }) => {
    const materials = useSelector((state: any) => state.form.materials);
    const dispatch = useDispatch();
    const handleRemoveMaterial = (index: number) => {
        dispatch(removeMaterial({ data: index }));
    };
    const editHandler = (index: number) => {
        setEditForm(true);
        setEditIndex(index);
        setEditValue(true);
    };
    const viewHandler = (index: number) => {
        setEditForm(true);
        setEditIndex(index);
        setEditValue(false);
    };
    const sendIndicator = (value: boolean) => {
        setEditForm(value);
    };
    return (
        <div className="p-4 w-[80vw] max-w-[600px] mt-4">
            {materials.length > 1 && (
                <div>
                    {materials.slice(1).map((material: MaterialDetailsData, index: number) => (
                        <div key={index} className="flex  py-2 flex-row  border-b-2 border-helper border-dotted">
                            <div className="flex flex-col font-bold pb-2">
                                <p className='flex-1  p-2 text-primaryDark'>SN</p>
                                <p className='flex-2 p-2  text-primaryDark'>Material Name</p>
                                <p className='flex-1  p-2 text-primaryDark'>Quantity</p>
                                <p className='flex-1  p-2 text-primaryDark'>Unit</p>
                                <p className='flex-1 p-2'>Actions</p>
                            </div>
                            <div className="contentWrapper flex-col">
                                <p className='flex-1  p-2 text-primaryDark'>{index + 1}</p>
                                <p className='flex-2 p-2 '>{material.materialName}</p>
                                <p className='flex-1  p-2 text-primaryDark'>{material.materialQuantity}</p>
                                <p className='flex-1  p-2 text-primaryDark'>{material.unitOfMeasure}</p>
                                <div className='flex-1 p-2 flex justify-start gap-2 items-center '>
                                    <span onClick={() => handleRemoveMaterial(index)} title="Remove" className='text-red-400 cursor-pointer'>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </span>
                                    <span onClick={() => viewHandler(index)} title="View" className='text-green-400 cursor-pointer'>
                                        <FontAwesomeIcon icon={faEye} />
                                    </span>
                                    <span onClick={() => editHandler(index)} title="Edit" className='text-blue-400 cursor-pointer'>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
export default ResponsiveActionAbleTable;
