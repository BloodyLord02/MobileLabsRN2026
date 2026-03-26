import React, { createContext, useState } from 'react';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const [score, setScore] = useState(0);
    const [stats, setStats] = useState({
        taps: 0,
        doubleTaps: 0,
        longPress: false,
        moved: false,
        swipeRight: false,
        swipeLeft: false,
        scaled: false,
    });
    const [isDark, setIsDark] = useState(false); // для темної теми

    return (
        <GameContext.Provider value={{
            score, setScore,
            stats, setStats,
            isDark, setIsDark
        }}>
            {children}
        </GameContext.Provider>
    );
};