import type { ReactNode } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

interface DialogBarProps {
  title: ReactNode
  /** id nagłówka — do aria-labelledby okna dialogowego. */
  id?: string
  variant?: 'h4' | 'h5' | 'h6'
  dense?: boolean
  /** Akcje po prawej stronie paska. */
  children?: ReactNode
}

/** Niebieski pasek nagłówka używany w oknach dialogowych. */
export default function DialogBar({ title, id, variant = 'h6', dense = false, children }: DialogBarProps) {
  return (
    <AppBar position="relative">
      <Toolbar variant={dense ? 'dense' : 'regular'} className="gap-4">
        <Typography id={id} variant={variant} className="flex-1">
          {title}
        </Typography>
        {children}
      </Toolbar>
    </AppBar>
  )
}
