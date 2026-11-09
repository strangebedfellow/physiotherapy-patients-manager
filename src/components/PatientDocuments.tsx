import { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import ImageIcon from '@mui/icons-material/Image'
import { isDriveConfigured, loadGoogleIdentity } from '../lib/googleDrive'
import GetDocs from './GetDocs'
import DialogBar from './ui/DialogBar'
import { SlideUp } from './ui/transitions'

export default function PatientDocuments({ id }: { id: string }) {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  // Wczesne załadowanie GIS — okno logowania Google otworzy się od razu po kliknięciu.
  useEffect(() => {
    if (isDriveConfigured) loadGoogleIdentity().catch(console.error)
  }, [])

  return (
    <div>
      <Button variant="contained" color="primary" size="large" startIcon={<ImageIcon />} onClick={() => setOpen(true)}>
        Dokumenty pacjenta
      </Button>
      {/* disableEnforceFocus: lightbox renderuje się poza oknem i musi dostać fokus (klawiatura). */}
      <Dialog open={open} onClose={close} slots={{ transition: SlideUp }} maxWidth="xl" disableEnforceFocus>
        <DialogBar title="Dokumenty pacjenta">
          <IconButton edge="end" color="inherit" onClick={close} aria-label="Zamknij">
            <CloseIcon />
          </IconButton>
        </DialogBar>
        <GetDocs id={id} />
      </Dialog>
    </div>
  )
}
