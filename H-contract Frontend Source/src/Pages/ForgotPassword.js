import React, { Component } from 'react';
import { Link } from "react-router-dom";
import SweetAlert from 'react-bootstrap-sweetalert';
import api from '../utils/api.js';
import { withRouter } from 'react-router';
import Loader from '../components/Loader.js';
import Footer from '../components/Footer.js';
import $ from 'jquery';

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            msg: '',
            forgotPassword: false,
            error: '',
            alert: ''
        };
        this.hideAlertSuccess = this.hideAlertSuccess.bind(this);
    }
    sendResetLink(event) {
        event.preventDefault();
        if (this.refs.email.value === '') {
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
            const email = this.refs.email.value;
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
                .catch((err) => {

                })
        }

    }
    hideAlertSuccess() {
        this.setState({
            alert: ''
        });
        this.props.history.push("/Login");
    }
    render() {
        $('body').addClass('single');
        let errorMgs = this.state.error !== '' ? <p className="alert warning"> <i className="fa fa-info-circle"></i> {this.state.error}</p> : <span />
        return (
            <div>
                <Loader />
                <div className="login-contract">
                    <div class="wrapper wrapper-full-page">
                        <div class="full-page login-page section-image">
                            <div class="content">
                                <div class="container">
                                    <div class="col-md-4 ml-auto mr-auto">
                                        {this.state.alert}
                                        <form onSubmit={this.sendResetLink.bind(this)}>
                                            <div class="card card-login card-plain">
                                                <div class="card-header ">
                                                    <div class="logo-container logo">
                                                        <Link to="/"> <h2 class="spin">H-Contract</h2></Link>
                                                    </div>
                                                </div>
                                                <div class="card-body ">
                                                    <div class="input-group no-border form-control-lg">
                                                        <span class="input-group-prepend">
                                                            <div class="input-group-text">
                                                                <i class="now-ui-icons users_circle-08"></i>
                                                            </div>
                                                        </span>
                                                        <input type="text" class="form-control" ref="email" placeholder="Email..." />
                                                    </div>
                                                    {errorMgs}
                                                </div>
                                                <div class="card-footer ">
                                                    <button type="submit" class="btn btn-primary btn-round btn-lg btn-block mb-3">Login</button>
                                                    <div class="pull-left">
                                                        <h6><Link to="/register" class="link footer-link">Create Account</Link></h6>
                                                    </div>
                                                    <div class="pull-right">
                                                        <h6><Link to="/login" class="link footer-link">Back to Login?</Link></h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default withRouter(ResetPassword);