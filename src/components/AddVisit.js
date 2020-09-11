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
import GetCurrentDate from './GetCurrentDate';
import bodyParts from './bodyParts';
import { cristaIliacaRotations, mainRotations, sacrumRotations } from './rotationIcons';
import * as firebase from 'firebase';

export default function AddVisit(props) {
    const [open, setOpen] = useState(false);
    const [consultation, setCase] = useState('');

    const initialState = {
        cristaIliaca: {
            chosen: false,
            direction: {
                i8: false,
                i9: false,
                i10: false,
                i11: false
            }
        },
        sips: {
            chosen: false,
            direction: {
                i8: false,
                i9: false,
                i10: false,
                i11: false
            }
        },
        sacrum: {
            chosen: false,
            direction: {
                i12: false,
                i13: false
            }
        },
        ilium: {
            chosen: false,
            direction: {
                i2: false,
                i3: false,
                i4: false,
                i5: false,
                i6: false,
                i7: false
            }
        },
        l6: {
            chosen: false,
            direction: {
                i2: false,
                i3: false,
                i4: false,
                i5: false,
                i6: false,
                i7: false
            }
        },
        l5: {
            chosen: false,
            direction: {
                i2: false,
                i3: false,
                i4: false,
                i5: false,
                i6: false,
                i7: false
            }
        },
        l4: {
            chosen: false,
            direction: {
                i2: false,
                i3: false,
                i4: false,
                i5: false,
                i6: false,
                i7: false
            }
        },
        l3: {
            chosen: false,
            direction: {
                i2: false,
                i3: false,
                i4: false,
                i5: false,
                i6: false,
                i7: false
            }
        },
        l2: {
            chosen: false,
            direction: {
                i2: false,
                i3: false,
                i4: false,
                i5: false,
                i6: false,
                i7: false
            }
        },
        l1: {
            chosen: false,
            direction: {
                i2: false,
                i3: false,
                i4: false,
                i5: false,
                i6: false,
                i7: false
            }
        },
        c1: {
            chosen: false,
            direction: {
                i2: false,
                i3: false,
                i4: false,
                i5: false,
                i6: false,
                i7: false
            }
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
        setCase('');
        setManualTest({ type: 'reset' });
    };

    const handleChange = e => {
        setCase(e.target.value);
    }

    const handleSubmit = () => {
        const rootRef = firebase.database().ref('patients').child(props.id).child('visits');
        rootRef.push({
            "case": consultation,
            "date": GetCurrentDate(),
            "manual": Object.fromEntries(filterManualTest())
        })
        setOpen(false);
    }

    function filterManualTest() {
        const entries = Object.entries(manualTest);
        const filtered = [];
        entries.forEach(item => {
            if (item[1].chosen) {
                filtered.push(item)
            }
        })
        return filtered
    }

    return (
        <div>
            <Button
                variant="contained"
                color="secondary"
                size="large"
                startIcon={<AddBoxIcon />}
                onClick={handleClickOpen}
            >Dodaj nową wizytę</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth='lg' fullWidth='true'>
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <Typography variant="h6" color="inherit">Data wizyty: {GetCurrentDate()} - Kwestionariusz konsultacyjny</Typography>
                    </Toolbar>
                </AppBar>
                <DialogContent>
                    <form noValidate autoComplete="off">
                        <TextField
                            name="consultation"
                            onChange={handleChange}
                            id="outlined-basic"
                            label="Część ciała poddana zabiegowi / rezultat"
                            variant="outlined"
                            type="text"
                            margin="normal"
                            fullWidth />
                    </form>
                    <AppBar position="static">
                        <Toolbar variant="dense">
                            <Typography variant="h6" color="inherit">Badanie manualne</Typography>
                        </Toolbar>
                    </AppBar>
                    <List component="nav" aria-label="mailbox folders">
                        {bodyParts.map((part, index) =>
                            <>
                                <ListItem key={index} style={{ backgroundColor: manualTest[part.name].chosen ? '#e8f4fd' : 'white' }}>
                                    <Switch
                                        onChange={(event) => {
                                            setManualTest({ type: 'choose', payload: event.currentTarget.getAttribute('name') });
                                        }}
                                        color="primary"
                                        name={part.name}
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                    <ListItemText primary={part.fullName} />
                                </ListItem>
                                {manualTest[part.name].chosen &&
                                    <Alert style={{ height: '50px' }} icon={false} severity="info">
                                        {(part.name == 'ilium'
                                            || part.name == 'l6'
                                            || part.name == 'l5'
                                            || part.name == 'l4'
                                            || part.name == 'l3'
                                            || part.name == 'l2'
                                            || part.name == 'l1'
                                            || part.name == 'c1') &&
                                            mainRotations.map((e, index) => <img
                                                src={e.src}
                                                key={index}
                                                name={e.name}
                                                className='icon-style'
                                                onClick={(event) => {
                                                    setManualTest({ type: 'direction', payload: { name: part.name, rotation: event.currentTarget.getAttribute('name') } });
                                                }}
                                                style={{ background: manualTest[part.name].direction[e.name] ? 'rgba(255,0,0,0.5)' : 'transparent', border: manualTest[part.name].direction[e.name] && '1px solid transparent' }} />)}
                                        {(part.name == 'cristaIliaca' || part.name == 'sips') &&
                                            cristaIliacaRotations.map((e, index) => <img
                                                src={e.src}
                                                key={index}
                                                name={e.name}
                                                className='icon-style'
                                                onClick={(event) => {
                                                    setManualTest({ type: 'direction', payload: { name: part.name, rotation: event.currentTarget.getAttribute('name') } });
                                                }}
                                                style={{ background: manualTest[part.name].direction[e.name] ? 'rgba(255,0,0,0.5)' : 'transparent', border: manualTest[part.name].direction[e.name] && '1px solid transparent' }} />)
                                        }
                                        {part.name == 'sacrum' &&
                                            sacrumRotations.map((e, index) => <img
                                                src={e.src}
                                                key={index}
                                                name={e.name}
                                                className='icon-style'
                                                onClick={(event) => {
                                                    setManualTest({ type: 'direction', payload: { name: part.name, rotation: event.currentTarget.getAttribute('name') } });
                                                }}
                                                style={{ background: manualTest[part.name].direction[e.name] ? 'rgba(255,0,0,0.5)' : 'transparent', border: manualTest[part.name].direction[e.name] && '1px solid transparent' }} />)}
                                    </Alert>}
                                <Divider />
                            </>)}
                    </List>
                    <form noValidate autoComplete="off">
                        <TextField
                            name="manual"
                            id="outlined-basic"
                            label="Inne uwagi do badania"
                            variant="outlined"
                            type="text"
                            margin="normal"
                            fullWidth />
                    </form>
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
