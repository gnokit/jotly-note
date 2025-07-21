import { useContext } from 'react';
import { ThemeContext, Theme, ThemeContextType } from '../contexts/ThemeContext';

const useTheme = (): [Theme, (theme: Theme) => void] => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return [context.theme, context.setTheme];
};

export default useTheme;