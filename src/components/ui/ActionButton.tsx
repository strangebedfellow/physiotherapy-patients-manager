import type { ReactNode } from 'react'
import Button, { type ButtonProps } from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import Zoom from '@mui/material/Zoom'

interface ActionButtonProps {
  title: string
  icon: ReactNode
  onClick: () => void
  color?: ButtonProps['color']
}

/** Mały przycisk z ikoną i podpowiedzią (edycja, usuwanie, drukowanie…). */
export default function ActionButton({ title, icon, onClick, color = 'secondary' }: ActionButtonProps) {
  return (
    <Tooltip title={title} slots={{ transition: Zoom }}>
      <Button variant="contained" color={color} size="small" onClick={onClick} aria-label={title}>
        {icon}
      </Button>
    </Tooltip>
  )
}
