import { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit'
import { update } from 'firebase/database'
import { patientRef, showWriteError } from '../lib/db'
import type { Patient } from '../types'
import PatientFormDialog from './PatientFormDialog'
import { formToPatient, patientToForm, type PatientForm } from './renderData/patientFields'
import ActionButton from './ui/ActionButton'

export default function UpdatePatientData({ patient, id }: { patient: Patient; id: string }) {
  const [open, setOpen] = useState(false)

  const handleSubmit = (values: PatientForm) => {
    update(patientRef(id), formToPatient(values)).catch(showWriteError)
    setOpen(false)
  }

  return (
    <>
      <ActionButton title="Edytuj dane pacjenta" icon={<EditIcon />} onClick={() => setOpen(true)} />
      {open && (
        <PatientFormDialog
          title="Edycja danych pacjenta"
          initialValues={patientToForm(patient)}
          submitLabel="Zaktualizuj"
          highlightInvalidPhone
          onSubmit={handleSubmit}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  )
}
