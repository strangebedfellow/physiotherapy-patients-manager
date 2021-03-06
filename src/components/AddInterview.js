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
import interviewQuestions from './renderData/interviewQuestions';
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
        iq12: ''
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
            "iq12": userInput.iq12
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
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" disableEscapeKeyDown={true} disableBackdropClick={true} maxWidth='lg'>
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <Typography variant="h6" color="inherit">Uzupełnij wywiad</Typography>
                    </Toolbar>
                </AppBar>
                <DialogContent>
                    <form noValidate autoComplete="off">
                        {interviewQuestions.map((question, index) =>
                            <TextField
                                name={question.name}
                                onChange={handleChange}
                                key={index}
                                id="outlined-basic"
                                label={question.question}
                                variant="outlined"
                                type="text"
                                margin="normal"
                                fullWidth />
                        )}
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
