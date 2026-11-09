import { useState } from 'react'
import Button from '@mui/material/Button'
import AddBoxIcon from '@mui/icons-material/AddBox'
import { set } from 'firebase/database'
import { interviewRef, showWriteError } from '../lib/db'
import InterviewFormDialog from './InterviewFormDialog'
import { emptyInterview, type InterviewForm } from './renderData/interviewQuestions'

export default function AddInterview({ id }: { id: string }) {
  const [open, setOpen] = useState(false)

  const handleSubmit = (values: InterviewForm) => {
    set(interviewRef(id), values).catch(showWriteError)
    setOpen(false)
  }

  return (
    <>
      <Button variant="contained" color="secondary" size="large" startIcon={<AddBoxIcon />} onClick={() => setOpen(true)}>
        Dodaj wywiad z pacjentem
      </Button>
      {open && (
        <InterviewFormDialog
          title="Uzupełnij wywiad"
          initialValues={emptyInterview}
          submitLabel="Dodaj"
          onSubmit={handleSubmit}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  )
}
