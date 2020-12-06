import React from 'react';
//import './App.css';
import clsx from 'clsx';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

//components
import Factura from './components/Factura/Factura';
import Ventas from './components/Ventas/Ventas';

//materual ui
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

//icons
import AssessmentIcon from '@material-ui/icons/Assessment';
import ReceiptIcon from '@material-ui/icons/Receipt';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme
            .transitions
            .create([
                'width', 'margin'
            ], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            })
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme
            .transitions
            .create([
                'width', 'margin'
            ], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen
            })
    },
    menuButton: {
        marginRight: 36
    },
    hide: {
        display: 'none'
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap'
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme
            .transitions
            .create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen
            })
    },
    drawerClose: {
        transition: theme
            .transitions
            .create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [
            theme
                .breakpoints
                .up('sm')
        ]: {
            width: theme.spacing(9) + 1
        }
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
    }
}));

export default function MiniDrawer() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    
    return (
      
        <Router>
            <div className={classes.root}>
                <CssBaseline/>
                <AppBar
                    color="primary"
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open
                    })}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, {
                                [classes.hide]: open
                            })}>
                            <MenuIcon/>
                        </IconButton>
                        <Switch>
                            <Route path="/metricas">
                                <Typography variant="h6" noWrap>
                                    Metricas
                                </Typography>
                            </Route>
                            <Route path="/factura">
                                <Typography variant="h6" noWrap>
                                    Factura
                                </Typography>
                            </Route>
                            <Route path="/ventas">
                                <Typography variant="h6" noWrap>
                                    Ventas
                                </Typography>
                            </Route>
                            <Route path="/gastos">
                                <Typography variant="h6" noWrap>
                                    Gastos
                                </Typography>
                            </Route>
                        </Switch>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open
                    })}
                    classes={{
                        paper: clsx({
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open
                        })
                    }}>
                    <div className={classes.toolbar}>
                    <h3>Facturalin</h3>
                        <IconButton onClick={handleDrawerClose}>
                            {
                                theme.direction === 'rtl'
                                    ? <ChevronRightIcon/>
                                    : <ChevronLeftIcon/>
                            }
                        </IconButton>
                        
                    </div>

                    <List>
                        <Link
                            to="/metricas"
                            style={{
                                color: 'black'
                            }}>
                            <ListItem button>
                                <ListItemIcon >
                                    <AssessmentIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Metricas"/>
                            </ListItem>
                        </Link>

                        <Link
                            to="/factura"
                            style={{
                                color: 'black'
                            }}>
                            <ListItem button>
                                <ListItemIcon>
                                    <ReceiptIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Factura"/>
                            </ListItem>
                        </Link>

                        <Link
                            to="/ventas"
                            style={{
                                color: 'black'
                            }}>
                            <ListItem button>
                                <ListItemIcon>
                                    <LocalOfferIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Ventas"/>
                            </ListItem>
                        </Link>

                        <Link
                            to="/gastos"
                            style={{
                                color: 'black'
                            }}>
                            <ListItem button>
                                <ListItemIcon>
                                    <AttachMoneyIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Gastos"/>
                            </ListItem>
                        </Link>
                    </List>

                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar}/>
                    <Switch>
                        <Route path="/metricas"></Route>
                        <Route path="/factura">
                            <Factura/>
                        </Route>
                        <Route path="/ventas">
                              <Ventas/>
                        </Route>
                        <Route path="/gastos">
                            <Typography variant="h6" >
                                Gastos
                            </Typography>
                        </Route>
                    </Switch>
                </main>
            </div>
        </Router>
    );
}