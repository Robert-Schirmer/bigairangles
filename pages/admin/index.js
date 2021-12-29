import React from 'react';
import Layout from '../../components/Layout';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import AddImage from '../../components/AddImage';
import ManageForms from '../../components/ManageForms';
import { ManageIcon } from '../../src/icons';

const useStyles = makeStyles(theme => ({
  root: {
    '& > div': {
      marginBottom: 40
    },
  },
  iconstyle: {
    color: theme.palette.primary.main,
    fontSize: 30
  }
}));

export default function Manage() {
  const classes = useStyles();

  return (
    <Layout>
      <Grid container alignItems='center' direction='column' className={classes.root}>
        <Grid item container justify='center' alignItems='center' spacing={2} direction='column'>
          <Typography variant='h5'>
            Management
          </Typography>
          <Grid item>
            <ManageIcon className={classes.iconstyle} />
          </Grid>
        </Grid>
        <Grid item container justify='center' direction='row' >
          <AddImage />
        </Grid>
        {/* <Grid item container justify='center' direction='row' >
          <ManageForms />
        </Grid> */}
        {/* Maybe add an activity section? */}
      </Grid >
    </Layout >
  );
}
