import React, { useState, useEffect } from 'react';
import { makeStyles, Grid, Typography, Fade } from '@material-ui/core';
import { CloudIcon } from '../src/icons';


const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative'
  },
  cloudicon: {
    width: '100%',
    height: 'auto',
    maxWidth: 140,
    color: '#fff'
  },
  logotextcont: {
    position: 'absolute',
    bottom: -35,
    [theme.breakpoints.down('xs')]: {
      bottom: -20
    },
    left: 0,
    width: '100%',
    color: '#fff'
  },
  title: {
    fontSize: 20,
    [theme.breakpoints.down('xs')]: {
      fontSize: 15
    },
  },
  subtitle: {
    fontSize: 16,
    [theme.breakpoints.down('xs')]: {
      fontSize: 13
    },
  }
}));

const MainLogo = (props) => {
  const classes = useStyles();
  const rendertext = props.logoonly ? false : true;

  return (
    <Grid container justify='center' direction='column' alignItems='center' className={classes.root} >
      <Grid item>
        <CloudIcon className={classes.cloudicon} />
      </Grid>
      {rendertext &&
        <Grid item className={classes.logotextcont}>
          <Typography className={classes.title} variant='body1' align='center'><i><b>Big Air Angles</b></i></Typography>
          <Typography className={classes.subtitle} variant='subtitle1' align='center'>Drone Photos</Typography>
        </Grid>
      }
    </Grid>
  );
}

export default MainLogo;
