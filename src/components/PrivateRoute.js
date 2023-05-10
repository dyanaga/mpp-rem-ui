import React from 'react'
import {Redirect, Route} from 'react-router-dom'
import Cookies from 'universal-cookie'
import {COOKIES} from "../constants";

const cookies = new Cookies();
const PrivateRoute = ({component: Component, ...rest}) => {

    // Add your own authentication on the below line.

    const isLoggedIn = cookies.get(COOKIES.TOKEN_KEY);
    if(!isLoggedIn) {
        console.log("Redirecting back to login since not logged in.")
    }
    return (
        <Route
            {...rest}
            render={props =>
                isLoggedIn ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
                )
            }
        />
    )
};

export default PrivateRoute
