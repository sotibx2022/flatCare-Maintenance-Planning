"use client"
import React, { useState } from 'react'
import SingleMaterial from './SingleMaterial';
import AddMaterial from './AddMaterial';
import { useDispatch, useSelector } from 'react-redux';
import { setNextValue } from '../../../../../Redux/formSlice';
const MaterialDetailsForm = () => {
    const materials = useSelector((state: any) => state.form.materials);
    const dispatch = useDispatch()
    const [showAddMaterialForm, setshowAddMaterialForm] = useState(false)
    const handleNext = () => {
        dispatch(setNextValue({ data: 2 }))
    }
    const sendIndicator = (value: boolean) => {
        setshowAddMaterialForm(value)
    }
    return (
        <>
            {materials.length > 1 ? <SingleMaterial /> : <AddMaterial setshowAddMaterialForm={sendIndicator} />}
            <button onClick={() => setshowAddMaterialForm(true)}>Add Material</button>
            {showAddMaterialForm && <AddMaterial setshowAddMaterialForm={sendIndicator} />}
            <button onClick={handleNext}>Next</button>
        </>
    )
}
export default MaterialDetailsForm