"use client"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'

const page = () => {
    const router = useRouter()
    const handleLogout =async() =>{
        const response = await axios.post("http://localhost:3000/api/customeraccount/logout");
        const result = response.data;
        alert(result.message)
        if(result.success){
            router.push("http://localhost:3000")
        }
    }
  return (
    <div>
        <button onClick={handleLogout}>Logout</button>
        <h1>This is Dashboard Page...</h1>
    </div>
  )
}

export default page