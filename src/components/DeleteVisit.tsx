import { useId, useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { remove } from 'firebase/database'
import { showWriteError, visitRef } from '../lib/db'
import ActionButton from './ui/ActionButton'
import { SlideDown } from './ui/transitions'

interface DeleteVisitProps {
  patientId: string
  visitId: string
  onDeleted: () => void
}

export default function DeleteVisit({ patientId, visitId, onDeleted }: DeleteVisitProps) {
  const titleId = useId()
  const [open, setOpen] = useState(false)

  const confirmDelete = () => {
    remove(visitRef(patientId, visitId)).catch(showWriteError)
    setOpen(false)
    onDeleted()
  }

  return (
    <>
      <ActionButton title="Usuń wizytę" icon={<DeleteForeverIcon />} onClick={() => setOpen(true)} />
      <Dialog open={open} onClose={() => setOpen(false)} slots={{ transition: SlideDown }} keepMounted aria-labelledby={titleId}>
        <DialogTitle id={titleId}>Czy na pewno chcesz usunąć tą wizytę?</DialogTitle>
        <DialogActions>
          <Button onClick={confirmDelete} variant="contained" color="secondary">
            Usuń
          </Button>
          <Button onClick={() => setOpen(false)} variant="contained" color="primary">
            Anuluj
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
