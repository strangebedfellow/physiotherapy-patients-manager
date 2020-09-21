import React, { useState, useReducer, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import EditIcon from '@material-ui/icons/Edit';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import * as firebase from 'firebase';

export default function UpdatePatientData(props) {
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

    const handleChange = e => {
        setUserInput({ [e.target.name]: e.target.value });
    }

    const handleSubmit = () => {
        const rootRef = firebase.database().ref('patients').child(props.id);
        userInput.name && rootRef.update({ "name": userInput.name });
        userInput.age && rootRef.update({ "age": userInput.age });
        userInput.surname && rootRef.update({ "surname": userInput.surname });
        userInput.occupation && rootRef.update({ "occupation": userInput.occupation });
        userInput.phoneNumber && rootRef.update({ "phone_number": userInput.phoneNumber });
        setOpen(false);
    }

    return (
        <div>
            <Button
                variant="contained"
                color="secondary"
                size="small"
                // startIcon={<EditIcon />}
                onClick={handleClickOpen}
            >
                <EditIcon />
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" disableEscapeKeyDown='true' disableBackdropClick='true'>
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <Typography variant="h6" color="inherit">Edycja danych pacjenta</Typography>
                    </Toolbar>
                </AppBar>
                <DialogContent>
                    <form noValidate autoComplete="off">
                        <TextField name="name" onChange={handleChange} id="outlined-basic" label="Imię" variant="outlined" type="text" margin="normal" defaultValue={props.patient.name} fullWidth />
                        <TextField name="surname" onChange={handleChange} id="outlined-basic" label="Nazwisko" variant="outlined" type="text" margin="normal" defaultValue={props.patient.surname} fullWidth />
                        <TextField name="age" onChange={handleChange} id="outlined-basic" label="Wiek" variant="outlined" type="number" margin="normal" defaultValue={props.patient.age} fullWidth />
                        <TextField name="phoneNumber" onChange={handleChange} error={isNaN(userInput.phoneNumber)} id="outlined-basic" label="Telefon" variant="outlined" type="text" margin="normal" defaultValue={props.patient.phone_number} fullWidth />
                        <TextField name="occupation" onChange={handleChange} id="outlined-basic" label="Zawód/Praca/Aktywność" variant="outlined" type="text" margin="normal" defaultValue={props.patient.occupation} fullWidth />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Anuluj
                     </Button>
                    <Button onClick={handleSubmit} color="primary">Zaktualizuj</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
