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
import { Alert } from '@material-ui/lab';
import { sectionTitleStyle } from './customMuiStyles';

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

    console.log()

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
                <img style={{ borderRadius: '10px', maxWidth: 300 }} src={logoSrc} onClick={() => document.querySelector(".MuiAutocomplete-clearIndicator").click()}></img>
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
                {chosen ? <GetPatientInfo id={chosen} /> :
                    <Box bgcolor="rgb(33, 150, 243)" color="primary.contrastText" mt={10} p={2} border={1} borderRadius={10} boxShadow={1} display="flex" flexDirection="column" alignItems='center'>
                     <Box display="flex" justifyContent="center" mb={2}>
                        <Alert icon={false} variant="filled" severity="info">
                                <span style={sectionTitleStyle}>Nadchodzące wizyty</span>
                        </Alert>
                        </Box>
                        <iframe src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23EF6C00&amp;ctz=Europe%2FWarsaw&amp;src=ZWdvc3ludG9uaWNAZ21haWwuY29t&amp;color=%23E67C73&amp;showTitle=0&amp;showNav=0&amp;showDate=0&amp;showPrint=0&amp;showTabs=0&amp;showCalendars=0&amp;showTz=0&amp;mode=WEEK&amp;hl=pl" style={{ border: '2px solid white' }} width="600" height="400" frameborder="0" scrolling="no"></iframe></Box>}
            </Container>
        </>)
    }
    return null
}

