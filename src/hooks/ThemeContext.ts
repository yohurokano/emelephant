// ThemeContext.ts
import { createContext } from 'react';

type Theme = 'emelephant' | 'emelephant-dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'emelephant',
  toggleTheme: () => {},
});
