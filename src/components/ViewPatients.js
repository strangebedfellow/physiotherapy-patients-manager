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

const theme = {
    spacing: 8,
}

export default class ManageDb extends Component {
    constructor() {
        super();
        this.state = {
            patients: false,
            query: false,
            chosen: 'none'
        }
    }

    componentDidMount() {
        const rootRef = firebase.database().ref().child('patients');
        rootRef.on('value', snap => {
            this.setState({
                patients: snap.val()
            })
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.query !== this.state.query) {
            this.setState({ chosen: 'none' })
        }
    }

    handleInput = (e) => {
        this.setState({ query: e.target.value });
    }
    handleClick = (e) => {
        this.setState({ chosen: e });
    }

    render() {
        const { patients, query, chosen } = this.state;
        if (patients) {
            return <>
                <Container maxWidth="md">
                    <Box bgcolor="white" color="primary.contrastText" my={2} p={2}>
                        <form noValidate autoComplete="off">
                            <TextField id="standard-basic" label="Znajdź pacjenta" onChange={this.handleInput} />
                        </form>
                    </Box>
                    <TableContainer component={Paper} m={2}>
                        <Table size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ fontWeight: 'bold' }}>Imię</TableCell>
                                    <TableCell align="left" style={{ fontWeight: 'bold' }}>Nazwisko</TableCell>
   
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {patients.filter((data) => {
                                    if (!query)
                                        return data
                                    else if (data.first_name.toLowerCase().includes(query.toLowerCase()) || data.last_name.toLowerCase().includes(query.toLowerCase())) {
                                        return data
                                    }
                                }).map((row) => (
                                    <TableRow key={row.id} onClick={() => this.handleClick(row.id)} style={{ cursor: 'pointer' }}>
                                        <TableCell component="th" scope="row">
                                            {row.first_name}
                                        </TableCell>
                                        <TableCell align="left">{row.last_name}</TableCell>
                                        
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {chosen!= 'none' && <>
                        <Box bgcolor="white" color="primary.contrastText" my={2} p={2}>
                            <GetPatientInfo id={chosen} />
                        </Box>
                    </>}
                </Container>
            </>
        }
        else return null
    }
}
