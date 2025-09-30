import { useTheme as useOriginalTheme } from '../contexts/ThemeContext';

export const useSafeTheme = () => {
  try {
    return useOriginalTheme();
  } catch (error) {
    return {
      theme: 'light',
      toggleTheme: () => {},
      isDark: false
    };
  }
};
