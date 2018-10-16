import React, { Component } from 'react';
import { Link } from "react-router-dom";
import SweetAlert from 'react-bootstrap-sweetalert';
import api from '../utils/api.js';
import { withRouter } from 'react-router';
import Loader from '../components/Loader.js';
import Footer from '../components/Footer.js';
import $ from 'jquery';

class Verification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: '',
      error: ''
    };
    this.hideAlertSuccess = this.hideAlertSuccess.bind(this);
  }

  getParameterByName = (name, url) => {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  doResetPassword = (event) => {
    let email = this.getParameterByName('email', window.location.href);
    if (!email) {
      this.setState({
        error: 'Invalid Url'
      })
    } else {
      this.setState({
        error: ''
      })
      this.sendVerifyEmail(email);
    }
  }

  sendVerifyEmail(email) {
    const getfailureAlert = (msg) => (
      <SweetAlert danger title="Error!" onConfirm={this.hideAlertFailure}>
        {msg}
      </SweetAlert>
    );
    const getSuccessAlert = (msg) => (
      <SweetAlert success title="Success!" onConfirm={this.hideAlertSuccess}>
        {msg}
      </SweetAlert>
    );
    var postData = {
      email: email
    };
    api.post('user/sendVerifyEmail', postData)
      .then((res) => {
        this.setState({
          alert: getSuccessAlert(res.data.msg)
        });

      })
      .catch((err) => {
        this.setState({
          alert: getfailureAlert(err.response.data.msg)
        });
      })
  }

  hideAlertSuccess() {
    this.setState({
      alert: null
    });
    this.props.history.push('/Login')
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
                    <div class="card card-login card-plain">
                      <div class="card-header ">
                        <div class="logo-container logo">
                          <Link to="/"> <h2 class="spin">H-Contract</h2></Link>
                        </div>
                      </div>
                      <div class="card-body verify text-center ">
                        <p>Your Account is not verified please check your mail, not received?</p>
                        {errorMgs}
                      </div>
                      <div class="card-footer ">
                        <button type="submit" class="btn btn-primary btn-round btn-lg btn-block mb-3" onClick={this.doResetPassword.bind(this)}>Resend</button>
                        <div class="pull-left">
                          <h6><Link to="/register" class="link footer-link">Create Account</Link></h6>
                        </div>
                        <div class="pull-right">
                          <h6><Link to="/login" class="link footer-link">Back to Login?</Link></h6>
                        </div>
                      </div>
                    </div>
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

export default withRouter(Verification);