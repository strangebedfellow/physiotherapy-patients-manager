import React, { useState, useReducer } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Switch from '@material-ui/core/Switch';
import Alert from '@material-ui/lab/Alert';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import GetCurrentDate from './GetCurrentDate';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import { pl } from "date-fns/locale";
import bodyParts from './renderData/bodyParts';
import { cristaIliacaRotations, sacrumRotations } from './renderData/rotationIcons';
import * as firebase from 'firebase';

export default function AddVisit(props) {
    const [open, setOpen] = useState(false);
    const [consultation, setConsultation] = useState('');
    const [notes, setNotes] = useState('');
    const [selectedDate, handleDateChange] = useState(new Date());

    const initialState = {
        cristaIliaca: {
            chosen: true,
            direction: {
                i8: false,
                i9: false,
                i10: false,
                i11: false
            }
        },
        sips: {
            chosen: true,
            direction: {
                i8: false,
                i9: false,
                i10: false,
                i11: false
            }
        },
        sacrum: {
            chosen: true,
            direction: {
                i12: false,
                i13: false
            }
        },
        ilium: {
            chosen: false,
            description: false
        },
        l6: {
            chosen: false,
            description: false
        },
        l5: {
            chosen: false,
            description: false
        },
        l4: {
            chosen: false,
            description: false
        },
        l3: {
            chosen: false,
            description: false
        },
        l2: {
            chosen: false,
            description: false
        },
        l1: {
            chosen: false,
            description: false
        },
        c1: {
            chosen: false,
            description: false
        }
    };

    function reducer(state, action) {
        switch (action.type) {
            case 'choose':
                return {
                    ...state,
                    [action.payload]: {
                        ...state[action.payload],
                        chosen: !state[action.payload].chosen
                    }
                };
            case 'description':
                return {
                    ...state,
                    [action.payload.name]: {
                        ...state[action.payload.name],
                        description: action.payload.value
                    }
                };
            case 'direction':
                return {
                    ...state,
                    [action.payload.name]: {
                        ...state[action.payload.name],
                        direction: {
                            ...state[action.payload.name].direction,
                            [action.payload.rotation]: !state[action.payload.name].direction[action.payload.rotation]
                        }
                    }
                };
            case 'reset':
                return initialState;
            default:
                throw new Error();
        }
    }

    const [manualTest, setManualTest] = useReducer(reducer, initialState);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setConsultation('');
        setNotes('');
        setManualTest({ type: 'reset' });
    };

    const handleConsultation = e => {
        setConsultation(e.target.value);
    }

    const handleNotes = e => {
        setNotes(e.target.value);
    }

    const handleSubmit = () => {
        const rootRef = firebase.database().ref('patients').child(props.id).child('visits');
        rootRef.push({
            "consultation": consultation,
            "date": GetCurrentDate(selectedDate), // change date format for firebase
            "manual": filterManualTest(),
            "notes": notes
        })
        setOpen(false);
        setConsultation('');
        setNotes('');
        setManualTest({ type: 'reset' });
    }

    function filterManualTest() { // filter state with chosen elements to push into firebase 
        const entries = Object.entries(manualTest);
        const filtered = [];
        entries.forEach(item => {
            if (item[1].chosen) {
                if (item[1].direction) {
                    const temp = [];
                    Object.entries(item[1].direction).forEach(e => {
                        e[1] && temp.push(e[0]);
                    });
                    filtered.push([item[0], temp]);
                }
                else {
                    const temp = item[1].description
                    filtered.push([item[0], temp]);
                }
            }
        })
        return filtered
    }
    //console.log(Object.fromEntries(filterManualTest()) )
    console.log(filterManualTest())
    return (
        <div>
            <Tooltip TransitionComponent={Zoom} title="Dodaj wizytę">
                <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={handleClickOpen}
                >
                    <AddBoxIcon />
                </Button>
            </Tooltip>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth='lg' fullWidth={true} disableEscapeKeyDown={true} disableBackdropClick={true}>
                <AppBar position="static">
                    <Toolbar variant="regular">
                        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={pl}>
                            <DatePicker
                                label="Data wizyty"
                                value={selectedDate}
                                format="d MMM yyyy"
                                onChange={handleDateChange}
                                animateYearScrolling
                            />
                        </MuiPickersUtilsProvider>
                        <Typography variant="h6" color="inherit"> Kwestionariusz konsultacyjny</Typography>
                    </Toolbar>
                </AppBar>
                <DialogContent>
                    <TextField
                        name="consultation"
                        onChange={handleConsultation}
                        id="outlined-basic"
                        label="Część ciała poddana zabiegowi / rezultat"
                        variant="outlined"
                        type="text"
                        margin="normal"
                        fullWidth />
                    <AppBar position="static">
                        <Toolbar variant="dense">
                            <Typography variant="h6" color="inherit">Badanie manualne</Typography>
                        </Toolbar>
                    </AppBar>
                    <List component="nav" aria-label="mailbox folders">
                        {bodyParts.map((part, index) =>
                            <React.Fragment key={index}>
                                <ListItem key={index} style={{ backgroundColor: manualTest[part.name].chosen ? '#e8f4fd' : 'white' }}>
                                    <Switch
                                        onChange={(event) => {
                                            setManualTest({ type: 'choose', payload: event.currentTarget.getAttribute('name') });
                                        }}
                                        checked={manualTest[part.name].chosen}
                                        color="primary"
                                        name={part.name}
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                    <ListItemText primary={part.fullName} />
                                </ListItem>
                                {manualTest[part.name].chosen &&
                                    <Alert icon={false} severity="info">
                                        {(part.name === 'ilium'
                                            || part.name === 'l6'
                                            || part.name === 'l5'
                                            || part.name === 'l4'
                                            || part.name === 'l3'
                                            || part.name === 'l2'
                                            || part.name === 'l1'
                                            || part.name === 'c1') &&
                                            <TextField
                                                name={part.name}
                                                onChange={(event) => {
                                                    setManualTest({ type: 'description', payload: { name: part.name, value: event.currentTarget.value } });
                                                }}
                                                id="outlined-basic"
                                                label="Opis"
                                                variant="outlined"
                                                type="text"
                                                fullWidth />
                                        }
                                        {(part.name === 'cristaIliaca' || part.name === 'sips') &&
                                            cristaIliacaRotations.map((e, index) => <img
                                                src={e.src}
                                                alt={e.src}
                                                key={index}
                                                name={e.name}
                                                className='icon-style'
                                                onClick={(event) => {
                                                    setManualTest({ type: 'direction', payload: { name: part.name, rotation: event.currentTarget.getAttribute('name') } });
                                                }}
                                                style={{
                                                    background: manualTest[part.name].direction[e.name] ? 'rgba(255,0,0,0.5)' : 'transparent',
                                                    border: manualTest[part.name].direction[e.name] && '1px solid transparent',
                                                    height: '50px'
                                                }} />)
                                        }
                                        {part.name === 'sacrum' &&
                                            sacrumRotations.map((e, index) => <img
                                                src={e.src}
                                                alt={e.src}
                                                key={index}
                                                name={e.name}
                                                className='icon-style'
                                                onClick={(event) => {
                                                    setManualTest({ type: 'direction', payload: { name: part.name, rotation: event.currentTarget.getAttribute('name') } });
                                                }}
                                                style={{
                                                    background: manualTest[part.name].direction[e.name] ? 'rgba(255,0,0,0.5)' : 'transparent',
                                                    border: manualTest[part.name].direction[e.name] && '1px solid transparent',
                                                    height: '50px'
                                                }} />)}
                                    </Alert>}
                                <Divider />
                            </React.Fragment>)}
                    </List>
                    <TextField
                        name="notes"
                        onChange={handleNotes}
                        id="outlined-basic"
                        label="Inne uwagi do badania"
                        variant="outlined"
                        type="text"
                        margin="normal"
                        fullWidth />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Anuluj</Button>
                    {!consultation ?
                        <Button color="primary" disabled>Dodaj</Button> :
                        <Button onClick={handleSubmit} color="primary">Dodaj</Button>}
                </DialogActions>
            </Dialog>
        </div>
    );
}
