import { defineStyleConfig } from '@chakra-ui/react';

const Button = defineStyleConfig({
  // Styles for the base style
  baseStyle: {
    fontWeight:  'bold',
    rounded: 'none',
    size: 'lg',
    color: 'white',
    px: '12px',
    py:'8px',
    _hover:
      {
        bg: 'white',
        color: 'black',
        textDecoration: 'none'
      }
  },

  // Styles for the size variations
  sizes: {

  },

  // Styles for the visual style variations
  variants: {
    'primary-blue': {
      bg: 'blue.600',

    }
    ,
    'primary-black': {
      bg: 'black',
    }
  },

  // The default `size` or `variant` values
  defaultProps: {},
});

export default Button;
