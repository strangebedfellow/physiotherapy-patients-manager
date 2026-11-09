import { Fragment, useId, useReducer, useState } from 'react'
import Alert from '@mui/material/Alert'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Switch from '@mui/material/Switch'
import TextField from '@mui/material/TextField'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import AddBoxIcon from '@mui/icons-material/AddBox'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { push } from 'firebase/database'
import { showWriteError, visitsRef } from '../lib/db'
import {
  createManualTestState,
  formatVisitDate,
  manualTestReducer,
  serializeManualTest,
} from '../lib/visit'
import bodyParts from './renderData/bodyParts'
import ActionButton from './ui/ActionButton'
import DialogBar from './ui/DialogBar'

export default function AddVisit({ patientId }: { patientId: string }) {
  const titleId = useId()
  const [open, setOpen] = useState(false)
  const [consultation, setConsultation] = useState('')
  const [notes, setNotes] = useState('')
  const [date, setDate] = useState(() => new Date())
  const [manualTest, dispatch] = useReducer(manualTestReducer, undefined, createManualTestState)

  const close = () => {
    setOpen(false)
    setConsultation('')
    setNotes('')
    dispatch({ type: 'reset' })
  }

  const handleSubmit = () => {
    push(visitsRef(patientId), {
      consultation,
      date: formatVisitDate(date),
      manual: serializeManualTest(manualTest),
      notes,
    }).catch(showWriteError)
    close()
  }

  return (
    <>
      <ActionButton title="Dodaj wizytę" icon={<AddBoxIcon />} onClick={() => setOpen(true)} />
      <Dialog open={open} maxWidth="lg" fullWidth aria-labelledby={titleId}>
        <AppBar position="relative">
          <Toolbar className="gap-4 py-2">
            <DatePicker
              label="Data wizyty"
              value={date}
              format="d MMM yyyy"
              onChange={(value) => value && setDate(value)}
              // Wariant "filled" trzyma etykietę wewnątrz białego pola — czytelna na niebieskim pasku.
              slotProps={{ textField: { size: 'small', variant: 'filled', className: 'rounded bg-white' } }}
            />
            <Typography id={titleId} variant="h6">
              Kwestionariusz konsultacyjny
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <TextField
            name="consultation"
            label="Część ciała poddana zabiegowi / rezultat"
            value={consultation}
            onChange={(event) => setConsultation(event.target.value)}
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <DialogBar title="Badanie manualne" dense />
          <List component="nav" aria-label="Badanie manualne">
            {bodyParts.map((part) => {
              const item = manualTest[part.name]
              return (
                <Fragment key={part.name}>
                  <ListItem className={item.chosen ? 'bg-brand-light' : 'bg-white'}>
                    <Switch
                      checked={item.chosen}
                      onChange={() => dispatch({ type: 'toggle', part: part.name })}
                      color="primary"
                      slotProps={{ input: { 'aria-label': part.fullName } }}
                    />
                    <ListItemText primary={part.fullName} />
                  </ListItem>
                  {item.chosen && (
                    <Alert icon={false} severity="info">
                      {'direction' in item ? (
                        <div className="flex flex-wrap">
                          {part.rotations?.map((icon) => (
                            <button
                              key={icon.name}
                              type="button"
                              className="rotation-icon"
                              aria-pressed={Boolean(item.direction[icon.name])}
                              onClick={() => dispatch({ type: 'toggleRotation', part: part.name, rotation: icon.name })}
                            >
                              <img src={icon.src} alt={icon.name} />
                            </button>
                          ))}
                        </div>
                      ) : (
                        <TextField
                          name={part.name}
                          label="Opis"
                          value={item.description || ''}
                          onChange={(event) => dispatch({ type: 'describe', part: part.name, value: event.target.value })}
                          variant="outlined"
                          fullWidth
                        />
                      )}
                    </Alert>
                  )}
                  <Divider />
                </Fragment>
              )
            })}
          </List>
          <TextField
            name="notes"
            label="Inne uwagi do badania"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            variant="outlined"
            margin="normal"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={close} color="primary">
            Anuluj
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Dodaj
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
