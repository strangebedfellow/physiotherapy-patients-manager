import React, { useState, useEffect, useRef } from "react";
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import PrintIcon from '@material-ui/icons/Print';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import ReactToPrint from "react-to-print";
import Alert from '@material-ui/lab/Alert';

class ComponentToPrint extends React.Component {
    render() {
        return (
            <Box>
                <Box my={3}>
                    <Alert severity="error">This is an error alert — check it out!</Alert>
                </Box>
                <Box my={3}>
                    <Alert severity="warning">This is a warning alert — check it out!</Alert>
                </Box>
                <Box my={3}>
                    <Alert severity="info">This is an info alert — check it out!</Alert>
                </Box>
                <Box my={3}>
                    <Alert severity="success">This is a success alert — check it out!</Alert>
                </Box>
            </Box>
        );
    }
}

export default function PrintVisits() {

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
                {/* <AppBar position="static">
                    <Toolbar variant="dense">
                        <Typography variant="h5" color="inherit">Uzupełnij dane pacjenta</Typography>
                    </Toolbar>
                </AppBar> */}
                <DialogContent>
                    <ReactToPrint
                        trigger={() => <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            startIcon={<PrintIcon />}
                        >
                            Drukuj!
                          </Button>}
                        content={() => componentRef.current}
                    />
                    <ComponentToPrint ref={componentRef} />
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
