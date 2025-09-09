import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CheckCircle } from 'lucide-react';
import React from 'react'
interface ProcessItemProps {
    taskTitle: string,
    taskDescription: string,
    role: string,
    index: number
}
const ProcessItem: React.FC<ProcessItemProps> = ({ taskTitle, taskDescription, role, index }) => {
    const actualIndex = index + 1;
    const isLeft = (actualIndex % 2 === 0)
    return (
        <div className={`content-wrapper ${isLeft ? 'left-container' : 'right-container'}`}>
            <span>{<CheckCircle />}</span>
            <div className={`process-item ${isLeft ? 'left-content' : 'right-content'}`}>
                <h2 className='text-xl my-2'>
                    {taskTitle}
                </h2>
                <h3 className='text-lg my-2'>{taskDescription}</h3>
                <h4 className='my-2'><small>{role}</small></h4>
            </div>
        </div>
    )
}
export default ProcessItem