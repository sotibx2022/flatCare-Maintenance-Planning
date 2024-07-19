"use client";
import React, { useState, useEffect } from 'react';
import { CustomerData } from '../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faBuilding, faDoorClosed, faElevator } from '@fortawesome/free-solid-svg-icons';
import SubmitError from '../../../ui/SubmitError';
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
        <div className="form_Item">
          <label>Building Number</label>
          <div style={{ position: 'relative' }}>
            <FontAwesomeIcon icon={faBuilding} className='input_icon_left' />
            <input
              type="text"
              name="buildingNumber"
              placeholder="Building Number"
              value={currentBuildingNumber}
              onChange={(e) => setCurrentBuildingNumber(e.target.value)}
              onBlur={(e) => blurHandler(e)}
              style={{ paddingLeft: '30px' }}
            />
          </div>
          {errors.buildingNumber && focus.buildingNumber && <SubmitError message={errors.buildingNumber} />}
        </div>
        <div className="form_Item">
          <label>Floor Number</label>
          <div style={{ position: 'relative' }}>
            <FontAwesomeIcon icon={faElevator} className='input_icon_left' />
            <input
              type="text"
              name="floorNumber"
              placeholder="Floor Number"
              value={currentFloorNumber}
              onChange={(e) => setCurrentFloorNumber(e.target.value)}
              onBlur={(e) => blurHandler(e)}
              style={{ paddingLeft: '30px' }}
            />
          </div>
          {errors.floorNumber && focus.floorNumber && <SubmitError message={errors.floorNumber} />}
        </div>
        <div className="form_Item">
          <label>Room Number</label>
          <div style={{ position: 'relative' }}>
            <FontAwesomeIcon icon={faDoorClosed} className='input_icon_left' />
            <input
              type="text"
              name="roomNumber"
              placeholder="Room Number"
              value={currentRoomNumber}
              onChange={(e) => setCurrentRoomNumber(e.target.value)}
              onBlur={(e) => blurHandler(e)}
              style={{ paddingLeft: '30px' }}
            />
          </div>
          {errors.roomNumber && focus.roomNumber && <SubmitError message={errors.roomNumber} />}
        </div>
        <div className='buttonsWrapper' style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button onClick={handlePrev}><FontAwesomeIcon icon={faArrowLeft} /></button>
          <button onClick={handleNext} disabled={isButtonDisabled}><FontAwesomeIcon icon={faArrowRight} /></button>
        </div>
        <h1 className='primary_heading' style={{ display: 'flex', gap: '5px', alignItems: 'center', justifyContent: 'center' }}>Step <span className='step_number'>3</span> of <span>4</span></h1>
      </div>
    </div>
  );
};
export default LocationDetails;