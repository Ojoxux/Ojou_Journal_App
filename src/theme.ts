import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'black',
        color: 'white',
      },
    },
  },
  colors: {
    black: '#000000',
    white: '#FFFFFF',
    gray: {
      700: '#2D2D2D',
      800: '#1C1C1C',
      900: '#0D0D0D',
    },
  },
  components: {
    Box: {
      baseStyle: {
        _hover: {
          border: '1px solid',
          borderColor: 'white',
        },
      },
    },
    Button: {
      baseStyle: {
        _hover: {
          outline: 'none !important',
          boxShadow: 'none !important',
        },
        _focus: {
          outline: 'none !important',
          boxShadow: 'none !important',
        },
      },
    },
  },
});

export default theme;
