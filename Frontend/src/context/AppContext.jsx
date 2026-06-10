import { createContext, useContext, useState, useEffect } from 'react';

// Application state context

const AppContext = createContext();

export function AppProvider({ children }) {
  // Theme State
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Battle History State
  const [history, setHistory] = useState(() => {
    const savedHistory = localStorage.getItem('battleHistory');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  // Apply theme class to body
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const addBattleToHistory = (battle) => {
    const newHistory = [battle, ...history];
    setHistory(newHistory);
    localStorage.setItem('battleHistory', JSON.stringify(newHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('battleHistory');
  };

  return (
    <AppContext.Provider value={{ theme, toggleTheme, history, addBattleToHistory, clearHistory }}>
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
