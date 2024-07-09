"use client"
import React, { createContext, ReactNode, useReducer } from 'react'


const initial_State = {
    darkMode: false
}

export const DarkModeContext = createContext(initial_State)
const reducer = (state, action) => {
    switch (action.type) {
        case 'DARKMODE':
            return { darkMode: true }
        case 'LIGHTMODE':
            return { darkMode: false }
        case 'TOOGLE': return { darkMode: !state.darkMode }
        default: return state;
    }
}

const ThemeContex = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initial_State)
    return (
        <DarkModeContext.Provider value={{ state, dispatch }}>{children}</DarkModeContext.Provider>
    )
}

export default ThemeContex