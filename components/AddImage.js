import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Grid, makeStyles, Typography, Button } from '@material-ui/core';
import TextField from '../components/TextField';
import axios from 'axios';
import LoadingIcon from '../components/LoadingIcon';
import { baseurl } from '../site.config';
import { addImage } from './functions/requests';

const useStyles = makeStyles(theme => ({
  srcinputcont: {
    paddingTop: 20,
  },
  metainputcont: {
    paddingTop: 20,
  },
  responsecont: {
    paddingTop: 20
  },
  textinput: {
    maxWidth: 200,
    paddingBottom: 20,
    margin: '0px 15px'
  }
}));

const metarow = { label: '', value: '' };
const defaultmetarows = [
  {
    label: 'Location',
    value: ''
  },
  {
    label: 'Time',
    value: ''
  },
  {
    label: 'Elevation',
    value: ''
  }
]
export default function AddImage() {
  const classes = useStyles();
  const [metarows, setMetaRows] = useState([{ ...metarow }]);
  const [src, setSrc] = useState('');
  const [response, setResponse] = useState('');
  const router = useRouter();

  const handleMetaRowAdd = () => {
    setMetaRows(metarows => {
      metarows.push(metarow);
      return [...metarows];
    })
  }

  const handleSetDefaultMeta = () => {
    setMetaRows(JSON.parse(JSON.stringify(defaultmetarows)))
  }

  const handleMetaChange = (event, index, id) => {
    const newvalue = event.target.value;
    setMetaRows(metarows => {
      metarows[index][id] = newvalue;
      return [...metarows];
    })
  }

  const handleSrcChange = (event) => {
    const newvalue = event.target.value;  //event.target.value must be outside of setState!
    setSrc(newvalue);
  }

  const resetFields = () => {
    setSrc('');
    setMetaRows([{ ...metarow }]);
  }

  const handleSubmit = () => {
    //Get image_config
    if (src === '') {
      return setResponse("Enter src");
    }
    if (!src.includes('.') || src.includes(' ')) {
      return setResponse("Invalid image format, needs extension and no spaces");
    }
    setResponse('loading');

    const pass = router.query.pass;
    addImage(pass, src, metarows, callback);

    function callback(response) {
      if (response === 'success') {
        setResponse("Image " + src + " added");
        resetFields();
      }
      else {
        setResponse(response);
      }
    }
  }

  return (
    <>
      <Grid item container justify='center' xs={12}>
        <Typography variant='h6'>
          Add Image
        </Typography>
      </Grid>
      <Grid item container justify='center' xs={6} className={classes.srcinputcont}>
        <TextField label='src' className={classes.textinput} value={src} onChange={handleSrcChange} />
      </Grid>
      <Grid item container direction='column' xs={6} className={classes.metainputcont}>
        {metarows.map((metarow, index) => (
          <Grid item container direction='row' xs={12} key={index}>
            <Grid item container justify='flex-end' xs={6}>
              <TextField label='label' className={classes.textinput} value={metarow.label} onChange={(event) => handleMetaChange(event, index, 'label')} />
            </Grid>
            <Grid item container justify='flex-start' xs={6}>
              <TextField label='value' className={classes.textinput} value={metarow.value} onChange={(event) => handleMetaChange(event, index, 'value')} />
            </Grid>
          </Grid>
        ))}
        <Grid item container xs={12} justify='center'>
          <Button variant="outlined" color='secondary' style={{ margin: 10 }} onClick={handleSetDefaultMeta}>
            Default
          </Button>
          <Button variant="outlined" color='secondary' style={{ margin: 10 }} onClick={handleMetaRowAdd}>
            Add Row
          </Button>
        </Grid>
      </Grid>
      <Grid item container xs={12} alignItems='center' direction='column'>
        <Grid item>
          <Button variant="outlined" color='secondary' onClick={handleSubmit}>
            Submit
          </Button>
        </Grid>
        <Grid item>
          {
            response === 'loading' ?
              <LoadingIcon />
              :
              <Typography variant='body1' className={classes.responsecont}>
                {response}
              </Typography>
          }
        </Grid>
      </Grid>
    </>
  );
}
