import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Grid, makeStyles, Typography, IconButton } from '@material-ui/core';
import LoadingIcon from '../components/LoadingIcon';
import { TrashIcon } from '../src/icons';
import { getAllForms, sendHideForm } from './functions/requests';

const useStyles = makeStyles(theme => ({
  formscont: {
    maxWidth: 600
  },
  aform: {
    padding: 20
  },
  trashicon: {
    border: '2px solid ' + theme.palette.secondary.main
  },
  buttoncont: {
    padding: 20,
    paddingTop: 15
  }
}));

export default function ManageForms() {
  const classes = useStyles();
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (router.query.pass !== undefined) {
      getForms();
    }
  }, [router])

  const getForms = () => {
    const pass = router.query.pass;

    getAllForms(pass, callback);

    function callback(response) {
      if (response.error) {
        setLoading(false);
        setResponse(response.message);
      }
      else {
        setForms(response);
        setLoading(false);
      }
    }
  }

  const hideForm = (formid, index) => {
    //Send request to hide form
    const pass = router.query.pass;

    sendHideForm(pass, formid, callback);

    function callback(response) {
      if (response.error) {
        setLoading(false);
        setResponse(response.message);
      }
      else {
        setResponse('');
        setForms(forms => {
          forms.splice(index, 1);
          return [...forms];
        });
      }
    }
  }

  return (
    <>
      <Grid item container justify='center' xs={12}>
        <Typography variant='h6'>
          Forms
        </Typography>
      </Grid>
      <Grid item container justify='center' alignItems='center' direction='column' xs={12} className={classes.formscont}>
        {
          loading ?
            <Grid container justify='center'>
              <LoadingIcon />
            </Grid>
            :
            <>
              <Grid container justify='center'>
                <Grid item>
                  {response}
                </Grid>
              </Grid>
              {
                forms.length === 0 ?
                  <Grid container justify='center'>
                    <Typography variant='h6'>
                      No forms...
                    </Typography>
                  </Grid>
                  :
                  <>
                    {
                      forms.map((form, index) => (
                        <Grid container direction='column' className={classes.aform} key={index}>
                          <Grid item>
                            <Typography>{form.date}</Typography>
                          </Grid>
                          <Grid item>
                            <Typography>Name: {form.name}</Typography>
                          </Grid>
                          <Grid item>
                            <Typography>Phone: {form.phone}</Typography>
                          </Grid>
                          <Grid item>
                            <Typography>Email: {form.email}</Typography>
                          </Grid>
                          <Grid item>
                            <Typography>{"Zip: "}
                              <a target="_blank" style={{ color: 'inherit' }} href={"https://google.com/maps/search/" + form.zipcode}>
                                {form.zipcode}
                              </a>
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography>Note:<br />{form.note}</Typography>
                          </Grid>
                          <Grid item className={classes.buttoncont}>
                            <IconButton onClick={() => hideForm(form.id, index)} className={classes.trashicon}>
                              <TrashIcon style={{ padding: 2 }} />
                            </IconButton>
                          </Grid>
                        </Grid>
                      ))
                    }
                  </>
              }
            </>
        }
      </Grid>
    </>
  );
}
