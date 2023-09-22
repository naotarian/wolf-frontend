import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Palette {
    close: {
      main: string
    }
    reserveButton: {
      main: string
      dark: string
      light: string
    }
    whiteButton: {
      main: string
      dark: string
      light: string
    }
  }
  interface PaletteOptions {
    close?: {
      main?: string
      contrastText?: string
    }
    reserveButton?: {
      main?: string
      dark?: string
      light?: string
      contrastText?: string
    }
    whiteButton?: {
      main?: string
      dark?: string
      light?: string
      contrastText?: string
    }
  }
}
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    close: true
    reserveButton: true
  }
}
const theme = createTheme({
  palette: {
    primary: {
      light: '#27AE60',
      main: '#a1080f',
      dark: '#55161a',
    },
    secondary: {
      light: '#87ceeb',
      main: '#87ceeb',
      dark: '#87ceeb',
      contrastText: '#fff',
    },
    info: {
      main: '#29abe2',
      contrastText: '#fff',
    },
    success: {
      main: '#4db56a',
    },
    error: {
      main: '#d32f2f',
    },
    close: {
      main: '#6c757d',
      contrastText: '#fff',
    },
    reserveButton: {
      main: '#e67e22',
      light: '#dd5900',
      dark: '#dd5900',
      contrastText: '#fff',
    },
    whiteButton: {
      main: '#fff',
      light: '#dd5900',
      dark: '#dd5900',
      contrastText: '#333',
    },
  },

  typography: {
    fontFamily: ["'Kaisei Decol'", 'serif'].join(','),
    // 通常文字
    body1: {
      fontSize: 18,
      color: '#333',
    },
    body2: {
      fontSize: 14,
      color: '#333',
    },
    subtitle1: {
      fontSize: 24,
      fontWeight: 700,
    },
    // サブタイトルsmall
    subtitle2: {
      fontSize: 28,
      fontWeight: 700,
    },
    h1: {
      fontSize: 32,
      lineHeight: 2,
      fontWeight: 700,
      color: '#333',
      '@media (max-width:767px)': {
        fontSize: 24,
      },
    },
    h2: {
      fontSize: 28,
      lineHeight: 2,
      fontWeight: 700,
      color: '#333',
      '@media (max-width:767px)': {
        fontSize: 20,
      },
    },
    h3: {
      fontSize: 24,
      lineHeight: 2,
      color: '#333',
      fontWeight: 700,
      '@media (max-width:767px)': {
        fontSize: 16,
      },
    },
    h4: {
      fontSize: 20,
      lineHeight: 2,
      color: '#333',
      '@media (max-width:767px)': {
        fontSize: 16,
      },
    },
    h5: {
      fontSize: 16,
      lineHeight: 2,
      color: '#333',
      '@media (max-width:767px)': {
        fontSize: 8,
      },
    },
    // 通常太字
    h6: {
      fontSize: 12,
      lineHeight: 2,
      color: '#333',
      '@media (max-width:767px)': {
        fontSize: 4,
      },
    },
    // 注釈
    caption: {
      fontSize: 12,
      fontWeight: 700,
      color: 'rgba(0, 0, 0, 0.8)',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
})

export default theme
