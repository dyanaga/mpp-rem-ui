import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import './App.css';
import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from "./containers/Login";
import MainPage from "./containers/MainPage";
import PrivateRoute from "./components/PrivateRoute";
import Logout from "./containers/Logout";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path='/login'>
                    <Login/>
                </Route>
                <Route exact path='/logout'>
                    <Logout/>
                </Route>

                <PrivateRoute path='/' component={MainPage}/>

            </Switch>
        </Router>
    );
}

export default App;
