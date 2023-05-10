import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {login} from '../api/login'
import FormControl from "@material-ui/core/FormControl";
import Copyright from "../components/Copyright";
import {Redirect} from "react-router-dom";
import Cookies from 'universal-cookie';
import {COOKIES} from "../constants";

const cookies = new Cookies();

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Login(props) {
    const classes = useStyles();

    useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [hasError, setHasError] = useState(false);

    function onLogin() {
        login(username, password, successfulLogin, onErrorLogin)
    }

    function loginAsGuest() {
        login("GUEST", "", successfulLogin, onErrorLogin)
    }

    function successfulLogin(json, status) {
        if (status === 200) {
            const expirationDate = new Date();
            expirationDate.setTime(expirationDate.getTime() + (60*60*1000));
            cookies.set(COOKIES.TOKEN_KEY, json.token, {expires: expirationDate});

            setHasError(false);
            setLoggedIn(true);
        } else {
            cookies.remove(COOKIES.TOKEN_KEY);
            setHasError(true);
        }
    }

    function onErrorLogin(status) {
        setHasError(true);
    }

    function changeUsername(event) {
        setUsername(event.target.value)
    }

    function changePassword(event) {
        setPassword(event.target.value)
    }

    return !loggedIn ? (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Log in
                    </Typography>
                    <FormControl className={classes.form} noValidate onSubmit={event => {
                    }}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            onChange={changeUsername}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={changePassword}
                        />
                        {
                            hasError &&
                            <Typography component="h1" color="error">
                                Invalid username or password, please try again.
                            </Typography>

                        }
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={onLogin}
                        >
                            Log In
                        </Button>
                        <Button
                            fullWidth
                            variant="contained"
                            color="secondary"
                            className={classes.submit}
                            onClick={loginAsGuest}
                        >
                            Log In as Guest
                        </Button>
                    </FormControl>
                </div>
                <Box mt={8}>
                    <Copyright/>
                </Box>
            </Container>
        ) :
        (
            <Redirect to={{pathname: '/'}}/>
        )
}
