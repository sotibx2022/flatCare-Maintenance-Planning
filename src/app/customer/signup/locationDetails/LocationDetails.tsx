"use client";
import React, { useState, useEffect } from 'react';
import { CustomerData } from '../../types';

interface LocationDetailsProps {
  locationDetailsValues: (currentBuildingNumber: string, currentFloorNumber: string, currentRoomNumber: string, next: number) => void;
  customerDatas: CustomerData;
}

const LocationDetails: React.FC<LocationDetailsProps> = ({ locationDetailsValues, customerDatas }) => {
  const { buildingNumber, floorNumber, roomNumber } = customerDatas;

  const [currentBuildingNumber, setCurrentBuildingNumber] = useState<string>(buildingNumber || "");
  const [currentFloorNumber, setCurrentFloorNumber] = useState<string>(floorNumber || "");
  const [currentRoomNumber, setCurrentRoomNumber] = useState<string>(roomNumber || "");
  const [errors, setErrors] = useState<{ buildingNumber?: string; floorNumber?: string; roomNumber?: string }>({});
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [focus, setFocus] = useState<{ buildingNumber?: boolean; floorNumber?: boolean; roomNumber?: boolean }>({
    buildingNumber: false,
    floorNumber: false,
    roomNumber: false
  });

  useEffect(() => {
    validateForm();
  }, [currentBuildingNumber, currentFloorNumber, currentRoomNumber]);

  const validateForm = () => {
    let newErrors: { buildingNumber?: string; floorNumber?: string; roomNumber?: string } = {};

    if (!currentBuildingNumber) {
      newErrors.buildingNumber = "Building Number is required";
    }

    if (!currentFloorNumber) {
      newErrors.floorNumber = "Floor Number is required";
    }

    if (!currentRoomNumber) {
      newErrors.roomNumber = "Room Number is required";
    }

    setErrors(newErrors);
    setIsButtonDisabled(Object.keys(newErrors).length > 0);
  };

  const handleNext = () => {
    let next: number = 4; // Next step value
    locationDetailsValues(currentBuildingNumber, currentFloorNumber, currentRoomNumber, next);
  };

  const handlePrev = () => {
    let next: number = 2; // Previous step value
    locationDetailsValues(currentBuildingNumber, currentFloorNumber, currentRoomNumber, next);
  };

  const blurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setFocus({ ...focus, [name]: true });
  };

  return (
    <div className='container'>
    <div className='stepInputs_Wrapper'>
      <div className="form_item">
        <label>Building Number</label>
        <input
          type="text"
          name="buildingNumber"
          placeholder="Building Number"
          value={currentBuildingNumber}
          onChange={(e) => setCurrentBuildingNumber(e.target.value)}
          onBlur={(e) => blurHandler(e)}
        />
        {errors.buildingNumber && focus.buildingNumber && <span className='error_message'>{errors.buildingNumber}</span>}
      </div>

      <div className="form_item">
        <label>Floor Number</label>
        <input
          type="text"
          name="floorNumber"
          placeholder="Floor Number"
          value={currentFloorNumber}
          onChange={(e) => setCurrentFloorNumber(e.target.value)}
          onBlur={(e) => blurHandler(e)}
        />
        {errors.floorNumber && focus.floorNumber && <span className='error_message'>{errors.floorNumber}</span>}
      </div>

      <div className="form_item">
        <label>Room Number</label>
        <input
          type="text"
          name="roomNumber"
          placeholder="Room Number"
          value={currentRoomNumber}
          onChange={(e) => setCurrentRoomNumber(e.target.value)}
          onBlur={(e) => blurHandler(e)}
        />
        {errors.roomNumber && focus.roomNumber && <span className='error_message'>{errors.roomNumber}</span>}
      </div>

      <button onClick={handlePrev}>Previous</button>
      <button onClick={handleNext} disabled={isButtonDisabled}>Next</button>
    </div>
    </div>
  );
};

export default LocationDetails;
