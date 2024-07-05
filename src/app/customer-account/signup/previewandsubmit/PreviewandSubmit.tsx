"use client"
import React from 'react'
import { CustomerData } from '../../types'
interface CustomerDataProps {
    customerDatas: CustomerData,
    previewDetailsValue: (nextValue:number)=>void;
  }
  
const PreviewandSubmit:React.FC<CustomerDataProps> = ({customerDatas,previewDetailsValue})=>{
    

      
        const handlePrev=() =>{
            console.log(typeof(previewDetailsValue))
            previewDetailsValue(3)
        }
  return (
    <div>
  
    <h2>Preview and Submit</h2>
    
  <button onClick={handlePrev}>Prev</button>
  <button>Submit</button>
    </div>
  )
}

export default PreviewandSubmit