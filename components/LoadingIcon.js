import React from 'react';
import { makeStyles, Grid, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative'
  },
  reflect: {
    '-moz-transform': 'scaleY(-1)',
    '-o-transform': 'scaleY(-1)',
    '-ms-transform': 'scaleY(-1)',
    transform: 'scaleY(-1)',
  },
  centerabsolute: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    '-moz-transform': 'translate(-50%, -50%)',
    '-o-transform': 'translate(-50%, -50%)',
    '-ms-transform': 'translate(-50%, -50%)',
    transform: 'translate(-50%, -50%)'
  },
  smallcirclesvg: {
    color: theme.palette.primary.main,
    '& > circle': {
      strokeWidth: 4
    }
  },
  largecirclesvg: {
    color: theme.palette.secondary.main,
    '& > circle': {
      strokeWidth: 2
    }
  },
}));

export default function LoadingIcon(props) {
  const classes = useStyles();
  const loadingsize = props.contsize ? { width: props.contsize, height: props.contsize } : { width: 100, height: 100 }

  return (
    <Grid container className={classes.root} style={loadingsize} justify='center' alignItems='center'>
      <div className={classes.centerabsolute}>
        <CircularProgress size={50} classes={{ svg: classes.largecirclesvg }} />
      </div>
      <div className={classes.reflect}>
        <div className={classes.centerabsolute} style={{ marginTop: 6 }} > {/*Margin to offset small space at bottom */}
          <CircularProgress size={25} classes={{ svg: classes.smallcirclesvg }} />
        </div>
      </div>
    </Grid>
  )
}
