import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Grid, Button } from '@material-ui/core';
import { DroneIcon } from '../src/icons';
import StyledTextField from './TextField';
import LoadingIcon from './LoadingIcon';
import { submitContactForm } from './functions/requests';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '40vh'
  },
  formarea: {
    '& > div': {
      width: '100%',
      textAlign: 'center',
    }
  },
  form: {
    width: '100%',
  },
  smallfield: {
    maxWidth: 200,
    marginTop: 30
  },
  largefield: {
    maxWidth: 350,
    marginTop: 50
  },
  button: {
    marginTop: 10
  }
}));

export default function ContactForm(props) {
  const classes = useStyles();
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState('');
  const [errorfield, setErrorField] = useState();
  const defaultform = {
    name: '',
    phone: '',
    email: '',
    zip: '',
    note: '',
  }
  const requiredfields = ['name', 'email', 'note'];
  const [form, setForm] = useState({ ...defaultform });

  const handleSubmit = () => {
    if (!reqFieldsComplete()) {
      return;
    }
    setMessage('');
    setSubmitted('loading');

    submitContactForm(form, callback);

    function callback(response) {
      if (response === 'success') {
        setSubmitted(true);
      }
      else {
        setSubmitted('error');
      }
    }
  }

  const reqFieldsComplete = () => {
    for (let index = 0; index < requiredfields.length; index++) {
      const requiredfield = requiredfields[index];
      const userinput = form[requiredfield];
      if (userinput === undefined || userinput === '') {
        setMessage("Please complete the " + requiredfield + " field");
        setErrorField(requiredfield);
        return false;
      }
    }
    return true;
  }

  const handleFieldChange = (event, label) => {
    const newvalue = event.target.value;
    setErrorField(errorfield => {
      if (errorfield === label) {
        return undefined;
      }
    })
    setForm(form => {
      form[label] = newvalue;
      return { ...form };
    })
  }

  const SumbittedHandler = () => {
    if (submitted === 'loading') {
      return (
        <LoadingIcon />
      )
    }
    else if (submitted === 'error') {
      return (
        <Typography variant='h6' align='center' style={{ paddingTop: 30 }}>
          Error submitting form, please use email at bottom of page
        </Typography>
      )
    }
    else if (submitted) {
      return (
        <Typography variant='h6' align='center' style={{ paddingTop: 30 }}>
          Form submitted, you will hear back within 48 hours.
        </Typography>
      )
    }
    else {
      return (
        null
      )
    }
  }

  return (
    <Grid container alignItems='center' justify='center' direction='column' className={classes.root}>
      <SumbittedHandler />
      {
        submitted === false ?
          <form className={classes.form} noValidate autoComplete="off">
            <Grid container direction='column' className={classes.formarea} justify='center' alignItems='center'>
              <Grid item>
                <StyledTextField className={classes.smallfield} label="Name *" value={form.name} error={errorfield === 'name'}
                  onChange={(event) => handleFieldChange(event, 'name')} />
              </Grid>
              <Grid item>
                <StyledTextField className={classes.smallfield} label="Phone" value={form.phone} error={errorfield === 'phone'}
                  onChange={(event) => handleFieldChange(event, 'phone')} />
              </Grid>
              <Grid item>
                <StyledTextField className={classes.smallfield} label="Email *" value={form.email} error={errorfield === 'email'}
                  onChange={(event) => handleFieldChange(event, 'email')} />
              </Grid>
              <Grid item>
                <StyledTextField className={classes.smallfield} label="Zip Code" value={form.zip} error={errorfield === 'zip'}
                  onChange={(event) => handleFieldChange(event, 'zip')} />
              </Grid>
              <Grid item>
                <StyledTextField className={classes.largefield} label="Note *" value={form.note} error={errorfield === 'note'}
                  onChange={(event) => handleFieldChange(event, 'note')}
                  multiline variant='outlined' rows={5}
                />
              </Grid>
              <Grid container justify='center' direction='column' alignItems='center' spacing={2}>
                <Grid item>
                  <Typography variant='h6'>
                    {message}
                  </Typography>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color='secondary' className={classes.button} onClick={handleSubmit}>
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
          :
          null
      }
    </Grid>
  );
}
