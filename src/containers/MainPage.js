import React, {useEffect} from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {menus} from "../components/menu-items";
import Copyright from "../components/Copyright";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import BrightnessMediumIcon from '@material-ui/icons/BrightnessMedium';
import PersonIcon from '@material-ui/icons/Person';
import {Redirect} from "react-router-dom";
import {whoAmI} from "../api/whoami";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import {ACCOUNT_TYPE} from "../constants";
import EmptyPage from "../components/EmptyPage";
import UsersPage from "./admin/users/UsersPage";
import {UserPage} from "./user/profile/UserPage";
import ListingPage from "./admin/ListingPage";
import PurchaseHistoryPage from "./user/PurchaseHistoryPage";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));

export default function MainPage() {
    const classes = useStyles();
    const [selectedMenu, setSelectedMenu] = React.useState(menus.LISTING_PAGE);
    const [accountType, setAccountType] = React.useState(ACCOUNT_TYPE.NONE);
    const [userId, setUserId] = React.useState('');
    const [mail, setUserMail] = React.useState('');
    const [open, setOpen] = React.useState(true);
    const [logout, setLogout] = React.useState(false);
    const [hasError, setHasError] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleMenuSelection = (event, option) => {
        setSelectedMenu(option);
    };

    const handleLogout = (event) => {
        setLogout(true);
    };

    const handleThemeChange = (event) => {
        const theme = localStorage.getItem("theme");
        if (theme === "dark") {
            localStorage.setItem("theme", "light");
        } else {
            localStorage.setItem("theme", "dark");
        }
        window.location.reload();
    };

    const handleOnErrorClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setHasError(false);
    };

    const getWhoAmI = () => {
        whoAmI(successfulWhoAmI, onError);
    };

    const successfulWhoAmI = (json, status) => {
        setAccountType(ACCOUNT_TYPE[json.type]);
        setUserId(json.userId);
        setUserMail(json.email);
    }

    const onError = (error, status) => {
        setHasError(true);
    }

    const handleHomePageSelection = (event) => {
        handleMenuSelection(event, menus.LISTING_PAGE);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => getWhoAmI(), []);


    return !logout ? (
            <div className={classes.root}>
                <CssBaseline/>
                <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                    <Toolbar className={classes.toolbar}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                            POS Manager
                        </Typography>
                        <IconButton color="inherit" onClick={handleThemeChange}>
                            <BrightnessMediumIcon/>
                        </IconButton>
                        <IconButton color="inherit" onClick={handleLogout}>
                            <ExitToAppIcon/>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                    }}
                    open={open}
                >
                    <div className={classes.toolbarIcon}>
                        <IconButton onClick={handleDrawerClose}>
                            <ChevronLeftIcon/>
                        </IconButton>
                    </div>
                    <Divider/>
                    <ListItem button onClick={event => handleHomePageSelection(event)}>
                        <ListItemIcon>
                            <HomeIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Listings"/>
                    </ListItem>
                    <Divider/>

                    {
                        (
                            accountType !== ACCOUNT_TYPE.GUEST
                        ) &&
                        (<>
                            <List>
                                <ListSubheader inset>Logged in options</ListSubheader>
                                <ListItem button onClick={event => handleMenuSelection(event, menus.USER_PROFILE)}>
                                    <ListItemIcon>
                                        <PersonIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary="My profile"/>
                                </ListItem>
                            </List>
                            <Divider/>
                        </>)
                    }
                    {
                            (
                                    accountType === ACCOUNT_TYPE.CLIENT ||
                                    accountType === ACCOUNT_TYPE.AGENT ||
                                    accountType === ACCOUNT_TYPE.DIRECTOR ||
                                    accountType === ACCOUNT_TYPE.ADMIN
                            ) &&
                            (<>
                                <List>
                                    <ListSubheader inset>Client options</ListSubheader>
                                    <ListItem button onClick={event => handleMenuSelection(event, menus.EMPTY)}>
                                        <ListItemIcon>
                                            <PersonIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary="My offers(TBA)"/>
                                    </ListItem>
                                </List>
                                <Divider/>
                            </>)
                    }
                    {
                            (
                                    accountType === ACCOUNT_TYPE.AGENT ||
                                    accountType === ACCOUNT_TYPE.DIRECTOR ||
                                    accountType === ACCOUNT_TYPE.ADMIN
                            ) &&
                            (<>
                                <List>
                                    <ListSubheader inset>Agent options</ListSubheader>
                                    <ListItem button onClick={event => handleMenuSelection(event, menus.EMPTY)}>
                                        <ListItemIcon>
                                            <PersonIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary="Received reviews (TBA)"/>
                                    </ListItem>
                                    <ListItem button onClick={event => handleMenuSelection(event, menus.EMPTY)}>
                                        <ListItemIcon>
                                            <PersonIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary="My listings (TBA)"/>
                                    </ListItem>
                                    <ListItem button onClick={event => handleMenuSelection(event, menus.EMPTY)}>
                                        <ListItemIcon>
                                            <PersonIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary="Received offers (TBA)"/>
                                    </ListItem>
                                </List>
                                <Divider/>
                            </>)
                    }
                    {
                            (
                                    accountType === ACCOUNT_TYPE.DIRECTOR ||
                                    accountType === ACCOUNT_TYPE.ADMIN
                            ) &&
                            (<>
                                <List>
                                    <ListSubheader inset>Director options</ListSubheader>

                                    <ListItem button onClick={event => handleMenuSelection(event, menus.EMPTY)}>
                                        <ListItemIcon>
                                            <PersonIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary="All offers (TBA)" />
                                    </ListItem>
                                    <ListItem button onClick={event => handleMenuSelection(event, menus.EMPTY)}>
                                        <ListItemIcon>
                                            <PersonIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary="All reviews(TBA)"/>
                                    </ListItem>
                                </List>
                                <Divider/>
                            </>)
                    }
                    {
                            (
                                    accountType === ACCOUNT_TYPE.ADMIN
                            ) &&
                            (<>
                                <List>
                                    <ListSubheader inset>Admin options</ListSubheader>
                                    <ListItem button onClick={event => handleMenuSelection(event, menus.ADMIN_USERS)}>
                                        <ListItemIcon>
                                            <PersonIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary="Users"/>
                                    </ListItem>
                                    <ListItem button onClick={event => handleMenuSelection(event, menus.EMPTY)}>
                                        <ListItemIcon>
                                            <PersonIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary="Bulk operations(TBA)"/>
                                    </ListItem>
                                </List>
                                <Divider/>
                            </>)
                    }

                </Drawer>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer}/>
                    <Container maxWidth="lg" className={classes.container}>

                        {selectedMenu === menus.EMPTY &&
                        <EmptyPage/>}

                        {selectedMenu === menus.LISTING_PAGE &&
                        <ListingPage
                                userId={userId}
                                accountType={accountType}
                        />}

                        {selectedMenu === menus.ADMIN_USERS &&
                        <UsersPage/>}


                        {selectedMenu === menus.USER_PROFILE &&
                        <UserPage mode={"update"} userId={userId}/>}

                        <Box pt={4}>
                            <Copyright/>
                        </Box>
                    </Container>
                </main>
                <Snackbar open={hasError} autoHideDuration={6000} onClose={handleOnErrorClose}>
                    <Alert onClose={handleOnErrorClose} severity="error">
                        Server error!
                    </Alert>
                </Snackbar>
            </div>
        ) :
        (<Redirect to={{pathname: '/logout'}}/>);
}
