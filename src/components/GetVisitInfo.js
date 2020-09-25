import React, { useState, useEffect } from "react";
import * as firebase from 'firebase';
import ViewVisit from './ViewVisit';
import AddVisit from './AddVisit';
import { sectionTitleStyle } from './customMuiStyles';
import Alert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';

export default function GetVisitInfo(props) {
    const [visits, showVisits] = useState(false);

    useEffect(() => {
        const rootRef = firebase.database().ref("patients").child(props.id).child('visits');
        rootRef.on('value', snap => {
            const visits = [];
            snap.forEach((childSnap) => {
                visits.push({
                    id: childSnap.key,
                    ...childSnap.val()
                });
            });
            showVisits(visits)
        })
    }, [props])

    // { this.state.showvisits && console.log(this.state.showvisits.sort((a, b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0))) }
    return <div style={{ color: 'black' }}>
        <Box bgcolor="white" color="primary.contrastText" my={2} p={2} border={1} borderRadius={10} boxShadow={2}>
            <Alert icon={false} severity="info" variant="filled">
                <Box display="flex" justifyContent="space-between">
                    <span style={sectionTitleStyle}>Wizyty</span>
                    <AddVisit id={props.id} />
                </Box>
            </Alert>
            {visits.length > 0 // !!!!!! add sorting by date ###descending###!!!!!
                ? visits.map((visit, index) =>
                    <Box my={2} >
                        <ViewVisit date={visit.date} case={visit.case} manual={visit.manual} />
                    </Box>
                )
                : <Box my={2} ><Alert severity="warning">Brak wizyt!</Alert></Box>}
        </Box>
    </div >
}
