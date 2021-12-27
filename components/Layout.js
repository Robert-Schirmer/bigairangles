import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Container, makeStyles, Grid } from '@material-ui/core';
import Copyright from './Copyright';
import Navigation from './Navigation';
import pack from '../package.json';

const useStyles = makeStyles(theme => ({
    root: {
        padding: 0,
        maxWidth: 2000
    },
    nav: {

    },
    main: {
        padding: 25,
        paddingTop: 0
    },
    footer: {
        padding: 15,
        marginTop: 5,
        minHeight: 180,
    },
    maillink: {
        textDecoration: 'none',
        color: '#fff',
        '&:hover': {
            textDecoration: 'underline'
        },
    }
}));

export default function Layout(props) {
    const classes = useStyles();
    const email = 'contact@bigairangles.com'

    return (
        <div>
            <Container className={classes.root}>
                <Grid container item className={classes.nav}>
                    <Navigation />
                </Grid>
                <Grid container item className={classes.main}>
                    {props.children}
                </Grid>
            </Container>
            <Grid container justify='center' alignItems='center' direction='column' className={classes.footer}>
                <Grid item style={{ paddingBottom: 10 }}>
                    <a href={"mailto: " + email} className={classes.maillink}>
                        <Typography variant='body1'>
                            {email}
                        </Typography>
                    </a>
                </Grid>
                <Grid item>
                    <Copyright />
                </Grid>
                <Grid item>
                    <Typography variant='caption'>
                        v{pack.version}
                    </Typography>
                </Grid>
            </Grid>
        </div>
    );
}
