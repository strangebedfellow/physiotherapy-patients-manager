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
import { sectionTitleStyle } from './customMuiStyles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import AddPatient from './AddPatient';
import Autocomplete from '@material-ui/lab/Autocomplete';
import imgsrc from '../img/logo.png'

const theme = {
    spacing: 8,
}

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: 'rgb(33, 150, 243)',
        color: 'white',
        //fontWeight: 'bold'
    }
}))(TableCell);

export default class ManageDb extends Component {
    constructor() {
        super();
        this.state = {
            patients: false,
            chosen: false,
            query: false,
            test: false
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

    handleInput = (e) => {
        this.setState({ query: e.target.value });
    }

    handleChange = (event, value) => {
        value ? this.setState({ chosen: value.id }) : this.setState({ chosen: false });
    }

    render() {
        const { patients, chosen } = this.state;
        if (patients) {
            return <>
                <Box bgcolor="rgb(33, 150, 243)" color="primary.contrastText" mb={2} p={2} boxShadow={3} width={1} display="flex" justifyContent="center" >
                    <img style={{ borderRadius: '10px' }} src={imgsrc}></img>
                    <Box bgcolor="white" display="flex" flexDirection='column' justifyContent="space-around" alignItems='center' mx={2} p={2} borderRadius={10} boxShadow={2}>
                        <AddPatient />
                        <Autocomplete
                            id="combo-box-demo"
                            options={patients}
                            noOptionsText={'Nie znaleziono'}
                            onChange={this.handleChange}
                            getOptionLabel={(option) => option.name + ' ' + option.surname}
                            style={{ width: 285 }}
                            renderInput={(params) => <TextField {...params} label="Znajdź pacjenta" variant="outlined" />}
                        />
                    </Box>
                </Box>
                <Container maxWidth="md">
                    {chosen && <GetPatientInfo id={chosen} />}
                </Container>
            </>
        }
        return null
    }
}
