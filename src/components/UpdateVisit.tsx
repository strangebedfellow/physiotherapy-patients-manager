import { useId, useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import TextField from '@mui/material/TextField'
import EditIcon from '@mui/icons-material/Edit'
import { update } from 'firebase/database'
import { showWriteError, visitRef } from '../lib/db'
import type { Visit } from '../types'
import ActionButton from './ui/ActionButton'
import DialogBar from './ui/DialogBar'

export default function UpdateVisit({ patientId, visit }: { patientId: string; visit: Visit }) {
  const titleId = useId()
  const [open, setOpen] = useState(false)
  const [consultation, setConsultation] = useState('')
  const [notes, setNotes] = useState('')

  // Formularz startuje z aktualnymi wartościami, więc zapis nie kasuje pola, którego nie edytowano.
  const openDialog = () => {
    setConsultation(visit.consultation ?? '')
    setNotes(visit.notes ?? '')
    setOpen(true)
  }

  const handleSubmit = () => {
    update(visitRef(patientId, visit.id), { consultation, notes }).catch(showWriteError)
    setOpen(false)
  }

  return (
    <>
      <ActionButton title="Edytuj wizytę" icon={<EditIcon />} onClick={openDialog} />
      <Dialog open={open} maxWidth="lg" fullWidth aria-labelledby={titleId}>
        <DialogBar id={titleId} title="Edycja wizyty" />
        <DialogContent>
          <TextField
            name="consultation"
            label="Część ciała poddana zabiegowi / rezultat"
            value={consultation}
            onChange={(event) => setConsultation(event.target.value)}
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <TextField
            name="notes"
            label="Inne uwagi do badania"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            variant="outlined"
            margin="normal"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Anuluj
          </Button>
          <Button onClick={handleSubmit} color="primary" disabled={!consultation && !notes}>
            Dodaj
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
