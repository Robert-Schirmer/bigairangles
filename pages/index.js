import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Grid } from '@material-ui/core';
import Gallery from '../components/Gallery';
import BackAction from '../components/BackAction';

export default function Index() {
  
  return (
    <Layout>
      <Grid item container justify='center'>
        <Gallery />
      </Grid>
      {/* <BackAction /> */}
    </Layout>
  );
}
