import { defineStyleConfig } from "@chakra-ui/react";

const Button = defineStyleConfig({
  // Styles for the base style
  baseStyle: {
    fontWeight: 'bold',
    rounded: 'none',
    textColor: 'white',
    _hover:
      {
        bg: 'white',
        color: 'black',
        textDecoration: 'none'
      }
  },

  // Styles for the size variations
  sizes: {
    lg: {
      px: '58px',
      py: '32px',
    }
  },

  // Styles for the visual style variations
  variants: {
    'primary-blue': {
      bg: 'brand.navy.medium',
    },
    'primary-black': {
      bg: 'black',
    }
  },

  // The default `size` or `variant` values
  defaultProps: {
    variant: 'primary-blue',
    size: 'lg'
  },
});

export default Button;
