import React from 'react'
interface StepCounterProps {
    currentStep: number,
    totalSteps: number
}
const StepsCounter: React.FC<StepCounterProps> = ({ currentStep, totalSteps }) => {
    return (
        <div>
            <h1 className="primary_heading flex gap-1 items-center justify-center ml-[-150px] md:ml-auto">
                Step <span className="step_number">{currentStep}</span> of <span>{totalSteps}</span>
            </h1>
        </div>
    )
}
export default StepsCounter