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
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {sectionTitleStyle} from './customMuiStyles';
import { borders } from '@material-ui/system';
import { shadows } from '@material-ui/system';


export default class GetPatientInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            patient: false
        }
    }

    getPatientData = () => {
        const ref = firebase.database().ref("patients");
        ref.once("value") //!!!! OPCJA: zmienić na ref.on !!!!!!!!!!!!
            .then((snapshot) => {
                const patient = snapshot.child(this.props.id).val();
                this.setState({
                    patient: patient
                })
            });
    }

    componentDidMount() {
        this.getPatientData();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.id !== this.props.id) {
            this.getPatientData();
        }
    }

    render() {
        const { name, surname, phone_number, age, occupation, interview } = this.state.patient;
        return <div style={{ color: 'black' }}>
            <Box bgcolor="white" color="primary.contrastText" my={2} p={2} border={1} borderRadius={10} boxShadow={2}>
                <Alert icon={false} variant="filled" severity="info"><span style={sectionTitleStyle}>Dane pacjenta</span></Alert>
                <p></p>
                <Alert icon={false} variant="outlined" severity="success"><strong>Imię i nazwisko: </strong>{name + " " + surname}</Alert>
                <p></p>
                <Alert icon={false} variant="outlined" severity="success"><strong>Wiek: </strong>{age}</Alert>
                <p></p>
                <Alert icon={false} variant="outlined" severity="success"><strong><PhoneInTalkOutlinedIcon /></strong> {phone_number}</Alert>
                <p></p>
                <Alert icon={false} variant="outlined" severity="success"><strong>Zawód/Praca/Aktywność: </strong>{occupation}</Alert>
                <p></p>
                {interview ? <ViewInterview interview={interview} /> : <div><Alert severity="warning">Brak wywiadu!</Alert><p></p><AddInterview id={this.props.id} action={this.getPatientData} /></div>}
                <p></p>
                <ButtonGroup p={2}>
                    <Box mr={2}>
                        <PatientDocuments />
                    </Box>
                    <AddPatientDocument />
                </ButtonGroup>
            </Box>
            <GetVisitInfo id={this.props.id} />
        </div>
    }
}
