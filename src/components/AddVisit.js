import React, { useState, useReducer } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as firebase from 'firebase';

export default function AddVisit(props) {
    const [open, setOpen] = useState(false);
    const [consultation, setCase] = useState('');

    const monthNames = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    let dateObj = new Date();
    let month = monthNames[dateObj.getMonth()];
    let day = String(dateObj.getDate()).padStart(2, '0');
    let year = dateObj.getFullYear();
    let currentDate = year + '.' + month + '.' + day;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = e => {
        setCase(e.target.value);
    }

    const handleSubmit = () => {
        const rootRef = firebase.database().ref('patients').child(props.id).child('visits');
        rootRef.push({
            "case": consultation,
            "date": currentDate
        })
        setOpen(false);
    }
    return (
        <div>
            <Button size="large" variant="contained" color="secondary" onClick={handleClickOpen}>Dodaj nową wizytę</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Data wizyty: {currentDate} - Kwestionariusz konsultacyjny</DialogTitle>
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Anuluj</Button>
                    <Button onClick={handleSubmit} color="primary">Dodaj</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
