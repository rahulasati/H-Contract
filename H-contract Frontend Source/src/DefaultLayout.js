import React, { Component } from 'react';
import './App.css';
import { Redirect, Route, Switch, Link } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Header from './components/Header';
import routes from './routes';
import $ from 'jquery';
import api from './utils/api.js';
import SweetAlert from 'react-bootstrap-sweetalert';
import Loader from './components/Loader.js';

class DefaultLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            msg: '',
            forgotPassword: false,
            error: '',
            terms: 'not-accepted',
            alert: ''
        };
        this.hideAlertSuccess = this.hideAlertSuccess.bind(this);
    }
    componentDidMount() {
        $('.action-buttons a').click(function () {
            $('.action-buttons ul li').removeClass('active');
            $(this).parent().addClass('active');
            var x = $(this).attr('data-target');
            $('.popup form').hide();
            $('#' + x).slideToggle();
        })
        $('span.close').click(function () {
            $('.popup').removeClass('active');
        })
    }

    doLogin = (event) => {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (this.refs.l_email.value === '') {
            this.setState({
                error: 'Email is required field'
            })
        } else if (!this.refs.l_email.value.match(mailformat)) {
            this.setState({
                error: 'Email Not Valid'
            })

        } else if (this.refs.l_password.value === '') {
            this.setState({
                error: 'Password is required field'
            })
        } else {
            this.setState({
                error: ''
            })
            this.login(event);
        }
        event.preventDefault();
    }

    login(event) {
        event.preventDefault();
        const email = this.refs.l_email.value;
        const password = this.refs.l_password.value;
        var postData = {
            email: email,
            password: password,
            fromPopup: true
        };
        api.post('user/login', postData)
            .then((response) => {
                localStorage.setItem('auth_profile', JSON.stringify(response.data.data));
                localStorage.setItem('auth_token', response.data.data.token);
                localStorage.setItem('auth_email', JSON.stringify(response.data.data.email));
                $('.popup').removeClass('active');
                $('<div class="copy-notification">You are Logged in now, kindly continue to create the contrcat!</div>').prependTo('body').delay(1000).fadeOut(300, function () {
                    $('.copy-notification').remove();
                })
                Header.getInstance().refresh();
                Sidebar.getInstance().refresh();
            })
    }

    docreateUser = (event) => {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (this.refs.name.value === '') {
            this.setState({
                error: 'Name is required field'
            })
        } else if (this.refs.email.value === '') {
            this.setState({
                error: 'Email is required field'
            })
        } else if (!this.refs.email.value.match(mailformat)) {
            this.setState({
                error: 'Email is Not Valid'
            })
        } else if (this.refs.password.value === '') {
            this.setState({
                error: 'Password is required field'
            })
        } else if (this.refs.password.value.length < 8) {
            this.setState({
                error: 'Password should be min 8 characters long'
            })
        } else if (this.refs.password.value !== this.refs.confirmPassword.value) {
            this.setState({
                error: 'Confirm Password should Match with Password'
            })
        } else if (this.state.terms === 'not-accepted') {
            this.setState({
                error: 'Please Accept Terms and Conditions'
            })
        } else {
            this.setState({
                error: ''
            })
            this.createUser(event);
        }
        event.preventDefault();
    }

    createUser(event) {
        event.preventDefault();
        const getSuccessAlert = (msg) => (
            <SweetAlert success title="Congratulations!" onConfirm={this.hideAlertSuccess}>
                {msg}
            </SweetAlert>
        );
        const name = this.refs.name.value;
        const email = this.refs.email.value;
        const password = this.refs.password.value;
        var postData = {
            email: email,
            password: password,
            name: name,
        };
        api.post('user/register', postData)
            .then((res) => {
                this.setState({
                    alert: getSuccessAlert(res.data.msg)
                });
            })
            .catch((err) => {
            })
    }

    hideAlertSuccess() {
        this.setState({
            alert: null
        });
        $('.action-buttons ul li').removeClass('active');
        $('.action-buttons ul li a[data-target="login"]').parent('li').addClass('active');
        $('.popup form').hide();
        $('#login').slideToggle();
    }

    AcceptTerms(e) {
        let options = this.state.terms
        if (e.target.checked) {
            options = 'accepted'
        } else {
            options = 'not-accepted'
        }
        this.setState({ terms: options })
    }

    sendResetLink(event) {
        event.preventDefault();
        if (this.refs.r_email.value === '') {
            this.setState({
                error: 'Email is required field'
            })
        } else {
            this.setState({
                error: ''
            })
            event.preventDefault();
            const getSuccessAlert = (msg) => (
                <SweetAlert success title="Success!" onConfirm={this.hideAlertSuccess}>
                    {msg}
                </SweetAlert>
            );
            const email = this.refs.r_email.value;
            var postData = {
                email: email,
                resetPwdPage: window.location.origin + '/ResetPassword'

            };
            api.post('user/forgotpassword', postData)
                .then((res) => {
                    this.setState({
                        alert: getSuccessAlert(res.data.msg)
                    });
                })
        }
    }

    sendVerifyEmail(event) {
        event.preventDefault();
        const getSuccessAlert = (msg) => (
            <SweetAlert success title="Success!" onConfirm={this.hideAlertSuccess}>
                {msg}
            </SweetAlert>
        );
        var postData = {
            email: this.refs.l_email.value
        };
        api.post('user/sendVerifyEmail', postData)
            .then((res) => {
                this.setState({
                    alert: getSuccessAlert(res.data.msg)
                });
            })
    }

    render() {
        let errorMgs = this.state.error !== '' ? <p className="alert warning"> <i className="fa fa-info-circle"></i> {this.state.error}</p> : <span />
        return (
            <div className="wrapper">
                <Sidebar />
                <div className="main-panel">
                    <Loader />
                    <Header />
                    <div className="panel-header panel-header-lg">
                    </div>
                    <div className="content">
                        <Switch>
                            {routes.map((route, i) => {
                                return route.component ? (<Route key={i} path={route.path} exact={route.exact} name={route.name} render={props => (
                                    <route.component {...props} />
                                )} />)
                                    : (null);
                            },
                            )}
                            <Redirect from="/" to="/createContract" />
                        </Switch>
                    </div>
                    <Footer />
                    {this.state.alert}
                </div>
                {/******************************** Common Login******************************************/}
                <div className="popup">
                    <div className="dialog">
                        <span className="close">&times;</span>
                        <div className="action-buttons">
                            <ul>
                                <li className="active"><a data-target="login" >Login</a></li>
                                <li><a data-target="register" >Sign up</a></li>
                            </ul>
                        </div>
                        <form onSubmit={this.doLogin.bind(this)} id="login">
                            <div className="card card-login card-plain">
                                <div className="card-body ">
                                    <div className="input-group  form-control-lg">
                                        <span className="input-group-prepend">
                                            <div className="input-group-text">
                                                <i className="now-ui-icons users_circle-08"></i>
                                            </div>
                                        </span>
                                        <input type="text" className="form-control" ref="l_email" placeholder="Email..." />
                                    </div>
                                    <div className="input-group form-control-lg">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text">
                                                <i className="now-ui-icons text_caps-small"></i>
                                            </div>
                                        </div>
                                        <input type="password" ref="l_password" placeholder="Password..." className="form-control" />
                                    </div>
                                    {errorMgs}
                                </div>
                                <div className="card-footer ">
                                    <button type="submit" className="btn btn-primary btn-round btn-lg btn-block mb-3">Login</button>
                                    <div className="pull-right action-buttons">
                                        <a className="link footer-register" data-target="reset-password">Forgot Password?</a>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <form className="card-plain" id="register" onSubmit={this.docreateUser.bind(this)}>
                            <div className="card-body">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <i className="now-ui-icons users_circle-08"></i>
                                        </div>
                                    </div>
                                    <input type="text" ref="name" className="form-control" placeholder="Full Name..." />
                                </div>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <i className="now-ui-icons ui-1_email-85"></i>
                                        </div>
                                    </div>
                                    <input type="text" ref="email" className="form-control" placeholder="Email..." />
                                </div>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <i className="now-ui-icons text_caps-small"></i>
                                        </div>
                                    </div>
                                    <input type="password" ref="password" className="form-control" placeholder="Password..." />
                                </div>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <i className="now-ui-icons text_caps-small"></i>
                                        </div>
                                    </div>
                                    <input type="password" className="form-control" ref="confirmPassword" placeholder="Confirm Password..." />
                                </div>
                                <div className="form-check text-left">
                                    <label className="form-check-label">
                                        <input className="form-check-input" type="checkbox" onChange={this.AcceptTerms.bind(this)} />
                                        <span className="form-check-sign"></span>
                                        I agree to the <Link to="/">terms and conditions</Link>.
                                                      </label>
                                </div>
                                {errorMgs}
                            </div>
                            <div className="card-footer ">
                                <button className="btn btn-primary btn-round btn-lg" type="submit">Get Started</button>
                            </div>
                        </form>
                        <form onSubmit={this.sendResetLink.bind(this)} id="reset-password">
                            <div className="card card-login card-plain">
                                <div className="card-header ">
                                </div>
                                <div className="card-body ">
                                    <div className="input-group no-border form-control-lg">
                                        <span className="input-group-prepend">
                                            <div className="input-group-text">
                                                <i className="now-ui-icons users_circle-08"></i>
                                            </div>
                                        </span>
                                        <input type="text" className="form-control" ref="r_email" placeholder="Email..." />
                                    </div>
                                    {errorMgs}
                                </div>
                                <div className="card-footer ">
                                    <button type="submit" className="btn btn-primary btn-round btn-lg btn-block mb-3">Send Link</button>
                                </div>
                            </div>
                        </form>
                        <form id="resend" onSubmit={this.sendVerifyEmail.bind(this)}>
                            <div className="card-body verify text-center ">
                                <p>Your Account is not verified please check your mail, not received?</p>
                                {errorMgs}
                            </div>
                            <div className="card-footer ">
                                <button type="submit" className="btn btn-primary btn-round btn-lg btn-block mb-3" >Resend</button>
                            </div>
                        </form>
                    </div> </div></div>
        );
    }
}

export default DefaultLayout;