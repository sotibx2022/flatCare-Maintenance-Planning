import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
            <span>{actualIndex}</span>
            <div className={`process-item ${isLeft ? 'left-content' : 'right-content'}`}>
                <h2>
                    {taskTitle}
                </h2>
                <h3>{taskDescription}</h3>
                <h4>Roal Of <small>{role}</small></h4>
            </div>
        </div>
    )
}
export default ProcessItem