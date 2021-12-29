import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import LoadingIcon from '../components/LoadingIcon';
import { useRouter } from 'next/router';

export default function Login() {
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handlePassChange = (event) => {
    const newPass = event.target.value;
    setPass(newPass);
  }

  const handleLogin = async () => {
    setLoading(true);
    setMessage('');
    const response = await fetch('/api/login', {
      method: 'POST',
      body: pass,
    })
    if (response.status !== 200) {
      console.log(response);
      if (response.status === 403) {
        setMessage('Unauthorized');
      }
      else {
        setMessage('Error');
      }
      setLoading(false);
    } else {
      // Login success go to admin page
      router.push('/admin');
    }
  }

  return (
    <Layout>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleLogin();
        }}
        style={{ width: '100%' }}
      >
        <Grid container direction='column' justify='center' alignItems='center' spacing={3}>
          <Grid item>
            <Typography>
              Admin login
            </Typography>
          </Grid>
          {
            loading ?
              <Grid item>
                <LoadingIcon />
              </Grid>
              :
              <>
                <Grid item>
                  <TextField label='password' type='password' value={pass} onChange={handlePassChange} />
                </Grid>
                <Grid item>
                  <Button variant="outlined" color='secondary' style={{ margin: 10 }} onClick={handleLogin}>
                    Login
                  </Button>
                </Grid>
                {message &&
                  <Grid item>
                    <Typography>
                      {message}
                    </Typography>
                  </Grid>
                }
              </>
          }
        </Grid>
      </form>
    </Layout>
  );
}
