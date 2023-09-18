import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    alternate: Palette['primary'];
  }
  interface PaletteOptions {
    alternate: PaletteOptions['primary'];
  }
}

export const theme = createTheme({
  typography: {
    fontFamily: "'Roboto', 'Poppins'",

    button: {
      textTransform: 'none',
    },

    allVariants: {
      color: '#000',
    },

    h6: {
      fontWeight: 700,
    },

    h4: {
      fontWeight: 700,
    },
  },

  palette: {
    primary: {
      main: '#000',
    },

    secondary: {
      main: '#14213D',
    },

    alternate: {
      main: '#DFD4C4',
    },

    background: {
      default: '#FFF',
    },

    error: {
      main: '#DC1F1F',
    },

    info: {
      main: '#257CFF',
    },
  },

  components: {
    MuiAutocomplete: {
      styleOverrides: {
        inputRoot: {
          borderRadius: '10px',
        },
      },
    },
  },
});
