import React, { useState, useReducer } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import EditIcon from '@material-ui/icons/Edit';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import interviewQuestions from './renderData/interviewQuestions';
import * as firebase from 'firebase';

export default function UpdateInterview(props) {
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
        const rootRef = firebase.database().ref('patients/' + props.id + '/interview');
        userInput.iq1 && rootRef.update({ "iq1": userInput.iq1 });
        userInput.iq2 && rootRef.update({ "iq2": userInput.iq2 });
        userInput.iq3 && rootRef.update({ "iq3": userInput.iq3 });
        userInput.iq4 && rootRef.update({ "iq4": userInput.iq4 });
        userInput.iq5 && rootRef.update({ "iq5": userInput.iq5 });
        userInput.iq6 && rootRef.update({ "iq6": userInput.iq6 });
        userInput.iq7 && rootRef.update({ "iq7": userInput.iq7 });
        userInput.iq8 && rootRef.update({ "iq8": userInput.iq8 });
        userInput.iq9 && rootRef.update({ "iq9": userInput.iq9 });
        userInput.iq10 && rootRef.update({ "iq10": userInput.iq10 });
        userInput.iq11 && rootRef.update({ "iq11": userInput.iq11 });
        userInput.iq12 && rootRef.update({ "iq12": userInput.iq12 });
        setOpen(false);
    }
    return (
        <div>
            <Tooltip TransitionComponent={Zoom} title="Edytuj wywiad z pacjentem">
                <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={handleClickOpen}
                >
                    <EditIcon />
                </Button>
            </Tooltip>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" disableEscapeKeyDown='true' disableBackdropClick='true' maxWidth='lg'>
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <Typography variant="h6" color="inherit">Edycja wywiadu</Typography>
                    </Toolbar>
                </AppBar>
                <DialogContent>
                    <form noValidate autoComplete="off">
                        {interviewQuestions.map((question) => <>
                            <TextField
                                name={question.name}
                                onChange={handleChange}
                                id="outlined-basic"
                                label={question.question}
                                variant="outlined"
                                type="text"
                                margin="normal"
                                defaultValue={props.interview[question.name]}
                                fullWidth />
                        </>)}
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Anuluj</Button>
                    <Button onClick={handleSubmit} color="primary">Zaktualizuj</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
