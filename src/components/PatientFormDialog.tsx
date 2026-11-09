import { useId, useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import TextField from '@mui/material/TextField'
import { patientFields, type PatientForm } from './renderData/patientFields'
import DialogBar from './ui/DialogBar'

interface PatientFormDialogProps {
  title: string
  titleVariant?: 'h5' | 'h6'
  initialValues: PatientForm
  submitLabel: string
  /** Podświetla numer telefonu, który nie jest liczbą (bez blokowania zapisu). */
  highlightInvalidPhone?: boolean
  onSubmit: (values: PatientForm) => void
  onClose: () => void
}

/** Formularz danych pacjenta. Renderuj tylko gdy otwarty — stan startuje z `initialValues`. */
export default function PatientFormDialog({
  title,
  titleVariant = 'h6',
  initialValues,
  submitLabel,
  highlightInvalidPhone = false,
  onSubmit,
  onClose,
}: PatientFormDialogProps) {
  const titleId = useId()
  const [values, setValues] = useState(initialValues)

  return (
    // Bez onClose: okna nie da się zamknąć kliknięciem w tło ani klawiszem Esc.
    <Dialog open aria-labelledby={titleId}>
      <DialogBar id={titleId} title={title} variant={titleVariant} dense />
      <DialogContent>
        <form noValidate autoComplete="off">
          {patientFields.map((field) => (
            <TextField
              key={field.name}
              name={field.name}
              label={field.label}
              type={field.type ?? 'text'}
              value={values[field.name]}
              onChange={(event) => {
                const { value } = event.target
                setValues((current) => ({ ...current, [field.name]: value }))
              }}
              error={highlightInvalidPhone && field.name === 'phoneNumber' && Number.isNaN(Number(values.phoneNumber))}
              variant="outlined"
              margin="normal"
              fullWidth
            />
          ))}
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Anuluj
        </Button>
        <Button onClick={() => onSubmit(values)} color="primary" disabled={!values.name || !values.surname}>
          {submitLabel}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
