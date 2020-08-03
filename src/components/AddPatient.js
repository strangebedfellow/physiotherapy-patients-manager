// import React, { Component } from "react";
// import * as firebase from 'firebase';

// const AddPatient = () => {
//     console.log('add!!!');
//     const rootRef = firebase.database().ref('patients');
//         rootRef.push({
//             "age" : 33,
//             "name" : "Nowy",
//             "surname" : "Pacjent",
//             "occupation" : "Strażak",
//             "email" : "strazak@sam",
//             "phone_number" : "999"
//     })
// }

// export default AddPatient

import React, { useReducer } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as firebase from 'firebase';

export default function FormDialog() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);

    };

    const initialState = {
        name: '',
        surname: '',
        age: '',
        phoneNumber: '',
        email: '',
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
            "email": userInput.email,
            "phone_number": userInput.phoneNumber
        })
        setOpen(false);
    }

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Dodaj nowego pacjenta
      </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Uzupełnij dane pacjenta</DialogTitle>
                <DialogContent>
                    {/* dodać walidację (puste pola) */}
                    <form noValidate autoComplete="off">
                        <TextField name="name" onChange={handleChange} style={{ marginBottom: '1rem' }} id="outlined-basic" label="Imię" variant="outlined" type="text" fullWidth />
                        <TextField name="surname" onChange={handleChange} style={{ marginBottom: '1rem' }} id="outlined-basic" label="Nazwisko" variant="outlined" type="text" fullWidth />
                        <TextField name="age" onChange={handleChange} style={{ marginBottom: '1rem' }} id="outlined-basic" label="Wiek" variant="outlined" type="number" fullWidth />
                        <TextField name="phoneNumber" onChange={handleChange} style={{ marginBottom: '1rem' }} id="outlined-basic" label="Telefon" variant="outlined" type="text" fullWidth />
                        <TextField name="email" onChange={handleChange} style={{ marginBottom: '1rem' }} id="outlined-basic" label="e-mail" variant="outlined" type="email" fullWidth />
                        <TextField name="occupation" onChange={handleChange} style={{ marginBottom: '1rem' }} id="outlined-basic" label="Zawód/Praca/Aktywność" variant="outlined" type="text" fullWidth />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Anuluj
          </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Dodaj
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
