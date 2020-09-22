import React, { useState, useReducer } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddBoxIcon from '@material-ui/icons/AddBox';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import * as firebase from 'firebase';

export default function AddInterview(props) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setUserInput(initialState);
    };

    const initialState = {
        iq1: '',
        iq2: '',
        iq3: '',
        iq4: '',
        iq5: '',
        iq6: '',
        iq7: '',
        iq8: '',
        iq9: '',
        iq10: '',
        iq11: '',
        iq12: '',
        iq13: '',
        iq14: '',
    }

    const [userInput, setUserInput] = useReducer((state, newState) => ({ ...state, ...newState }), initialState);

    const handleChange = e => {
        setUserInput({ [e.target.name]: e.target.value });
    }

    const handleSubmit = () => {
        const rootRef = firebase.database().ref('patients').child(props.id).child('interview');
        rootRef.set({
            "iq1": userInput.iq1,
            "iq2": userInput.iq2,
            "iq3": userInput.iq3,
            "iq4": userInput.iq4,
            "iq5": userInput.iq5,
            "iq6": userInput.iq6,
            "iq7": userInput.iq7,
            "iq8": userInput.iq8,
            "iq9": userInput.iq9,
            "iq10": userInput.iq10,
            "iq11": userInput.iq11,
            "iq12": userInput.iq12,
            "iq13": userInput.iq13,
            "iq14": userInput.iq14
        })
        setOpen(false);
    }

    return (
        <div>
            <Button
                variant="contained"
                color="secondary"
                size="large"
                startIcon={<AddBoxIcon />}
                onClick={handleClickOpen}
            >Dodaj wywiad z pacjentem</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" disableEscapeKeyDown='true' disableBackdropClick='true' maxWidth='lg'>
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <Typography variant="h6" color="inherit">Uzupełnij wywiad</Typography>
                    </Toolbar>
                </AppBar>
                <DialogContent>
                    <form noValidate autoComplete="off">
                        <TextField name="iq1" onChange={handleChange} id="outlined-basic" label="Opis aktualnych dolegliwości / główny problem funkcjonalny pacjenta" variant="outlined" type="text" margin="normal" fullWidth />
                        <TextField name="iq2" onChange={handleChange} id="outlined-basic" label="Od kiedy objawy początkowe i jakie?" variant="outlined" type="text" margin="normal" fullWidth />
                        <TextField name="iq3" onChange={handleChange} id="outlined-basic" label="Charakter bólu (tępy, ostry, piekący, kłujący)" variant="outlined" type="text" margin="normal" fullWidth />
                        <TextField name="iq4" onChange={handleChange} id="outlined-basic" label="Ból stały / zmienny / co nasila ból" variant="outlined" type="text" margin="normal" fullWidth />
                        <TextField name="iq5" onChange={handleChange} id="outlined-basic" label="Co łagodzi ból?" variant="outlined" type="text" margin="normal" fullWidth />
                        <TextField name="iq6" onChange={handleChange} id="outlined-basic" label="Możliwa przyczyna" variant="outlined" type="text" margin="normal" fullWidth />
                        <TextField name="iq7" onChange={handleChange} id="outlined-basic" label="Poprzednie epizody" variant="outlined" type="text" margin="normal" fullWidth />
                        <TextField name="iq8" onChange={handleChange} id="outlined-basic" label="Czy były jakieś próby rehabilitacji - TAK / NIE. Jakie efekty?" variant="outlined" type="text" margin="normal" fullWidth />
                        <TextField name="iq9" onChange={handleChange} id="outlined-basic" label="Red flags" variant="outlined" type="text" margin="normal" fullWidth />
                        <TextField name="iq10" onChange={handleChange} id="outlined-basic" label="Badania obrazowe" variant="outlined" type="text" margin="normal" fullWidth />
                        <TextField name="iq11" onChange={handleChange} id="outlined-basic" label="Inne dolegliwości" variant="outlined" type="text" margin="normal" fullWidth />
                        <TextField name="iq12" onChange={handleChange} id="outlined-basic" label="Przebyte operacje" variant="outlined" type="text" margin="normal" fullWidth />
                        <TextField name="iq13" onChange={handleChange} id="outlined-basic" label="Przebyte choroby / wypadki" variant="outlined" type="text" margin="normal" fullWidth />
                        <TextField name="iq14" onChange={handleChange} id="outlined-basic" label="Czy występują problemy ze zmianą pozycji, zachwiania równowagi - TAK / NIE`" variant="outlined" type="text" margin="normal" fullWidth />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Anuluj</Button>
                    <Button onClick={handleSubmit} color="primary">Dodaj</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
