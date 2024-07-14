"use client"
import React, { createContext, ReactNode, useReducer } from 'react';

interface State {
    darkMode: boolean;
}

type ThemeContextProps = {
    children: ReactNode;
}

const initial_State: State = {
    darkMode: false
};

type Action = { type: 'DARKMODE' } | { type: 'LIGHTMODE' } | { type: 'TOGGLE' };
const initialContextValue: {
    state: State,
    dispatch: React.Dispatch<Action>
} = {
    state: { darkMode: false },
    dispatch: () => { }
}
export const DarkModeContext = createContext(initialContextValue);

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'DARKMODE':
            return { ...state, darkMode: true };
        case 'LIGHTMODE':
            return { ...state, darkMode: false };
        case 'TOGGLE':
            return { ...state, darkMode: !state.darkMode };
        default:
            return state;
    }
};

const ThemeContext: React.FC<ThemeContextProps> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initial_State);

    return (
        <DarkModeContext.Provider value={{ state, dispatch }}>
            {children}
        </DarkModeContext.Provider>
    );
};

export default ThemeContext;
