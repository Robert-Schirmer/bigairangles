import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { Grid, IconButton, makeStyles, Slide, useTheme } from '@material-ui/core';
import { HeartIcon, HeartFillIcon, ShareIcon } from '../src/icons';

const likeslidetime = 0.25; //Seconds

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative'
  },
  iconstyle: {
    fontSize: 25,
    color: theme.palette.secondary.main,
    [theme.breakpoints.down('xs')]: {
      fontSize: 17
    },
    zIndex: 2
  },
  likesnum: {
    position: 'absolute',
    top: '16%',
    transition: likeslidetime + 's ease-out',
    '-webkit-transition': likeslidetime + 's ease-out',
    '-moz-transition': likeslidetime + 's ease-out',
    '-o-transition': likeslidetime + 's ease-out',
    width: 30,
    textAlign: 'right',
    fontSize: 13,
    color: theme.palette.background.default,
    [theme.breakpoints.down('xs')]: {
      fontSize: 10
    },
    zIndex: 1
  },
  hoverpointer: {
    '&:hover': {
      cursor: 'pointer'
    }
  }
}));

export function LikeButton(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [likes, setLikes] = useState(props.likes);
  let timeout;

  useEffect(() => {

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    timeout = setTimeout(() => {
      setLikes(likes => {
        if (props.likes !== likes) {
          return props.likes;
        }
        else {
          return likes;
        }
      })
    }, likeslidetime * 1000 + 250)
  }, [props.likes])

  const handleClick = () => {
    //State will only update once
    props.onClick();
  }

  return (
    <div className={classes.root}>
      <span className={classes.likesnum}
        style={props.liked ? { left: -27, color: theme.palette.secondary.main } : { left: -20, color: theme.palette.background.default }}
      >{likes}</span>
      <IconButton onClick={handleClick}>
        {
          props.liked ?
            <HeartFillIcon className={classes.iconstyle} />
            :
            <HeartIcon className={classes.iconstyle} />

        }
      </IconButton>
    </div>
  );
}

export function ShareButton() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <IconButton>
        <ShareIcon className={classes.iconstyle} />
      </IconButton>
    </div>
  );
}
