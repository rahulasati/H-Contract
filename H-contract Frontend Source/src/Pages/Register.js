import React, { Component } from 'react';
import { withRouter } from 'react-router';
import api from '../utils/api.js';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Link } from "react-router-dom";
import Loader from '../components/Loader.js';
import Footer from '../components/Footer.js';
import $ from 'jquery';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alert: null,
            terms: 'not-accepted',
            error:''
        }
        this.hideAlertSuccess = this.hideAlertSuccess.bind(this);
    }
    docreateUser = (event) => {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (this.refs.name.value === '') {
            this.setState({
                error: 'Name is required field'
            })
        }
        else if (this.refs.email.value === '') {
            this.setState({
                error: 'Email is required field'
            })
        }
        else if (!this.refs.email.value.match(mailformat)) {
            this.setState({
                error: 'Email is Not Valid'
            })
        }
        else if (this.refs.password.value === '') {
            this.setState({
                error: 'Password is required field'
            })
        }
        else if (this.refs.password.value.length < 8) {
            this.setState({
                error: 'Password should be min 8 characters long'
            })
        }

        else if (this.refs.password.value !== this.refs.confirmPassword.value) {
            this.setState({
                error: 'Confirm Password should Match with Password'
            })
        }
        else if (this.state.terms === 'not-accepted') {
            this.setState({
                error: 'Please Accept Terms and Conditions'
            })
        }
        else {
            this.setState({
                error: ''
            })
            this.createUser(event);
        }
    }




    createUser(event) {
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
        this.props.history.push('/Login')
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
    render() {
        $('body').addClass('single');
        let errorMgs = this.state.error !== '' ? <p className="alert warning"> <i className="fa fa-info-circle"></i> {this.state.error}</p> : <span />
        return (
            <div className="register-contract">
                <div className="wrapper wrapper-full-page ">
                <Loader/>
                    <div className="full-page register-page section-image" filter-color="black" data-image="../../assets/img/bg16.jpg">
                        <div className="content">
                            <div className="container">
                                <div className="row">
                                {this.state.alert}
                                    {/* <div className="col-md-5 ml-auto">
                                        <div className="info-area info-horizontal mt-5">
                                            <div className="icon icon-primary">
                                                <i className="now-ui-icons media-2_sound-wave"></i>
                                            </div>
                                            <div className="description">
                                                <h5 className="info-title">Lorem ipsum</h5>
                                                <p className="description">
                                                    Nullam rhoncus ultrices feugiat. In hac habitasse platea dictumst
                                                </p>
                                            </div>
                                        </div>
                                        <div className="info-area info-horizontal">
                                            <div className="icon icon-primary">
                                                <i className="now-ui-icons media-1_button-pause"></i>
                                            </div>
                                            <div className="description">
                                                <h5 className="info-title">Lorem ipsum</h5>
                                                <p className="description">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec at leo sed elit bibendum egestas eu in est.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="info-area info-horizontal">
                                            <div className="icon icon-info">
                                                <i className="now-ui-icons users_single-02"></i>
                                            </div>
                                            <div className="description">
                                                <h5 className="info-title">Lorem ipsum</h5>
                                                <p className="description">
                                                    Nullam rhoncus ultrices feugiat. In hac habitasse platea dictumst
                                                </p>
                                            </div>
                                        </div>
                                    </div> */}
                                    <div className="col-md-4 mr-auto center">
                                        <div className="card card-signup text-center">
                                            <div className="card-header ">
                                                <h4 className="card-title">Register</h4>
                                            </div>
                                            <div className="card-body ">
                                                <form className="form">
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
                                                        <input type="text" ref="email"  className="form-control" placeholder="Email..." />
                                                    </div>
                                                    <div className="input-group">
                                                        <div className="input-group-prepend">
                                                            <div className="input-group-text">
                                                                <i className="now-ui-icons text_caps-small"></i>
                                                            </div>
                                                        </div>
                                                        <input type="password"  ref="password" className="form-control" placeholder="Password..." />
                                                    </div>
                                                    <div className="input-group">
                                                        <div className="input-group-prepend">
                                                            <div className="input-group-text">
                                                                <i className="now-ui-icons text_caps-small"></i>
                                                            </div>
                                                        </div>
                                                        <input type="password" className="form-control"  ref="confirmPassword" placeholder="Confirm Password..." />
                                                    </div>
                                                    <div className="form-check text-left">
                                                        <label className="form-check-label">
                                                            <input className="form-check-input" type="checkbox" onChange={this.AcceptTerms.bind(this)} />
                                                            <span className="form-check-sign"></span>
                                                            I agree to the <Link to = "/">terms and conditions</Link>.
                                                        </label>
                                                    </div>
                                                </form>
                                                {errorMgs}
                                            </div>
                                        
                                            <div className="card-footer ">
                                                <button className="btn btn-primary btn-round btn-lg" onClick={this.docreateUser.bind(this) }>Get Started</button>
                                                <h6 className="back-to-login"><Link to="/login" className="link footer-link">Back to Login?</Link></h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default withRouter(Register);