import React, { Component } from "react";
import * as firebase from 'firebase';
import Button from '@material-ui/core/Button';
import ViewVisit from './ViewVisit';
import AddVisit from './AddVisit';
import Alert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';

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
            <Box bgcolor="white" color="primary.contrastText" my={2} p={2} >
                <Alert icon={false} severity="info"><span style={{ fontSize: '1.5rem' }}>Wizyty</span></Alert>
                {this.state.showvisits.length > 0
                    ? this.state.showvisits.map((visit, index) =>
                        <p key={index} >
                            <ViewVisit date={visit.date} case={visit.case} />
                        </p>
                    )
                    : <p><Alert severity="warning">Brak wizyt!</Alert></p>}
                <AddVisit id={this.props.id} />
            </Box>
        </div>
    }
}
