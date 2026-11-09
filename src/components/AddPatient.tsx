import { useState } from 'react'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { push } from 'firebase/database'
import { patientsRef, showWriteError } from '../lib/db'
import PatientFormDialog from './PatientFormDialog'
import { emptyPatientForm, formToPatient, type PatientForm } from './renderData/patientFields'

export default function AddPatient({ onAdded }: { onAdded: (id: string) => void }) {
  const [open, setOpen] = useState(false)

  const handleSubmit = (values: PatientForm) => {
    const newPatientRef = push(patientsRef(), formToPatient(values))
    newPatientRef.catch(showWriteError)
    if (newPatientRef.key) onAdded(newPatientRef.key)
    setOpen(false)
  }

  return (
    <>
      <Button variant="contained" color="secondary" size="large" startIcon={<PersonAddIcon />} onClick={() => setOpen(true)}>
        Dodaj nowego pacjenta
      </Button>
      {open && (
        <PatientFormDialog
          title="Uzupełnij dane pacjenta"
          titleVariant="h5"
          initialValues={emptyPatientForm}
          submitLabel="Dodaj"
          onSubmit={handleSubmit}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  )
}
