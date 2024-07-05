"use client";
import React, { useState } from 'react';
import { CustomerData } from '../../types';

interface LocationDetailsProps {
  locationDetailsValues: (currentBuildingNumber: string, currentFloorNumber: string, currentRoomNumber: string, next: number) => void;
  customerDatas: CustomerData;
}

const PersonalDetails: React.FC<LocationDetailsProps> = ({ locationDetailsValues, customerDatas }) => {
  const { buildingNumber, floorNumber, roomNumber } = customerDatas;

  // Initialize state with empty strings or numbers
  const [currentBuildingNumber, setcurrentBuildingNumber] = useState<string>(buildingNumber || "");
  const [currentFloorNumber, setcurrentFloorNumber] = useState<string>(floorNumber || "");
  const [currentRoomNumber, setcurrentRoomNumber] = useState<string>(roomNumber || ""); // Initialize with empty string


  const handleNext = () => {
    let next: number = 4; // Next step value for SoftwareAccessDetails
    locationDetailsValues(currentBuildingNumber, currentFloorNumber, currentRoomNumber, next); // phoneNumber is now treated as string
  };
  const handlePrev=()=>{
    let next:number = 2;
    locationDetailsValues(currentBuildingNumber, currentFloorNumber, currentRoomNumber, next);
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Building Number"
        value={currentBuildingNumber}
        onChange={(e) => setcurrentBuildingNumber(e.target.value)}
      />
      <input
        type="text"
        placeholder="Floor Number"
        value={currentFloorNumber}
        onChange={(e) => setcurrentFloorNumber(e.target.value)}
      />
      <input
        type="text" // Change input type to text
        placeholder="Room Number"
        value={currentRoomNumber}
        onChange={(e) => setcurrentRoomNumber(e.target.value)}
      />
      <button onClick={handlePrev}>Previous</button>
      <button onClick={handleNext}>Submit</button>
      
    </div>
  );
};

export default PersonalDetails;
