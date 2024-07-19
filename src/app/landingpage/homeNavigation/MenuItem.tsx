import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'  // import your desired icons
import Link from 'next/link'
import "../homeNavigation/landingPage.css";
interface MenuItemProps {
    icon: any,
    name: string,
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, name }) => {
    const defineLink = (name: string) => {
        return name.toLowerCase().replace(/ /g, '-')
    }
    return (
        <li className="active">
            <Link href={defineLink(name)} className='menu-item'>
                <div className="icon">
                    <FontAwesomeIcon icon={icon} aria-hidden="true" />
                </div>
                <div className="text">
                    {name}
                </div>
            </Link>
        </li>
    )
}

export default MenuItem
