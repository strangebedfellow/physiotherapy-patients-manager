import React, { Component } from "react";
import * as firebase from 'firebase';
import PhoneInTalkOutlinedIcon from '@material-ui/icons/PhoneInTalkOutlined';
import GetVisitInfo from './GetVisitInfo'
import ViewInterview from './ViewInterview';
import AddInterview from './AddInterview';
import PatientDocuments from './PatientDocuments';
import AddPatientDocument from './AddPatientDocument';
import Alert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
import { borders } from '@material-ui/system';
import { shadows } from '@material-ui/system';


export default class GetPatientInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            patient: false,
            showvisits: false
        }
    }

    componentDidMount() {
        const ref = firebase.database().ref("patients");
        ref.once("value")
            .then((snapshot) => {
                const patient = snapshot.child(this.props.id).val();
                this.setState({
                    patient: patient
                })
            });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.id !== this.props.id) {
            const ref = firebase.database().ref("patients");
            ref.once("value")
                .then((snapshot) => {
                    const patient = snapshot.child(this.props.id).val();
                    this.setState({
                        patient: patient
                    })
                });
        }
    }

    render() {
        const { name, surname, phone_number, age, occupation, interview } = this.state.patient;
        return <div style={{ color: 'black' }}>
            <Box bgcolor="white" color="primary.contrastText" my={2} p={2} border={1} borderColor="rgb(33, 150, 243)" borderRadius={10} boxShadow={3}>
                <Alert icon={false} variant="filled" severity="info"><span style={{ fontSize: '1.5rem' }}>Dane pacjenta</span></Alert>
                <p></p>
                <Alert icon={false} variant="outlined" severity="success"><strong>Imię i nazwisko: </strong>{name + " " + surname}</Alert>
                <p></p>
                <Alert icon={false} variant="outlined" severity="success"><strong>Wiek: </strong>{age}</Alert>
                <p></p>
                <Alert icon={false} variant="outlined" severity="success"><strong><PhoneInTalkOutlinedIcon /></strong> {phone_number}</Alert>
                <p></p>
                <Alert icon={false} variant="outlined" severity="success"><strong>Zawód/Praca/Aktywność: </strong>{occupation}</Alert>
                <p></p>
                {interview ? <ViewInterview interview={interview} /> : <div><Alert severity="warning">Brak wywiadu!</Alert><p></p><AddInterview /></div>}
                <p></p>
                <Alert icon={false} variant="outlined" severity="info">
                    <PatientDocuments />
                    <p></p>
                    <AddPatientDocument />
                </Alert>
            </Box>
            <GetVisitInfo id={this.props.id} />
        </div>
    }
}
