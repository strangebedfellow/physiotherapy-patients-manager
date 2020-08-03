import React, { Component } from "react";
import * as firebase from 'firebase';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import PhoneInTalkOutlinedIcon from '@material-ui/icons/PhoneInTalkOutlined';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import SimpleModal from './modal'
import ViewVisit from './ViewVisit'

import FillDb from './FillDb';
import GetVisits from './GetVisits';

export default class GetVisitInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showvisits: false
        }
    }

    componentDidMount() {
        const rootRef = firebase.database().ref("patients").child(this.props.id).child('visits');
        rootRef.on('value', snap => {
            const visits = [];
            snap.forEach((childSnap) => {
                visits.push({
                    id: childSnap.key,
                    ...childSnap.val()
                });
            });
            this.setState({
                showvisits: visits
            })
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.id !== this.props.id) {
            const rootRef = firebase.database().ref("patients").child(this.props.id).child('visits');
            rootRef.on('value', snap => {
                const visits = [];
                snap.forEach((childSnap) => {
                    visits.push({
                        id: childSnap.key,
                        ...childSnap.val()
                    });
                });
                this.setState({
                    showvisits: visits,

                })
            })
        }
    }

    render() {
        return <div style={{ color: 'black' }}>
            <div className='add-visit'><h2>Wizyty <Button variant="contained" color="secondary" onClick={() => FillDb(this.props.id)}>Dodaj nową wizytę</Button></h2></div>
            {this.state.showvisits.length > 0
                ? this.state.showvisits.map((visit, index) =>
                    <p key={index} >
                        {/* <SimpleModal date={visit.date} case={visit.case} interview={visit.interview} /> */}
                        <ViewVisit date={visit.date} case={visit.case} interview={visit.interview} />
                    </p>
                )
                : <p>Brak wizyt!</p>}
        </div>
    }
}
