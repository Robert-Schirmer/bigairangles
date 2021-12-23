import React from 'react';
import { makeStyles, Popover, Typography, Grid, Fade } from '@material-ui/core';
import { InfoIcon } from '../src/icons';
import { withStyles } from '@material-ui/styles';

const StyledPopover = withStyles(theme => ({
  paper: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'rgb(0, 0, 0, 0.8)',
    border: '2px solid ' + theme.palette.primary.main
  }
}))(Popover);

const useStyles = makeStyles(theme => ({
  icon: {
    position: 'absolute',
    bottom: '1%',
    right: '1%',
    fontSize: 20,
    [theme.breakpoints.down('xs')]: {
      fontSize: 15
    },
    color: theme.palette.secondary.main,
    '&:hover': {
      cursor: 'pointer'
    }
  },
  popover: {
    pointerEvents: 'none'
  }
}));

export default function InfoPopUp(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Fade in={true}>
        <InfoIcon
          aria-owns={open ? 'mouse-over-popover' : undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
          onClick={handlePopoverOpen}
          className={classes.icon}
        />
      </Fade>
      <StyledPopover
        id="mouse-over-popover"
        className={classes.popover}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Grid container direction='column'>
          {
            props.info.map((data, index) => {
              let parsed;
              if (data.label === "Elevation") {
                //Elevation is in m so convert to feet
                parsed = Math.round(data.value * 3.28084) + ' ft';
              }

              return (
                <Grid item key={index}>
                  <Typography variant='body1'><b>{data.label}:</b> {parsed ? parsed : data.value}</Typography>
                </Grid>
              )
            })
          }
        </Grid>
      </StyledPopover>
    </>
  );
}
