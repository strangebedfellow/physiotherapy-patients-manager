import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Alert from '@material-ui/lab/Alert';
import { getIconSrc } from './renderData/rotationIcons';
import bodyParts from './renderData/bodyParts';
import DeleteVisit from './DeleteVisit';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative'
  },
  // appBarBg: {
  //   position: 'relative',
  //   backgroundColor: 'black'
  // },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

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

  const filterChains = (chain) => bodyParts.reduce((filtered, part) => chain === (part.name) ? [...filtered, part.fullName] : filtered, []);

  return (
    <div>
      <Alert icon={false} variant="outlined" severity="success">
        <Button variant="contained" color="primary" style={{ backgroundColor: 'rgb(33, 150, 243)' }} onClick={handleClickOpen}>
          {props.date}
        </Button>
        <p><strong>{props.consultation}</strong></p>
        {props.manual && props.manual.map((e, index) => <p key={index}>{filterChains(e[0])}</p>)}
      </Alert>
      <Dialog open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title} >
              Data wizyty: {props.date}
            </Typography>
            <DeleteVisit patientId={props.patientId} visitId={props.visitId} setOpen={setOpen}/>
            {/* <Tooltip TransitionComponent={Zoom} title="Usuń wizytę">
                <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={handleClickOpen}
                >
                    <DeleteForeverIcon />
                </Button>
            </Tooltip>      */}
          </Toolbar>
        </AppBar>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h4" className={classes.title}>
              Kwestionariusz konsultacyjny
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem button>
            <ListItemText primary="Część ciała poddana zabiegowi / rezultat" secondary={props.consultation} />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Inne uwagi" secondary={props.notes} />
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
          {props.manual && props.manual.map((e, index) =>
            <React.Fragment key={index}>
              {['cristaIliaca', 'sips', 'sacrum'].includes(e[0]) ?
                <><ListItem button><ListItemText primary={filterChains(e[0])} />
                  {e[1] && e[1].map((icon, index) =>
                    getIconSrc(icon) && <img
                      src={getIconSrc(icon).src}
                      key={index}
                      style={{
                        background: 'rgba(255,0,0,0.5)',
                        height: '50px',
                        margin: '5px'
                      }} />
                  )}
                </ListItem><Divider /></> :
                <><ListItem button><ListItemText primary={filterChains(e[0])} secondary={e[1]} /></ListItem><Divider /></>}
            </React.Fragment>
          )}
        </List>
        {/* <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton> */}
      </Dialog>
    </div >
  );
}
