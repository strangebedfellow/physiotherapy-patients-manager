import { useId, useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import TextField from '@mui/material/TextField'
import interviewQuestions, { type InterviewForm } from './renderData/interviewQuestions'
import DialogBar from './ui/DialogBar'

interface InterviewFormDialogProps {
  title: string
  initialValues: InterviewForm
  submitLabel: string
  onSubmit: (values: InterviewForm) => void
  onClose: () => void
}

/** Formularz wywiadu. Renderuj tylko gdy otwarty — stan startuje z `initialValues`. */
export default function InterviewFormDialog({ title, initialValues, submitLabel, onSubmit, onClose }: InterviewFormDialogProps) {
  const titleId = useId()
  const [values, setValues] = useState(initialValues)

  return (
    <Dialog open maxWidth="lg" aria-labelledby={titleId}>
      <DialogBar id={titleId} title={title} dense />
      <DialogContent>
        <form noValidate autoComplete="off">
          {interviewQuestions.map((question) => (
            <TextField
              key={question.name}
              name={question.name}
              label={question.question}
              value={values[question.name]}
              onChange={(event) => {
                const { value } = event.target
                setValues((current) => ({ ...current, [question.name]: value }))
              }}
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
        <Button onClick={() => onSubmit(values)} color="primary">
          {submitLabel}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
