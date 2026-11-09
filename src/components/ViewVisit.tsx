import { Fragment, useState } from 'react'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import type { Visit } from '../types'
import DeleteVisit from './DeleteVisit'
import { getBodyPartLabel } from './renderData/bodyParts'
import { getRotationIcon } from './renderData/rotationIcons'
import UpdateVisit from './UpdateVisit'
import DialogBar from './ui/DialogBar'
import { SlideUp } from './ui/transitions'

export default function ViewVisit({ visit, patientId }: { visit: Visit; patientId: string }) {
  const [open, setOpen] = useState(false)
  const manual = visit.manual ?? []

  return (
    <div>
      <Alert icon={false} variant="outlined" severity="success">
        <Button variant="contained" className="bg-brand" onClick={() => setOpen(true)}>
          {visit.date}
        </Button>
        <p className="my-[1em] font-bold">{visit.consultation}</p>
        {manual.map(([part], index) => (
          <p key={index} className="my-[1em]">
            {getBodyPartLabel(part)}
          </p>
        ))}
      </Alert>

      <Dialog open={open} onClose={() => setOpen(false)} slots={{ transition: SlideUp }}>
        <DialogBar title={`Data wizyty: ${visit.date}`}>
          <DeleteVisit patientId={patientId} visitId={visit.id} onDeleted={() => setOpen(false)} />
          <UpdateVisit patientId={patientId} visit={visit} />
        </DialogBar>
        <DialogBar title="Kwestionariusz konsultacyjny" variant="h4" />
        <List>
          <ListItemButton>
            <ListItemText primary="Część ciała poddana zabiegowi / rezultat" secondary={visit.consultation} />
          </ListItemButton>
          <ListItemButton>
            <ListItemText primary="Inne uwagi" secondary={visit.notes} />
          </ListItemButton>
        </List>
        <DialogBar title="Badanie manualne" />
        <List>
          {manual.map(([part, value], index) => (
            <Fragment key={index}>
              <ListItemButton>
                {Array.isArray(value) ? (
                  <>
                    <ListItemText primary={getBodyPartLabel(part)} />
                    {value.map((iconName) => {
                      const icon = getRotationIcon(iconName)
                      return (
                        icon && (
                          <img key={iconName} src={icon.src} alt={iconName} className="m-[5px] h-[50px] bg-[rgb(255_0_0/0.5)]" />
                        )
                      )
                    })}
                  </>
                ) : (
                  <ListItemText primary={getBodyPartLabel(part)} secondary={value || undefined} />
                )}
              </ListItemButton>
              <Divider />
            </Fragment>
          ))}
        </List>
      </Dialog>
    </div>
  )
}
