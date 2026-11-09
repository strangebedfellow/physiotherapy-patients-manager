import type { ReactNode } from 'react'
import GlobalStyles from '@mui/material/GlobalStyles'
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { pl } from 'date-fns/locale'
import { theme } from './theme'

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <StyledEngineProvider enableCssLayer>
      {/* Deklaracja kolejności warstw musi trafić do dokumentu przed stylami Emotion. */}
      <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={pl}>
          {children}
        </LocalizationProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  )
}
