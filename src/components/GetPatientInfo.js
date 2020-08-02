import React, { Component } from "react";
import * as firebase from 'firebase';
import PhoneInTalkOutlinedIcon from '@material-ui/icons/PhoneInTalkOutlined';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import GetVisitInfo from './GetVisitInfo'

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
                const name = snapshot.child(this.props.id).val();
                this.setState({
                    patient: name
                })
            });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.id !== this.props.id) {
            const ref = firebase.database().ref("patients");
            ref.once("value")
                .then((snapshot) => {
                    const name = snapshot.child(this.props.id).val();
                    this.setState({
                        patient: name
                    })
                });
        }
    }

    handleClick = (e) => {
       // console.log(e.date);  
    }

    render() {
       // console.log(this.state.showvisits);
        const { email, name, surname, phone_number, age, occupation } = this.state.patient;
        return <div style={{ color: 'black' }}>
            <h2>Dane pacjenta</h2>
            <p><strong>Imię i nazwisko:</strong> {name + " " + surname}</p>
            <p><strong>Wiek:</strong> {age}</p>
            <p><strong>E-mail: <MailOutlineIcon /></strong> {email}</p>
            <p><strong>Telefon <PhoneInTalkOutlinedIcon /></strong> {phone_number}</p>
            <p><strong>Zawód/Praca/Aktywność: </strong>{occupation}</p>
            <hr></hr>
            <GetVisitInfo id={this.props.id} />
        </div>
    }
}
