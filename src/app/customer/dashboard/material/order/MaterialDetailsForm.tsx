"use client"
import React, { useState } from 'react'
import SingleMaterial from './SingleMaterial';
import AddMaterial from './AddMaterial';
import { useDispatch, useSelector } from 'react-redux';
import { setNextValue } from '../../../../../Redux/formSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
const MaterialDetailsForm = () => {
    const materials = useSelector((state: any) => state.form.materials);
    const dispatch = useDispatch()
    const [showAddMaterialForm, setshowAddMaterialForm] = useState(false)
    const handleNext = () => {
        if (materials.length <= 1) {
            toast.error("Please add at least one material before moving to the next step.");
        } else {
            dispatch(setNextValue({ data: 2 }));
        }
    };
    const sendIndicator = (value: boolean) => {
        setshowAddMaterialForm(value)
    }
    return (
        <div className='w-[80vw] max-w-[500px]'>
            {materials.length > 1 ? <SingleMaterial setshowAddMaterialForm={sendIndicator} /> : <AddMaterial setshowAddMaterialForm={sendIndicator} />}
            {showAddMaterialForm && <AddMaterial setshowAddMaterialForm={sendIndicator} />}
            <button onClick={handleNext} className='ml-auto '>
                <FontAwesomeIcon icon={faArrowRight} />
            </button>
        </div>
    )
}
export default MaterialDetailsForm