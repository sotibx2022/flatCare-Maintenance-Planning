"use client"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
interface SingleNavigationProps {
    providedPathName: string,
    icon: any,
    NavigationTitle: string,
    hideSideBar: boolean,
}
const SingleNavigationItem: React.FC<SingleNavigationProps> = ({
    providedPathName,
    icon,
    NavigationTitle,
    hideSideBar
}) => {
    const pathName = usePathname();
    const [hoverText, setHoverText] = useState(false);
    // Toggle hoverText state
    const toggleNavigationTitleDisplay = () => {
        setHoverText(!hoverText);
    };
    // Determine the class names for the span
    const spanClassName = `
        ${pathName === providedPathName ? "text-primaryDark" : "text-primaryDark"}
        ${hoverText ? "navigationTitleOnHover" : hideSideBar ? "hidden" : "text-primaryDark"}
    `.trim();
    return (
        <li className={pathName === providedPathName ? 'border-2 border-primaryDark' : ''}>
            <Link
                href={providedPathName}
                className='flex justify-start items-center gap-1 px-2 py-1 duration-300'
                // Apply hover events only when hideSideBar is true
                onMouseEnter={hideSideBar ? toggleNavigationTitleDisplay : undefined}
                onMouseLeave={hideSideBar ? toggleNavigationTitleDisplay : undefined}
            >
                <FontAwesomeIcon
                    icon={icon}
                    className={pathName === providedPathName ? "text-primaryDark" : ""}
                />
                <span className={spanClassName}>
                    {NavigationTitle}
                </span>
            </Link>
        </li>
    )
}
export default SingleNavigationItem;
