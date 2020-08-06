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
import Slide from '@material-ui/core/Slide';

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

export default function ViewVisit(props) {
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
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        {props.date}
      </Button>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Data wizyty: {props.date} - Kwestionariusz konsultacyjny
            </Typography>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem button>
            <ListItemText primary="Część ciała poddana zabiegowi / rezultat" secondary="Część ciała / rezultat" />
          </ListItem>
        </List>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Wywiad z pacjentem
            </Typography>
          </Toolbar>
        </AppBar>
        {props.interview &&
          <List>
            <ThemeProvider theme={theme}>
              <ListItem button>
                <ListItemText primary="Opis aktualnych dolegliwości / główny problem funkcjonalny pacjenta" secondary={props.interview.iq1} />
              </ListItem>
            </ThemeProvider>
            <Divider />
            <ListItem button>
              <ListItemText primary="Od kiedy objawy początkowe i jakie?" secondary={props.interview.iq2} />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText primary="Charakter bólu (tępy, ostry, piekący, kłujący)" secondary={props.interview.iq3} />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText primary="Ból stały / zmienny / co nasila ból" secondary={props.interview.iq4} />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText primary="Co łagodzi ból?" secondary={props.interview.iq5} />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText primary="Możliwa przyczyna" secondary={props.interview.iq6} />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText primary="Poprzednie epizody" secondary={props.interview.iq7} />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText primary="Czy były jakieś próby rehabilitacji - TAK / NIE. Jakie efekty?" secondary={props.interview.iq8} />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText primary="Red flags" secondary={props.interview.iq9} />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText primary="Badania obrazowe" secondary={props.interview.iq10} />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText primary="Inne dolegliwości" secondary={props.interview.iq11} />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText primary="Przebyte operacje" secondary={props.interview.iq12} />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText primary="Przebyte choroby / wypadki" secondary={props.interview.iq13} />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText primary="Czy występują problemy ze zmianą pozycji, zachwiania równowagi - TAK / NIE" secondary={props.interview.iq14} />
            </ListItem>
          </List>}
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Badanie manualne
            </Typography>
          </Toolbar>
        </AppBar>
      </Dialog>
    </div>
  );
}
