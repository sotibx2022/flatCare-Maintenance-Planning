"use client";
import React, { useContext, useEffect, useState } from 'react';
import ThemeContex, { DarkModeContext } from '../../../useContext/themeContext';
import Header from '../header/CustomerHeader';
import Navigation from './navigation/Navigation';

interface SubLayoutProps {
    children: React.ReactNode;
}

const SubLayout: React.FC<SubLayoutProps> = ({ children }) => {
    const { state } = useContext(DarkModeContext);
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(true);
    }, []);

    if (!hydrated) {
        return null;
    }

    return (
        <main className={state.darkMode ? "darkMode" : "lightMode"}>
            <div className="layoutContainer flex_items container">
                <section className="leftSide">
                    <Navigation />
                </section>
                <section className="rightSide">
                    {children}
                </section>
            </div>
        </main>
    );
};

export default SubLayout;
