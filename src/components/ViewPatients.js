import React, { useState, useEffect } from "react";
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import EventNoteIcon from '@material-ui/icons/EventNote';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import GetPatientInfo from './GetPatientInfo';
import * as firebase from 'firebase';
import AddPatient from './AddPatient';
import Autocomplete from '@material-ui/lab/Autocomplete';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import logoSrc from '../img/smallklogo.jpg'

export default function ViewPatients() {
    const [patients, setPatients] = useState(false);
    const [chosen, setChosen] = useState(false);

    useEffect(() => {
        const rootRef = firebase.database().ref().child('patients');
        rootRef.on('value', snap => {
            const patients = [];
            snap.forEach((childSnap) => {
                patients.push({
                    id: childSnap.key,
                    ...childSnap.val()
                });
            });
            setPatients(patients)
        })
    }, [])

    const handleChange = (event, value) => {
        value ? setChosen(value.id) : setChosen(false);
    }

    const breakpoint = useMediaQuery('(max-width: 700px)')

    if (patients) {
        return (<>
            {/* get rid of inline styles! width/height normalize*/}
            <AppBar position="sticky" color='transparent'>
                <Toolbar>
                    <a className='calendar-link' href='https://calendar.google.com/' target="_blank">
                        <Tooltip TransitionComponent={Zoom} title="Otwórz kalendarz">
                            <IconButton edge="start" color="inherit" aria-label="menu">
                                <EventNoteIcon />
                            </IconButton>
                        </Tooltip>
                    </a>
                    <Tooltip TransitionComponent={Zoom} title="Wyloguj">
                        <IconButton edge="end" color="inherit" aria-label="menu"
                            onClick={() => firebase.auth().signOut()}>
                            <ExitToAppIcon />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>
            <Box bgcolor="rgb(33, 150, 243)" color="primary.contrastText" mb={2} p={2} boxShadow={3} width={1} display="flex" justifyContent="center" alignItems='center' flexDirection={breakpoint ? 'column' : 'row'}  >
                <img style={{ borderRadius: '10px', maxWidth: 300 }} src={logoSrc}></img>
                <Box bgcolor="white" display="flex" flexDirection='column' justifyContent="space-around" alignItems='center' m={2} p={2} borderRadius={10} boxShadow={2} width={300} height={115} >
                    <AddPatient setChosen={setChosen} />
                    <Autocomplete
                        id="combo-box-demo"
                        options={patients}
                        noOptionsText={'Nie znaleziono'}
                        onChange={handleChange}
                        getOptionLabel={(option) => option.name + ' ' + option.surname}
                        style={{ width: 285 }}
                        renderInput={(params) => <TextField {...params} label="Znajdź pacjenta" variant="outlined" />}
                    />
                </Box>
            </Box>
            <Container maxWidth="md">
                {chosen && <GetPatientInfo id={chosen} />}
            </Container>
        </>)
    }
    return null
}

