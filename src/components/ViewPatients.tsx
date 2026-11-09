import { useState } from 'react'
import Alert from '@mui/material/Alert'
import AppBar from '@mui/material/AppBar'
import Autocomplete from '@mui/material/Autocomplete'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import Zoom from '@mui/material/Zoom'
import EventNoteIcon from '@mui/icons-material/EventNote'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import { signOut } from 'firebase/auth'
import logoSrc from '../img/smallklogo.jpg'
import { usePatients } from '../lib/db'
import { auth } from '../lib/firebase'
import type { PatientWithId } from '../types'
import AccessDenied from './AccessDenied'
import AddPatient from './AddPatient'
import GetPatientInfo from './GetPatientInfo'
import SectionTitle from './ui/SectionTitle'

const CALENDAR_EMBED_URL =
  'https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23EF6C00&ctz=Europe%2FWarsaw' +
  '&src=ZWdvc3ludG9uaWNAZ21haWwuY29t&color=%23E67C73&showTitle=0&showNav=0&showDate=0&showPrint=0' +
  '&showTabs=0&showCalendars=0&showTz=0&mode=WEEK&hl=pl'

const patientLabel = (patient: PatientWithId) => `${patient.name ?? ''} ${patient.surname ?? ''}`.trim()

export default function ViewPatients() {
  const { data: patients, error } = usePatients()
  const [chosenId, setChosenId] = useState<string | null>(null)

  if (error) return <AccessDenied error={error} />
  if (!patients) return null

  const chosenPatient = patients.find((patient) => patient.id === chosenId) ?? null

  return (
    <>
      <AppBar position="sticky" style={{ backgroundColor: '#1976d2' }}>
        <Toolbar>
          <Tooltip title="Otwórz kalendarz" slots={{ transition: Zoom }}>
            <IconButton
              component="a"
              href="https://calendar.google.com/"
              target="_blank"
              rel="noreferrer"
              edge="start"
              color="inherit"
              aria-label="Otwórz kalendarz"
            >
              <EventNoteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Wyloguj" slots={{ transition: Zoom }}>
            <IconButton edge="end" color="inherit" aria-label="Wyloguj" onClick={() => void signOut(auth)}>
              <ExitToAppIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <div className="mb-4 flex w-full items-center justify-center bg-brand p-4 text-white shadow-md max-[700px]:flex-col">
        {/* Kliknięcie w logo wraca do widoku kalendarza. */}
        <img
          className="max-w-[300px] cursor-pointer rounded-[10px]"
          src={logoSrc}
          alt="Fizjoterapia — strona główna"
          onClick={() => setChosenId(null)}
        />
        <div className="m-4 flex w-[320px] flex-col items-center gap-4 rounded-[10px] bg-white p-4 shadow">
          <AddPatient onAdded={setChosenId} />
          <Autocomplete
            className="w-full"
            options={patients}
            value={chosenPatient}
            onChange={(_, patient) => setChosenId(patient?.id ?? null)}
            getOptionLabel={patientLabel}
            getOptionKey={(patient) => patient.id}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            noOptionsText="Nie znaleziono"
            renderInput={(params) => <TextField {...params} label="Znajdź pacjenta" variant="outlined" />}
          />
        </div>
      </div>

      <Container maxWidth="md">
        {chosenId ? (
          <GetPatientInfo id={chosenId} />
        ) : (
          <div className="mt-20 flex flex-col items-center rounded-[10px] border border-white bg-brand p-4 text-white shadow-sm">
            <Alert icon={false} variant="filled" severity="info" className="mb-4">
              <SectionTitle>Nadchodzące wizyty</SectionTitle>
            </Alert>
            <iframe
              title="Nadchodzące wizyty"
              src={CALENDAR_EMBED_URL}
              className="max-w-full border-2 border-white"
              width="600"
              height="400"
            />
          </div>
        )}
      </Container>
    </>
  )
}
