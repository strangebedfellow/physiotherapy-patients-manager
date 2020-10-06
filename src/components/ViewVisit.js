import React from 'react';
import i2 from '../img/i2.png';

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
import Alert from '@material-ui/lab/Alert';
import { cristaIliacaRotations, mainRotations, sacrumRotations, getIconSrc } from './renderData/rotationIcons';
import { borders } from '@material-ui/system';
import { shadows } from '@material-ui/system';

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
      <Alert icon={false} variant="outlined" severity="success">
        <Button variant="contained" color="primary" style={{ backgroundColor: 'rgb(33, 150, 243)' }} onClick={handleClickOpen}>
          {props.date}
        </Button><p><strong>{props.consultation}</strong></p></Alert>
      <Dialog open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Data wizyty: {props.date}
              <p>Kwestionariusz konsultacyjny</p>
            </Typography>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem button>
            <ListItemText primary="Część ciała poddana zabiegowi / rezultat" secondary={props.consultation} />
          </ListItem>
        </List>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Badanie manualne
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
          {props.manual && Object.entries(props.manual).map(e => <>
            {['cristaIliaca', 'sips', 'sacrum'].includes(e[0]) ?
              <ListItem button><ListItemText primary={e[0]} />
                {e[1].map(icon =>
                  getIconSrc(icon) && <img
                    src={getIconSrc(icon).src}
                    style={{
                      background: 'rgba(255,0,0,0.5)',
                      height: '50px',
                      margin: '5px'
                    }} />
                )}
              </ListItem> :
              <ListItem button><ListItemText primary={e[0]} secondary={e[1]} /></ListItem>}
          </>
          )}
        </List>
      </Dialog>
    </div >
  );
}
