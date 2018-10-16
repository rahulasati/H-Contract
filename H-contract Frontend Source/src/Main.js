import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import DefaultLayout from './DefaultLayout';
import Login from './Pages/Login';
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';
import Register from './Pages/Register';
import Verification from './Pages/resendEmail';
import 'font-awesome/css/font-awesome.min.css';

class Main extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/login" name="Login Page" component={Login} />
                    <Route exact path="/forgotpassword" name="Forgot Password" component={ForgotPassword} />
                    <Route exact path="/resetpassword" name="Reset Password" component={ResetPassword} />
                    <Route exact path="/register" name="Register" component={Register} />
                    <Route exact path="/resendEmail" name="Register" component={Verification} />
                    <Route path="/" name="Home" component={DefaultLayout} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default Main;