import React, { Component } from "react";
import * as firebase from 'firebase';
import PhoneInTalkOutlinedIcon from '@material-ui/icons/PhoneInTalkOutlined';
import GetVisitInfo from './GetVisitInfo'
import ViewInterview from './ViewInterview';
import Alert from '@material-ui/lab/Alert';

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
        const { email, name, surname, phone_number, age, occupation, interview } = this.state.patient;
        return <div style={{ color: 'black' }}>
            {/* <h2>Dane pacjenta</h2> */}
            <Alert icon={false} severity="info"><span style={{fontSize: '1.5rem'}}>Dane pacjenta</span></Alert>
            <p><strong>Imię i nazwisko:</strong> {name + " " + surname}</p>
            <p><strong>Wiek:</strong> {age}</p>
            <p><strong><PhoneInTalkOutlinedIcon /></strong> {phone_number}</p>
            <p><strong>Zawód/Praca/Aktywność: </strong>{occupation}</p>
            {interview ? <ViewInterview interview={interview} /> : <Alert severity="warning">Brak wywiadu!</Alert>}
            <hr></hr>
            <GetVisitInfo id={this.props.id} />
        </div>
    }
}
