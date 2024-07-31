import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
interface SingleNavigationProps {
    providedPathName: string,
    icon: any,
    NavigationTitle: string
}
const SingleNavigationItem: React.FC<SingleNavigationProps> = ({ providedPathName, icon, NavigationTitle }) => {
    const pathName = usePathname()
    console.log(NavigationTitle)
    return (
        <>
            <li className={pathName === providedPathName ? 'active' : ''}>
                <Link href={providedPathName}>
                    <FontAwesomeIcon icon={icon} /> {NavigationTitle}
                </Link>
            </li>
        </>
    )
}
export default SingleNavigationItem