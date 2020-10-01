import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Box from '@material-ui/core/Box';
import Slide from '@material-ui/core/Slide';
import AddDoc from './AddDoc';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    //marginLeft: theme.spacing(2),
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

export default function AddPatientDocument(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

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
        color="secondary"
        size="large"
        startIcon={<AddBoxIcon />}
        onClick={handleClickOpen}
      >
        Dodaj nowy dokument
      </Button>
      <Dialog open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Dodaj nowy dokument
            </Typography>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <List>
          <Box minWidth='50vw'></Box>
          <AddDoc id={props.id} />
        </List>
      </Dialog>
    </div>
  );
}
