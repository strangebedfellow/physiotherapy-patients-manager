import { Fragment, useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import CloseIcon from '@mui/icons-material/Close'
import type { Interview } from '../types'
import interviewQuestions from './renderData/interviewQuestions'
import UpdateInterview from './UpdateInterview'
import DialogBar from './ui/DialogBar'
import { SlideUp } from './ui/transitions'

export default function ViewInterview({ interview, id }: { interview: Interview; id: string }) {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <div>
      <Button variant="contained" size="large" color="primary" onClick={() => setOpen(true)}>
        Zobacz wywiad z pacjentem
      </Button>
      <Dialog fullScreen open={open} onClose={close} slots={{ transition: SlideUp }}>
        <DialogBar title="Wywiad z pacjentem" variant="h4">
          <UpdateInterview interview={interview} id={id} />
          <IconButton edge="end" color="inherit" onClick={close} aria-label="Zamknij">
            <CloseIcon />
          </IconButton>
        </DialogBar>
        <List>
          {interviewQuestions.map((question) => (
            <Fragment key={question.name}>
              <ListItemButton>
                <ListItemText primary={question.question} secondary={interview[question.name]} />
              </ListItemButton>
              <Divider />
            </Fragment>
          ))}
        </List>
      </Dialog>
    </div>
  )
}
