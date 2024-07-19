"use client";
import React, { useContext, useEffect, useState } from 'react';
import ThemeContex, { DarkModeContext } from '../../../useContext/themeContext';
import Header from '../header/CustomerHeader';
import Navigation from './navigation/Navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
interface SubLayoutProps {
    children: React.ReactNode;
}
const SubLayout: React.FC<SubLayoutProps> = ({ children }) => {
    const [hideSideBar, setHideSIdeBar] = useState(false)
    const toggleSidebar = () => {
        setHideSIdeBar(!hideSideBar)
    }
    const { state } = useContext(DarkModeContext);
    const [hydrated, setHydrated] = useState(false);
    useEffect(() => {
        setHydrated(true);
    }, []);
    if (!hydrated) {
        return null;
    }
    return (
        <main>
            <div className="layoutContainer flex_items dashboardContainer">
                <section id="leftSide" className={hideSideBar ? "hideSideBar" : "showSideBar"}>
                    <div onClick={toggleSidebar} className='responsiveDashboardIcon'>  <FontAwesomeIcon icon={hideSideBar ? faChevronRight : faChevronLeft} /></div>
                    <Navigation />
                </section>
                <section id="rightSide" className={hideSideBar ? "expandRightSide" : "collapseRightSide"}>
                    {children}
                </section>
            </div>
        </main>
    );
};
export default SubLayout;
