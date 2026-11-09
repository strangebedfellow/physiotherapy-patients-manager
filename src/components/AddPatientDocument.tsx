import { useId, useState, type DragEvent } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import AddBoxIcon from '@mui/icons-material/AddBox'
import AddDoc from './AddDoc'
import DialogBar from './ui/DialogBar'
import { SlideUp } from './ui/transitions'

// Plik upuszczony obok strefy przeciągania nie może otworzyć się w karcie przeglądarki.
const preventFileDrop = (event: DragEvent) => event.preventDefault()

export default function AddPatientDocument({ id }: { id: string }) {
  const titleId = useId()
  const [open, setOpen] = useState(false)

  return (
    <div>
      <Button variant="contained" color="secondary" size="large" startIcon={<AddBoxIcon />} onClick={() => setOpen(true)}>
        Dodaj nowy dokument
      </Button>
      {/* Bez onClose: okno zamyka się tylko przyciskiem, więc kliknięcie w tło nie przerwie wysyłania. */}
      <Dialog
        open={open}
        fullWidth
        maxWidth="sm"
        slots={{ transition: SlideUp }}
        aria-labelledby={titleId}
        onDragOver={preventFileDrop}
        onDrop={preventFileDrop}
      >
        <DialogBar id={titleId} title="Dodaj nowy dokument" />
        <AddDoc id={id} onClose={() => setOpen(false)} />
      </Dialog>
    </div>
  )
}
