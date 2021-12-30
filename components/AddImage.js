import React, { useState } from 'react';
import { Grid, makeStyles, Typography, Button } from '@material-ui/core';
import TextField from '../components/TextField';
import LoadingIcon from '../components/LoadingIcon';
import { useRouter } from 'next/router';

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
  },
}));

const emptyMetaRow = { label: '', value: '' };
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
  const [metarows, setMetaRows] = useState([{ ...emptyMetaRow }]);
  const [src, setSrc] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleMetaRowAdd = () => {
    setMetaRows(metarows => {
      metarows.push(emptyMetaRow);
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
    const newvalue = event.target.value;
    setSrc(newvalue);
  }

  const resetFields = () => {
    setSrc('');
    setMetaRows([{ ...emptyMetaRow }]);
  }

  const handleSubmit = async () => {
    //Get image_config
    if (src === '') {
      return setMessage("Enter src");
    }
    if (!src.includes('.') || src.includes(' ')) {
      return setMessage("Invalid image format, needs extension and no spaces");
    }
    setMessage('loading');

    const response = await fetch('/api/admin/images/add', {
      method: 'PUT',
      body: JSON.stringify({
        src,
        meta: metarows.filter((metarow) => metarow.value && metarow.label),
      })
    });

    if (response.status !== 200) {
      if (response.status === 403) {
        router.push('/login');
        return;
      }
      // Error adding image
      setMessage('Error')
      return;
    }

    setMessage(`Image ${src} added`);
    resetFields();
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
          <Grid item container direction='row' key={index}>
            <Grid item container justify='flex-end' xs={6}>
              <TextField label='label' className={classes.textinput} value={metarow.label} onChange={(event) => handleMetaChange(event, index, 'label')} />
            </Grid>
            <Grid item container justify='flex-start' xs={6}>
              <TextField label='value' className={classes.textinput} value={metarow.value} onChange={(event) => handleMetaChange(event, index, 'value')} />
            </Grid>
          </Grid>
        ))}
        <Grid item container direction='row' justify='center'>
          <Grid item>
            <Button variant="outlined" color='secondary' style={{ margin: 10 }} onClick={handleSetDefaultMeta}>
              Default
            </Button>
            <Button variant="outlined" color='secondary' style={{ margin: 10 }} onClick={handleMetaRowAdd}>
              Add Row
            </Button>
          </Grid>
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
            message === 'loading' ?
              <LoadingIcon />
              :
              <Typography variant='body1' className={classes.responsecont}>
                {message}
              </Typography>
          }
        </Grid>
      </Grid>
    </>
  );
}
