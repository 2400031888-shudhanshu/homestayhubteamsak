import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types
interface Favorite {
  id: string;
  type: 'homestay' | 'attraction';
  data: any;
}

interface UserPreferences {
  currency: string;
  language: string;
  notifications: boolean;
}

interface AppContextType {
  favorites: Favorite[];
  addFavorite: (item: Favorite) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  userPreferences: UserPreferences;
  updatePreferences: (prefs: Partial<UserPreferences>) => void;
  searchHistory: string[];
  addToSearchHistory: (query: string) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // State with localStorage persistence
  const [favorites, setFavorites] = useState<Favorite[]>(() => {
    const saved = localStorage.getItem('homestay_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const [userPreferences, setUserPreferences] = useState<UserPreferences>(() => {
    const saved = localStorage.getItem('user_preferences');
    return saved ? JSON.parse(saved) : {
      currency: 'USD',
      language: 'en',
      notifications: true,
    };
  });

  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    const saved = localStorage.getItem('search_history');
    return saved ? JSON.parse(saved) : [];
  });

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as 'light' | 'dark') || 'light';
  });

  // Persist favorites to localStorage
  useEffect(() => {
    localStorage.setItem('homestay_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Persist preferences to localStorage
  useEffect(() => {
    localStorage.setItem('user_preferences', JSON.stringify(userPreferences));
  }, [userPreferences]);

  // Persist search history to localStorage
  useEffect(() => {
    localStorage.setItem('search_history', JSON.stringify(searchHistory));
  }, [searchHistory]);

  // Persist theme to localStorage and apply to document
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  // Favorite management functions
  const addFavorite = (item: Favorite) => {
    setFavorites(prev => {
      if (prev.some(fav => fav.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  const removeFavorite = (id: string) => {
    setFavorites(prev => prev.filter(fav => fav.id !== id));
  };

  const isFavorite = (id: string) => {
    return favorites.some(fav => fav.id === id);
  };

  const updatePreferences = (prefs: Partial<UserPreferences>) => {
    setUserPreferences(prev => ({ ...prev, ...prefs }));
  };

  const addToSearchHistory = (query: string) => {
    setSearchHistory(prev => {
      const filtered = prev.filter(q => q !== query);
      return [query, ...filtered].slice(0, 10); // Keep last 10 searches
    });
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <AppContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        userPreferences,
        updatePreferences,
        searchHistory,
        addToSearchHistory,
        theme,
        toggleTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};
