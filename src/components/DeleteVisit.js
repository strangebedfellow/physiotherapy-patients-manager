import React from 'react';
import * as firebase from 'firebase';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function DeleteVisit(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const confirmDelete = () => {
    const ref = firebase.database().ref('patients/' + props.patientId + '/visits');
    ref.child(props.visitId).remove();
    setOpen(false);
    props.setOpen(false)
  }

  return (
    <div>
      <Tooltip TransitionComponent={Zoom} title="Usuń wizytę">
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={handleClickOpen}
        >
          <DeleteForeverIcon />
        </Button>
      </Tooltip>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Czy na pewno chcesz usunąć tą wizytę?"}</DialogTitle>
        <DialogActions>
          <Button onClick={confirmDelete} variant="contained" color="secondary">
            Usuń
          </Button>
          <Button onClick={handleClose} variant="contained" color="primary">
            Anuluj
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
