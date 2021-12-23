import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import { DroneIcon } from '../src/icons';

const transitiontime = 0.5; //Sec

const useStyles = makeStyles(theme => ({
  root: {
    left: 0,
    top: 0,
    position: 'fixed',
    width: '100vw',
    height: '100vh',
    zIndex: -1
  },
  streak: {
    position: 'absolute',
    transition: transitiontime + 's ease-out',
    '-webkit-transition': transitiontime + 's ease-out',
    '-moz-transition': transitiontime + 's ease-out',
    '-o-transition': transitiontime + 's ease-out',
    left: '-10%',
    height: 10,
    width: 10,
    backgroundColor: theme.palette.primary.main
  },
  loading: {
    height: 100,
    width: 100
  }
}));

const BackAction = (props) => {
  const classes = useStyles();
  const [active, setActive] = useState(false);
  const num_of_streaks = 4;
  const streaks = new Array(num_of_streaks).fill(1);

  useEffect(() => {
    setTimeout(() => {
      setActive(true);
    }, 4000)
  }, [])

  return (
    <div className={classes.root}>
      {streaks.map((streak, index) => {
        const height = 90; //As percent
        const spacing = 10;
        const endheight = 80;

        return (
          <div key={index} className={classes.streak} style={active ? { left: '100%', top: endheight - index*spacing  + '%' } : { top: height - index*spacing + '%' }} />
        )
      })}
    </div>
  );
}

export default BackAction;
