import React, { Component, useState, useRef } from "react";
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import PrintIcon from '@material-ui/icons/Print';
import PhoneInTalkOutlinedIcon from '@material-ui/icons/PhoneInTalkOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ReactToPrint from "react-to-print";
import Alert from '@material-ui/lab/Alert';

class ComponentToPrint extends Component {
    render() {
    const {name, surname, phone_number, occupation} = this.props.patient;
        return (
            <Box>
                <Box my={2}>
                    <AppBar position='relative'>
                        <Toolbar>
                            <Typography variant="h6">Dane pacjenta</Typography>
                        </Toolbar>
                    </AppBar>
                    <Alert variant="outlined" severity="success" icon={false}>
                        <p><strong>Imię i nazwisko:</strong> {name} {surname}</p>
                        <p><strong><PhoneInTalkOutlinedIcon /></strong> {phone_number}</p>
                        <p><strong>Zawód/Praca/Aktywność: </strong>{occupation}</p>

                    </Alert>
                </Box>
                {this.props.visits.map(visit =>
                    <Box>
                        <AppBar position='relative'>
                            <Toolbar>
                                <Typography variant="h6">Data wizyty: {visit.date}</Typography>
                            </Toolbar>
                        </AppBar>
                        <Box mb={3}>
                            <Alert variant="outlined" severity="info" icon={false}>
                                <strong>Część ciała poddana zabiegowi / rezultat:</strong>
                                <p>{visit.consultation}</p>
                            </Alert>
                        </Box>
                    </Box>
                )}
            </Box>
        );
    }
}

export default function PrintVisits(props) {

    const componentRef = useRef();

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Box mx={2}>
                <Tooltip TransitionComponent={Zoom} title="Drukuj wizyty">
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={handleClickOpen}
                    >
                        <PrintIcon />
                    </Button>
                </Tooltip>
            </Box>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" disableEscapeKeyDown={true} disableBackdropClick={true}>
                <DialogContent>
                    <ReactToPrint
                        trigger={() => <Box my={2}><Button
                            variant="contained"
                            color="primary"
                            size="large"
                            startIcon={<PrintIcon />}
                        >
                            Drukuj!
                          </Button></Box>}
                        content={() => componentRef.current}
                    />
                    <ComponentToPrint ref={componentRef} visits={props.visits} patient={props.patient} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Anuluj
                     </Button>
                </DialogActions>
            </Dialog>
        </>
    )

}
