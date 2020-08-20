import React, { useState } from 'react';
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
        setCase('');
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
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <Typography variant="h6" color="inherit">Data wizyty: {currentDate} - Kwestionariusz konsultacyjny</Typography>
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
                        <ListItem >
                            <Switch
                                color="primary"
                                name="checkedB"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                            <ListItemText primary="Crista iliaca" />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <Switch
                                color="primary"
                                name="checkedB"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                            <ListItemText primary="SIPS" />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <Switch
                                color="primary"
                                name="checkedB"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                            <ListItemText primary="Sacrum" />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <Switch
                                color="primary"
                                name="checkedB"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                            <ListItemText primary="Wadliwe ustawienie Ilium i rotacja C1 w tym samym kierunku + staw TF" />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <Switch
                                color="primary"
                                name="checkedB"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                            <ListItemText primary="Ilium, Th6, C6, C2, C1 + staw TF" />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <Switch
                                color="primary"
                                name="checkedB"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                            <ListItemText primary="L5, Th5, C5 (często C2 i C1)" />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <Switch
                                color="primary"
                                name="checkedB"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                            <ListItemText primary="L4, Th4, C4" />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <Switch
                                color="primary"
                                name="checkedB"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                            <ListItemText primary="L3, Th3, C3" />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <Switch
                                color="primary"
                                name="checkedB"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                            <ListItemText primary="L2, Th2, C2 (kompleksem C0 - C2)" />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <Switch
                                color="primary"
                                name="checkedB"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                            <ListItemText primary="L1, Th1, C1 (kompleksem C0 - C2)" />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <Switch
                                color="primary"
                                name="checkedB"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                            <ListItemText primary="Stopa, miednica, C1" />
                        </ListItem>
                        <Divider />
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
