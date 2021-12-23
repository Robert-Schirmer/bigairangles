import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Grid, AppBar, Toolbar, IconButton, List, ListItem, Divider, Hidden, Drawer, useTheme } from '@material-ui/core';
import { MenuIcon } from '../src/icons';
import PageLink from './PageLink';
import MainLogo from './MainLogo';

const drawerWidth = 150;

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        padding: 10,
        marginBottom: 20
    },
    appbar: {
        backgroundColor: 'transparent',//theme.palette.background.default, //Background color
        color: theme.palette.primary.main, //Text color
    },
    nav: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    drawer: {
        width: drawerWidth,
        backgroundColor: theme.palette.background.default, //Background color
        borderRight: '2px solid ' + theme.palette.secondary.main,
    },
    underline: {
        borderBottom: '2px solid ' + theme.palette.secondary.main,
        width: 5,
        '-webkit-transition': 'width 0.5s ease-out',
        '-moz-transition': 'width 0.5s ease-out',
        '-o-transition': 'width 0.5s ease-out',
        'transition': 'width 0.5s ease-out',
    },
}));

const activeunderline = {
    width: '100%'
}

export default function Navigation(props) {
    const classes = useStyles();
    const [drawer_open, setDrawerOpen] = useState(false);
    const { pages } = useTheme();

    const toggleDrawer = () => {
        setDrawerOpen(drawer_open => !drawer_open);
    }

    const LinkText = ({ page }) => {
        const [activepage, setAPage] = useState();

        useEffect(() => {
            //Set current active page
            const pagestr = window.location.href.split('/')[3].split('?')[0]; //Get page from url
            setAPage(pagestr);
        }, [])

        return (
            <div>
                <Typography variant='h6'>
                    {page.text}
                </Typography>
                <div className={classes.underline} style={page.href.substr(1) === activepage ? activeunderline : undefined} />
            </div>
        )
    }


    const drawer = (
        <div>
            <List className={classes.appbar} >
                <ListItem component={PageLink} href={'/'} style={{ paddingBottom: 40 }}>
                    <MainLogo />
                </ListItem>
                {pages.map((page, index) => (
                    <ListItem button key={index} component={PageLink} href={page.href} style={{ paddingTop: 15, paddingBottom: 15 }}>
                        <LinkText page={page} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <div className={classes.root}>
            <AppBar className={classes.appbar} position="static" elevation={0}>
                <Toolbar>
                    <Hidden smUp>
                        {/*Nav in drawer on smaller screens */}
                        <Grid container direction='row' alignItems='center'>
                            <Grid item xs={4}>
                                <IconButton edge="start" aria-label="menu" onClick={toggleDrawer} style={{ marginLeft: 5 }}>
                                    <MenuIcon />
                                </IconButton>
                            </Grid>
                            <Grid item container component={PageLink} href={'/'} justify='center' xs={4}>
                                <MainLogo logoonly />
                            </Grid>
                            <Grid item xs={4}>
                            </Grid>
                        </Grid>
                    </Hidden>
                    <Hidden xsDown>
                        {/*Nav shown across top on bigger screens */}
                        <Grid container alignItems='center' justify='center' direction='column'>
                            <Grid component={PageLink} href={'/'} item className={classes.logocont}>
                                <MainLogo />
                            </Grid>
                            <Grid item container direction='row' justify='center' spacing={8} style={{ paddingTop: 50 }}>
                                {pages.map((page, index) => (
                                    <Grid item component={PageLink} key={index} href={page.href}>
                                        <LinkText page={page} />
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Hidden>
                </Toolbar>
            </AppBar>
            <Hidden smUp>
                <nav className={classes.nav}>
                    <Drawer
                        variant="temporary"
                        anchor={'left'}
                        open={drawer_open}
                        onClose={toggleDrawer}
                        classes={{
                            paper: classes.drawer,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </nav>
            </Hidden>
        </div>
    );
}