import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
const Rating = () => {
    return (
        <div>
            <h2 className='secondary_heading'>4.5/5 Based on Google Reviews</h2>
            <div className="star-rating">
                <FontAwesomeIcon icon={faStar} className="star full" />
                <FontAwesomeIcon icon={faStar} className="star full" />
                <FontAwesomeIcon icon={faStar} className="star full" />
                <FontAwesomeIcon icon={faStar} className="star full" />
                <FontAwesomeIcon icon={faStarHalfAlt} className="star half" />
            </div>
        </div>
    )
}
export default Rating