// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Modal from '@material-ui/core/Modal';

// function rand() {
//     return Math.round(Math.random() * 20) - 10;
// }

// function getModalStyle() {
//     const top = 50 ;
//     const left = 50;

//     return {
//         top: `${top}%`,
//         left: `${left}%`,
//         transform: `translate(-${top}%, -${left}%)`,
//     };
// }

// const useStyles = makeStyles((theme) => ({
//     paper: {
//         position: 'absolute',
//         width: '50vw',
//         backgroundColor: theme.palette.background.paper,
//         border: '1px solid #000',
//         boxShadow: theme.shadows[1],
//         padding: theme.spacing(2, 4, 3),
//     },
// }));

// export default function SimpleModal(props) {
//     const classes = useStyles();
//     // getModalStyle is not a pure function, we roll the style only on the first render
//     const [modalStyle] = React.useState(getModalStyle);
//     const [open, setOpen] = React.useState(false);

//     const handleOpen = () => {
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//     };

//     const body = (
//         <div style={modalStyle} className={classes.paper}>
//             <h1 onClick={handleClose}>X</h1>
//             <h2 id="simple-modal-title">Data wizyty: {props.date} </h2>
//             <h1 id="simple-modal-description">
//                 Wywiad z pacjentem
//             </h1>
//             {props.interview && <div>
//                 <p><strong>Opis aktualnych dolegliwości / główny problem funkcjonalny pacjenta: </strong></p>
//                 <p className='interview-answer'>{props.interview.iq1}</p>
//                 <p><strong>Od kiedy objawy początkowe i jakie: </strong></p>
//                 <p className='interview-answer'>{props.interview.iq2}</p>
//                 <p><strong>Charakter bólu (tępy, ostry, piekący, kłujący): </strong></p>
//                 <p className='interview-answer'>{props.interview.iq3}</p>
//                 <p><strong>Ból stały / zmienny / co nasila ból: </strong></p>
//                 <p className='interview-answer'>{props.interview.iq4}</p>
//                 <p><strong>Co łagodzi ból: </strong></p>
//                 <p className='interview-answer'>{props.interview.iq5}</p>
//                 <p><strong>Możliwa przyczyna: </strong></p>
//                 <p className='interview-answer'>{props.interview.iq6}</p>
//                 <p><strong>Poprzednie epizody: </strong></p>
//                 <p className='interview-answer'>{props.interview.iq7}</p>
//             </div>} 
//             {/* przerobić na tabelę */}
//         </div>
//     );

//     return (
//         <div>
//             <button type="button" onClick={handleOpen} className='visit-button'>
//                 {props.date}
//             </button>
//             <Modal
//                 open={open}
//                 onClose={handleClose}
//                 aria-labelledby="simple-modal-title"
//                 aria-describedby="simple-modal-description"
//             >
//                 {body}
//             </Modal>
//         </div>
//     );
// }


import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function TransitionsModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button type="button" onClick={handleOpen} className='visit-button'>
      {props.date}
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
             <h2 id="simple-modal-title">Data wizyty: {props.date} </h2>
             <h1 id="simple-modal-description">
                 Wywiad z pacjentem
             </h1>
             {props.interview && <div>
                 <p><strong>Opis aktualnych dolegliwości / główny problem funkcjonalny pacjenta: </strong></p>
                 <p className='interview-answer'>{props.interview.iq1}</p>
                 <p><strong>Od kiedy objawy początkowe i jakie: </strong></p>
                 <p className='interview-answer'>{props.interview.iq2}</p>
                 <p><strong>Charakter bólu (tępy, ostry, piekący, kłujący): </strong></p>
                 <p className='interview-answer'>{props.interview.iq3}</p>
                 <p><strong>Ból stały / zmienny / co nasila ból: </strong></p>
                 <p className='interview-answer'>{props.interview.iq4}</p>
                 <p><strong>Co łagodzi ból: </strong></p>
                 <p className='interview-answer'>{props.interview.iq5}</p>
                 <p><strong>Możliwa przyczyna: </strong></p>
                 <p className='interview-answer'>{props.interview.iq6}</p>
                 <p><strong>Poprzednie epizody: </strong></p>
                 <p className='interview-answer'>{props.interview.iq7}</p>
             </div>}            
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
