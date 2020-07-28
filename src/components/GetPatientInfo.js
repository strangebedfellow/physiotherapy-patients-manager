import React, { Component } from "react";
import * as firebase from 'firebase';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';


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

        const { first_name, last_name, email, visits } = this.state.patient;
        return <div style={{ color: 'black' }}>
            <p>Imię: {first_name}</p>
            <p>Nazwisko: {last_name}</p>
            <p>e-mail: {email}</p>
            <h1>Wizyty</h1>
            {visits && visits.map((visit, index) => <p key={index}><Button variant="contained" color="primary">{visit.date}</Button></p>)}
        </div>
    }
}
