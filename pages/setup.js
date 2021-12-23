import React from 'react';
import Layout from '../components/Layout';
import Typography from '@material-ui/core/Typography';
import { Grid, makeStyles, Fade } from '@material-ui/core';
import AdvancedImage from '../components/AdvancedImage';

const useStyles = makeStyles(theme => ({
  root: {
    '& > div': {
      marginTop: 40
    }
  },
  droneimg: {
    width: '35vw',
    maxWidth: 125,
  },
  darktimg: {
    width: '25vw',
    maxWidth: 75,
  },
  beforeaftercont: {
    width: '85vw',
    maxWidth: 500,
  },
  beforeafterstyle: {
    borderRadius: 10
  }
}));

export default function Setup() {
  const classes = useStyles();

  const specs = ['12-megapixel camera', '4K photos and videos', '2 x 25+ minute batteries', 'Over 20 hours of flight time'];

  return (
    <Layout>
      <Grid container justify='center' alignItems='center' className={classes.root}>
        <Grid item container direction='column'>
          <Grid item container justify='center' alignItems='center' spacing={3}>
            <Grid item>
              <Typography variant='h5'>
                DJI Phantom 4
              </Typography>
            </Grid>
            <Grid item >
              <Fade in={true}>
                <AdvancedImage src={'/staticimgs/djiph4.png'} className={classes.droneimg} noAdjust />
              </Fade>
            </Grid>
          </Grid>
          <Grid item container justify='center' alignItems='center' >
            <ul>
              {specs.map((spec, index) => (
                <li key={index}>
                  <Typography variant='body1'>
                    {spec}
                  </Typography>
                </li>
              ))}
            </ul>
          </Grid>
        </Grid>
        <Grid item container justify='center' alignItems='center' direction='row-reverse' spacing={3}>
          <Grid item>
            <Typography variant='h6'>
              darktable (post editing)
              </Typography>
          </Grid>
          <Grid item>
            <Fade in={true}>
              <AdvancedImage src={'/staticimgs/darktable.png'} className={classes.darktimg} noAdjust />
            </Fade>
          </Grid>
          <Grid item container justify='center' alignItems='center' direction='row' spacing={3}>
            <Grid item>
              <Typography variant='subtitle1' align='center'>(before edit)</Typography>
              <Grid item className={classes.beforeaftercont}>
                <AdvancedImage className={classes.beforeafterstyle} src={'/staticimgs/before.jpg'} lowres={'staticimgs/before_small.jpg'} />
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant='subtitle1' align='center'>(after edit)</Typography>
              <Grid item className={classes.beforeaftercont}>
                <AdvancedImage className={classes.beforeafterstyle} src={'/staticimgs/after.jpg'} lowres={'staticimgs/after_small.jpg'} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid >
    </Layout >
  );
}
