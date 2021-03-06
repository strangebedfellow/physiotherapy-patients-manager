import React, { useState, useReducer } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import * as firebase from 'firebase';

export default function AddPatient(props) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setUserInput(initialState);
    };

    const initialState = {
        name: '',
        surname: '',
        age: '',
        phoneNumber: '',
        occupation: ''
    }

    const [userInput, setUserInput] = useReducer((state, newState) => ({ ...state, ...newState }), initialState);
    //przerobić na resetting state (dispatch)

    const handleChange = e => {
        setUserInput({ [e.target.name]: e.target.value });
    }

    const handleSubmit = () => {
        const rootRef = firebase.database().ref('patients');
        rootRef.push({
            "age": userInput.age,
            "name": userInput.name,
            "surname": userInput.surname,
            "occupation": userInput.occupation,
            "phone_number": userInput.phoneNumber
        }).once('value')
            .then((snap) => props.setChosen(snap.key));
        setOpen(false);
        setUserInput(initialState);
    }
    return (
        <Box my={2}>
            <Button
                variant="contained"
                color="secondary"
                size="large"
                startIcon={<PersonAddIcon />}
                onClick={handleClickOpen}
            >
                Dodaj nowego pacjenta
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" disableEscapeKeyDown={true} disableBackdropClick={true}>
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <Typography variant="h5" color="inherit">Uzupełnij dane pacjenta</Typography>
                    </Toolbar>
                </AppBar>
                <DialogContent>
                    <form noValidate autoComplete="off">
                        <TextField name="name" onChange={handleChange} id="outlined-basic" label="Imię" variant="outlined" type="text" margin="normal" fullWidth />
                        <TextField name="surname" onChange={handleChange} id="outlined-basic" label="Nazwisko" variant="outlined" type="text" margin="normal" fullWidth />
                        <TextField name="age" onChange={handleChange} id="outlined-basic" label="Wiek" variant="outlined" type="number" margin="normal" fullWidth />
                        <TextField name="phoneNumber" onChange={handleChange} id="outlined-basic" label="Telefon" variant="outlined" type="text" margin="normal" fullWidth />
                        <TextField name="occupation" onChange={handleChange} id="outlined-basic" label="Zawód/Praca/Aktywność" variant="outlined" type="text" margin="normal" fullWidth />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Anuluj
                     </Button>
                    {/* {!userInput.name || !userInput.surname || !userInput.age || !userInput.occupation || !userInput.phoneNumber || isNaN(userInput.phoneNumber) ? */}
                    {!userInput.name || !userInput.surname ?
                        <Button color="primary" disabled>Dodaj</Button> :
                        <Button onClick={handleSubmit} color="primary">Dodaj</Button>}
                </DialogActions>
            </Dialog>
        </Box>
    );
}
