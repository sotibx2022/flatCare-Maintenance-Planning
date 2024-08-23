import React from 'react'
interface PaginationProps {
    length: number
    findCurrentIndex: (value: number) => void;
}
const Pagination: React.FC<PaginationProps> = ({ length, findCurrentIndex }) => {
    const numberOfPages = Math.ceil(length / 5)
    return (
        <div className='flex justify-center items-center gap-2 mt-4'>
            {Array.from({ length: numberOfPages }).map((_, index: number) => {
                return <button key={index} onClick={() => findCurrentIndex(index + 1)}>{index + 1}</button>
            })}
        </div>
    )
}
export default Pagination