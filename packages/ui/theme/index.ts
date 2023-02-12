import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  // If dark mode is enabled
  // initialColorMode: 'light',
  // useSystemColorMode: false,
};

// Global style overrides
import styles from './styles';

// Foundational style overrides
import fonts from './foundations/fonts';
import colors from './foundations/colors';

// Component style overrides
import components from './components';

const overrides = {
  config,
  styles,
  fonts,
  colors,
  components,
};

export const theme = extendTheme(overrides);
