import { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit'
import { update } from 'firebase/database'
import { interviewRef, showWriteError } from '../lib/db'
import type { Interview } from '../types'
import InterviewFormDialog from './InterviewFormDialog'
import { emptyInterview, type InterviewForm } from './renderData/interviewQuestions'
import ActionButton from './ui/ActionButton'

export default function UpdateInterview({ interview, id }: { interview: Interview; id: string }) {
  const [open, setOpen] = useState(false)

  const handleSubmit = (values: InterviewForm) => {
    update(interviewRef(id), values).catch(showWriteError)
    setOpen(false)
  }

  return (
    <>
      <ActionButton title="Edytuj wywiad z pacjentem" icon={<EditIcon />} onClick={() => setOpen(true)} />
      {open && (
        <InterviewFormDialog
          title="Edycja wywiadu"
          initialValues={{ ...emptyInterview, ...interview }}
          submitLabel="Zaktualizuj"
          onSubmit={handleSubmit}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  )
}
