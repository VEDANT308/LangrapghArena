import { createContext, useContext, useState, useEffect, useCallback } from 'react';

// Application state context

const AppContext = createContext();

export function AppProvider({ children }) {
  // Theme State
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Battle History State (persisted to localStorage — survives browser close)
  const [history, setHistory] = useState(() => {
    const savedHistory = localStorage.getItem('battleHistory');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  // Current Battle State (persisted to sessionStorage — survives refresh, clears on tab close)
  const [currentBattle, setCurrentBattle] = useState(() => {
    const saved = sessionStorage.getItem('currentBattle');
    return saved ? JSON.parse(saved) : null;
  });

  // Apply theme class to body
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Persist currentBattle to sessionStorage whenever it changes
  useEffect(() => {
    if (currentBattle) {
      sessionStorage.setItem('currentBattle', JSON.stringify(currentBattle));
    } else {
      sessionStorage.removeItem('currentBattle');
    }
  }, [currentBattle]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const addBattleToHistory = useCallback((battle) => {
    setHistory(prev => {
      const newHistory = [battle, ...prev];
      localStorage.setItem('battleHistory', JSON.stringify(newHistory));
      return newHistory;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem('battleHistory');
  }, []);

  return (
    <AppContext.Provider value={{
      theme, toggleTheme,
      history, addBattleToHistory, clearHistory,
      currentBattle, setCurrentBattle,
    }}>
      {children}
    </AppContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
