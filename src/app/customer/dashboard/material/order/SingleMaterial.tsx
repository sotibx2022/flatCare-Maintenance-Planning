"use client"
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeMaterial } from '../../../../../Redux/formSlice'
import { MaterialDetailsData } from '.';
import EditMaterial from './EditMaterial';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faPlus, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { truncateText } from './CommonFunctions';
import ActionMaterialTable from './ActionMaterialTable';
import ResponsiveActionAbleTable from './ResponsiveActionAbleTable';
interface SingleMaterialProps {
    setshowAddMaterialForm?: (value: boolean) => void;
}
const SingleMaterial: React.FC<SingleMaterialProps> = ({ setshowAddMaterialForm }) => {
    const materials = useSelector((state: any) => state.form.materials)
    const dispatch = useDispatch()
    const [editForm, setEditForm] = useState(false);
    const [editValue, setEditValue] = useState(false);
    const [editIndex, setEditIndex] = useState<number>(0)
    const [screenWidth, setScreenWidth] = useState(0);
    const findScreenWidth = () => {
        const availablescreenWidth = window.innerWidth;
        setScreenWidth(availablescreenWidth)
    }
    useEffect(() => {
        findScreenWidth();
        window.addEventListener('resize', findScreenWidth);
        return (() => {
            window.removeEventListener('resize', findScreenWidth)
        })
    }, [])
    const sendIndicator = (value: boolean) => {
        setEditForm(value)
        console.log(value);
    }
    const receiveEditIndex = (index: number) => {
        setEditIndex(index)
    }
    const receiveEditValue = (value: boolean) => {
        setEditValue(value)
    }
    if (editForm) {
        return <EditMaterial index={editIndex} setEditForm={sendIndicator} edit={editValue} />
    } else {
        return (
            <div className='materialTableContainer w-[80vw]'>
                <div className='materialTableTitle flex justify-start gap-4 items-center mt-4'>
                    <h1 className='secondary_heading'>List Of Materials.</h1>
                    <button type="submit" onClick={() => setshowAddMaterialForm && setshowAddMaterialForm(true)} className='flex justify-start px-1 py-0 m-0 '>
                        <FontAwesomeIcon icon={faPlusCircle} className='mr-1' /> Add Material
                    </button>
                </div>
                {screenWidth > 850 ?
                    <ActionMaterialTable setEditForm={sendIndicator}
                        setEditIndex={receiveEditIndex}
                        setEditValue={receiveEditValue} />
                    : <ResponsiveActionAbleTable setEditForm={sendIndicator}
                        setEditIndex={receiveEditIndex}
                        setEditValue={receiveEditValue} />}
            </div>
        )
    }
}
export default SingleMaterial