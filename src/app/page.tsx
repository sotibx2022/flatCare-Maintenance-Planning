import React from 'react'
import CommonHeader from './ui/header/commonHeader/CommonHeader'
import CommonFooter from './ui/footer/commonFooter/CommonFooter'
import SoftwareFeatures from './ui/softwareFeatures/SoftwareFeatures'

const page = () => {
  return (
    <div>
      <div>
     <CommonHeader/>
     <SoftwareFeatures/>
     <CommonFooter/>
     
      </div>
    </div>
  )
}

export default page