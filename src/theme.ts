import { plPL } from '@mui/material/locale'
import { createTheme } from '@mui/material/styles'
import { plPL as pickersPlPL } from '@mui/x-date-pickers/locales'

// Paleta z Material-UI v4, żeby wygląd aplikacji nie zmienił się po migracji.
export const theme = createTheme(
  {
    palette: {
      primary: { main: '#3f51b5' },
      secondary: { main: '#f50057' },
      info: { main: '#2196f3' },
      success: { main: '#4caf50' },
      warning: { main: '#ff9800' },
      error: { main: '#f44336' },
    },
    components: {
      MuiButton: {
        styleOverrides: { root: { fontWeight: 700 } },
      },
      MuiAlert: {
        styleOverrides: { message: { width: '100%' } },
      },
    },
  },
  plPL,
  pickersPlPL,
)
