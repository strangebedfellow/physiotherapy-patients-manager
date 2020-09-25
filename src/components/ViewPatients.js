import React, { useState, useEffect } from "react";
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import GetPatientInfo from './GetPatientInfo';
import * as firebase from 'firebase';
import AddPatient from './AddPatient';
import Autocomplete from '@material-ui/lab/Autocomplete';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import imgsrc from '../img/logo.png'

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

    if (patients) {
        return (<>
            <Box bgcolor="rgb(33, 150, 243)" color="primary.contrastText" mb={2} p={2} boxShadow={3} width={1} display="flex" justifyContent="center" >
                <img style={{ borderRadius: '10px' }} src={imgsrc}></img>
                <Box bgcolor="white" display="flex" flexDirection='column' justifyContent="space-around" alignItems='center' mx={2} p={2} borderRadius={10} boxShadow={2}>
                    <AddPatient />
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

