import { GLASSMORPHISM_THEMES } from '@/utils/constant';

const useGlassmorphismTheme = (themeIndex) => {
  const DEFAULT_THEME_INDEX = 0;

  const getTheme = (index) => {
    if (index >= 0 && index < GLASSMORPHISM_THEMES.length) {
      return GLASSMORPHISM_THEMES[index];
    }
    return GLASSMORPHISM_THEMES[DEFAULT_THEME_INDEX];
  };

  return getTheme(themeIndex);
};

export default useGlassmorphismTheme;
