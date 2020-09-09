import React, { Component } from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import GetPatientInfo from './GetPatientInfo';
import * as firebase from 'firebase';
import { withStyles } from '@material-ui/core/styles';
import AddPatient from './AddPatient';

const theme = {
    spacing: 8,
}

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: 'rgb(33, 150, 243)',
        color: 'white',
        fontWeight: 'bold'
    }
}))(TableCell);

export default class ManageDb extends Component {
    constructor() {
        super();
        this.state = {
            patients: false,
            chosen: false,
            query: false
        }
    }

    componentDidMount() {
        const rootRef = firebase.database().ref().child('patients');
        rootRef.on('value', snap => {
            const patients = [];
            snap.forEach((childSnap) => {
                patients.push({
                    id: childSnap.key,
                    ...childSnap.val()
                });
            });
            this.setState({
                patients: patients
            })
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.query !== this.state.query) {
            this.setState({ chosen: false })
        }
    }

    handleClick = (e) => {
        this.setState({ chosen: e });
    }
    handleInput = (e) => {
        this.setState({ query: e.target.value });
    }

    render() {
        const { patients, chosen, query } = this.state;
        if (patients) {
            return <>
                <Container maxWidth="md">
                    <Box bgcolor="white" color="primary.contrastText" my={2} p={2}>
                        <AddPatient />
                        <form noValidate autoComplete="off">
                            <TextField id="standard-basic" label="Znajdź pacjenta" margin="normal" onChange={this.handleInput} />
                        </form>
                    </Box>
                    <TableContainer component={Paper} >
                        <Table >
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell><span>Pacjenci</span></StyledTableCell>
                                    {/* <StyledTableCell align="left">Nazwisko</StyledTableCell> */}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {patients.filter((data) => {
                                    if (!query)
                                        return data
                                    else if (data.name.toLowerCase().includes(query.toLowerCase()) || data.surname.toLowerCase().includes(query.toLowerCase())) {
                                        return data
                                    }
                                }).map((patient) => (
                                    <TableRow key={patient.id} onClick={() => this.handleClick(patient.id)} style={{ cursor: 'pointer' }}>
                                        <TableCell component="th" scope="row">
                                            {patient.name} {patient.surname}
                                        </TableCell>
                                        {/* <TableCell align="left">{patient.surname}</TableCell> */}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {chosen && <GetPatientInfo id={chosen} />}
                </Container>
            </>
        }
        return null
    }
}
