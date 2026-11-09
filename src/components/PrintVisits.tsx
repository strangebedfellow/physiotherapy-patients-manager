import { useRef, useState } from 'react'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import PhoneInTalkOutlinedIcon from '@mui/icons-material/PhoneInTalkOutlined'
import PrintIcon from '@mui/icons-material/Print'
import { useReactToPrint } from 'react-to-print'
import type { Patient, Visit } from '../types'
import ActionButton from './ui/ActionButton'
import DialogBar from './ui/DialogBar'

export default function PrintVisits({ visits, patient }: { visits: Visit[]; patient: Patient }) {
  const [open, setOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const { name, surname, phone_number, occupation } = patient
  const print = useReactToPrint({ contentRef, documentTitle: `Wizyty - ${name ?? ''} ${surname ?? ''}`.trim() })

  return (
    <>
      <ActionButton title="Drukuj wizyty" icon={<PrintIcon />} color="primary" onClick={() => setOpen(true)} />
      <Dialog open={open} aria-label="Drukuj wizyty">
        <DialogContent>
          <div className="my-4">
            <Button variant="contained" color="primary" size="large" startIcon={<PrintIcon />} onClick={() => print()}>
              Drukuj!
            </Button>
          </div>
          <div ref={contentRef}>
            <section className="my-4">
              <DialogBar title="Dane pacjenta" />
              <Alert variant="outlined" severity="success" icon={false}>
                <p className="my-[1em]">
                  <strong>Imię i nazwisko:</strong> {name} {surname}
                </p>
                <p className="my-[1em] flex items-center gap-2">
                  <PhoneInTalkOutlinedIcon fontSize="small" aria-label="Telefon" /> {phone_number}
                </p>
                <p className="my-[1em]">
                  <strong>Zawód/Praca/Aktywność: </strong>
                  {occupation}
                </p>
              </Alert>
            </section>
            {visits.map((visit) => (
              <section key={visit.id} className="mb-6">
                <DialogBar title={`Data wizyty: ${visit.date}`} />
                <Alert variant="outlined" severity="info" icon={false}>
                  <strong>Część ciała poddana zabiegowi / rezultat:</strong>
                  <p className="my-[1em]">{visit.consultation}</p>
                </Alert>
              </section>
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Anuluj
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
