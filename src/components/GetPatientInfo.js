import React, { Component } from "react";
import * as firebase from 'firebase';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import PhoneInTalkOutlinedIcon from '@material-ui/icons/PhoneInTalkOutlined';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

export default class GetPatientInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            patient: false
        }
    }

    componentDidMount() {
        const rootRef = firebase.database().ref("patients").child(this.props.id);
        rootRef.on('value', snap => {
            this.setState({
                patient: snap.val()
            })
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.id !== this.props.id) {
            const rootRef = firebase.database().ref("patients").child(this.props.id);
            rootRef.on('value', snap => {
                this.setState({
                    patient: snap.val()
                })
            })
        }
    }

    render() {

        const { first_name, last_name, email, phone_number, visits } = this.state.patient;
        return <div style={{ color: 'black' }}>
            <h2>Dane pacjenta</h2>
            <p><strong>Imię:</strong> {first_name}</p>
            <p><strong>Nazwisko:</strong> {last_name}</p>
            <p><strong><MailOutlineIcon /></strong> {email}</p>
            <p><strong><PhoneInTalkOutlinedIcon /></strong> {phone_number}</p>
            <hr></hr>
            <div className='add-visit'><h2>Wizyty <Button variant="contained" color="secondary">Dodaj nową wizytę</Button></h2></div>
            {visits? visits.map((visit, index) => <p key={index}><Button variant="contained" color="primary">{visit.date}</Button></p>) : <p>Brak wizyt!</p>}
        </div>
    }
}
