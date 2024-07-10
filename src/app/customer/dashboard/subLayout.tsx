"use client"
import React, { useContext } from 'react'
import ThemeContex, { DarkModeContext } from '../../../useContext/themeContext'
import Header from '../header/CustomerHeader'
import Navigation from './navigation/Navigation'


interface SubLayoutProps {
    children: React.ReactNode
}
const SubLayout: React.FC<SubLayoutProps> = ({ children }) => {
    const { state } = useContext(DarkModeContext)
    return (

        <main className={state.darkMode ? "darkMode" : "lightMode"}>

            <Header />
            <div className="layoutContainer flex_items container">

                <section className="leftSide">
                    <Navigation />
                </section>
                <section className="rightSide">
                    {children}
                </section>

            </div>

        </main>

    )
}

export default SubLayout