import { faRocket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React from 'react'
interface Call2ActionProps {
    type: string
    link: string
}
const Call2Action: React.FC<Call2ActionProps> = ({ type, link }) => {
    return (
        <div>
            <Link href={link} className="callToAction">
                <FontAwesomeIcon icon={faRocket} />
                {type}
            </Link>
        </div>
    )
}
export default Call2Action