import React, { useEffect } from 'react';
import { Grid, makeStyles, IconButton } from '@material-ui/core';
import AdvancedImage from './AdvancedImage';
import { BackIcon } from '../src/icons';

const useStyles = makeStyles(theme => ({
  modalroot: {
    width: 'auto',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 4,
  },
  buttoncont: {

  },
  imagestyle: {
    borderRadius: 10,
    // border: '15px solid white',
    // [theme.breakpoints.down('xs')]: {
    //   border: '8px solid white',
    // },
  },
  iconstyle: {
    color: theme.palette.secondary.main
  }
}));

const Modal = (props) => {
  const classes = useStyles();

  useEffect(() => {
    document.addEventListener('keydown', keyDown);

    return () => document.removeEventListener('keydown', keyDown)
  }, [])


  function keyDown(e) {
    if (e.key === 'ArrowLeft') {
      modalScroll('back');
    }
    else if (e.key === 'ArrowRight') {
      modalScroll('next');
    }
    else if (e.code === 'Space') {
      e.preventDefault(); //Prevent spacebar from scrolling page
      if (props.onKeyLike) props.onKeyLike();
    }
  }

  const modalScroll = (direction) => {
    props.onScroll(direction);
  }

  const imagesize = {
    size: '95vw',
    min: undefined,
    max: 1000,
    maxvertical: '80vh',
  }

  return (
    <Grid container className={classes.modalroot}
      justify='center' alignItems='center' direction='column'
    >
      <AdvancedImage className={classes.imagestyle} size={imagesize} src={props.src} info={props.info}/>
      <Grid item container justify='center' alignItems='center' className={classes.buttoncont} spacing={3}>
        <Grid item >
          <IconButton onClick={() => modalScroll('back')}>
            <BackIcon />
          </IconButton>
        </Grid>
        <Grid item>
          {props.children} {/* Holds action button stuff */}
        </Grid>
        <Grid item >
          <IconButton onClick={() => modalScroll('next')} >
            <BackIcon style={{ transform: 'rotate(180deg)' }} />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Modal;
