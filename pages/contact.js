import React from 'react';
import Layout from '../components/Layout';
import Typography from '@material-ui/core/Typography';
import { Grid, makeStyles } from '@material-ui/core';
import ContactForm from '../components/ContactForm';
import { DroneIcon } from '../src/icons';

const useStyles = makeStyles(theme => ({
  root: {
    '& > div': {
      marginTop: 30
    },
  },
  oopsimgcont: {
    width: '90vw',
    maxWidth: 500,
  },
  oopsimg: {
    borderRadius: 10
  },
  description: {
    maxWidth: 500
  },
  icon: {
    fontSize: 40,
    color: theme.palette.primary.main
  }
}));

export default function Contact() {
  const classes = useStyles();

  return (
    <Layout>
      <Grid container alignItems='center' direction='column' className={classes.root}>
        <Grid item container justify='center' alignItems='center' direction='column' className={classes.description} spacing={2}>
          <Grid item>
            <Typography variant='h5'>
              Drone Photos and Video
            </Typography>
          </Grid>
          <Grid item>
            <DroneIcon className={classes.icon} />
          </Grid>
        </Grid>
        <Grid item container justify='center' alignItems='center' direction='row' className={classes.description} spacing={5}>
          <Grid item>
            <Typography variant='h6'>
              Get in touch using this form or the email at the bottom of the page. Based in Ann Arbor, Michigan but can travel.
            </Typography>
          </Grid>
          <Grid item container>
            <ContactForm />
          </Grid>
        </Grid>
        {/* <Grid item container justify='center' alignItems='center' direction='row' >
          <Grid item className={classes.oopsimgcont}>
            <AdvancedImage src={'/staticimgs/oof.png'} className={classes.oopsimg} />
          </Grid>
        </Grid> */}
      </Grid>
    </Layout>
  );
}
