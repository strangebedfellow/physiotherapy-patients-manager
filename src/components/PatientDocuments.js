import React, { useEffect } from "react";
import { gapi } from 'gapi-script';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import ImageIcon from '@material-ui/icons/Image';
import Slide from '@material-ui/core/Slide';
import GetDocs from './GetDocs';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const theme = createMuiTheme({
  typography: {
    body1: {
      fontWeight: 'bold'
    },
    body2: {
      fontSize: '1.5rem'
    }
  }
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PatientDocuments(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    gapi.load('auth2', () => {
      gapi.auth2.init({
        client_id: process.env.REACT_APP_DRIVE_ID
      });
    }
    )
  }, [])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        size="large"
        startIcon={<ImageIcon />}
        onClick={handleClickOpen}
      >
        Dokumenty pacjenta
      </Button>
      <Dialog open={open} onClose={handleClose} TransitionComponent={Transition} maxWidth='xl'>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Dokumenty pacjenta
            </Typography>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <List>
          <Box>
            <GetDocs id={props.id} />
          </Box>
        </List>
      </Dialog>
    </div>
  );
}
