import React, { useEffect, useState } from "react";
import { gapi } from 'gapi-script';
import * as firebase from 'firebase';
import PhoneInTalkOutlinedIcon from '@material-ui/icons/PhoneInTalkOutlined';
import GetVisitInfo from './GetVisitInfo'
import ViewInterview from './ViewInterview';
import AddInterview from './AddInterview';
import PatientDocuments from './PatientDocuments';
import AddPatientDocument from './AddPatientDocument';
import UpdatePatientData from './UpdatePatientData';
import { Alert } from '@material-ui/lab';
import Box from '@material-ui/core/Box';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { sectionTitleStyle } from './customMuiStyles';

export default function GetPatientInfo(props) {
    const [patient, setPatient] = useState(false);

    useEffect(() => {
        const refon = firebase.database().ref('patients/' + props.id);
        refon.on('value', snap => {
            setPatient(snap.val())
        });
    }, [props])

    const { name, surname, phone_number, age, occupation, interview } = patient;
    return (<div style={{ color: 'black' }}>
        <Box bgcolor="white" color="primary.contrastText" my={2} p={2} border={1} borderRadius={10} boxShadow={2}>
            <Alert icon={false} variant="filled" severity="info">
                <Box display="flex" justifyContent="space-between">
                    <span style={sectionTitleStyle}>Dane pacjenta</span>
                    <UpdatePatientData patient={patient} id={props.id} />
                </Box>
            </Alert>
            <p></p>
            <Alert icon={false} variant="outlined" severity="success"><strong>Imię i nazwisko: </strong>{name + " " + surname}</Alert>
            <p></p>
            <Alert icon={false} variant="outlined" severity="success"><strong>Wiek: </strong>{age}</Alert>
            <p></p>
            <Alert icon={false} variant="outlined" severity="success"><strong><PhoneInTalkOutlinedIcon /></strong> {phone_number}</Alert>
            <p></p>
            <Alert icon={false} variant="outlined" severity="success"><strong>Zawód/Praca/Aktywność: </strong>{occupation}</Alert>
            <p></p>
            {interview ? <ViewInterview interview={interview} id={props.id} /> : <Alert severity="warning"><strong>Brak wywiadu!</strong><p></p><AddInterview id={props.id} /></Alert>}
            <p></p>
            <ButtonGroup p={2}>
                <Box mr={2}>
                    <PatientDocuments id={props.id} />
                </Box>
                <AddPatientDocument id={props.id} />
            </ButtonGroup>
        </Box>
        <GetVisitInfo id={props.id} />
    </div>)
}
