import React, { Component } from 'react';
import { Link } from "react-router-dom";
import SweetAlert from 'react-bootstrap-sweetalert';
import api from '../utils/api.js';
import { withRouter } from 'react-router';
import Footer from '../components/Footer.js';
import $ from 'jquery';

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      msg: '',
      forgotPassword: false,
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
    let tokens = this.getParameterByName('token', window.location.href);
    if (!tokens) {
      this.setState({
        error: 'Invalid Url'
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
        error: 'Confirm Password did Match with New Password'
      })
    } else {
      this.setState({
        error: ''
      })
      this.ResetPassword(tokens);
    }
  }

  ResetPassword(tokens) {
    const getSuccessAlert = (msg) => (
      <SweetAlert success title="Success" onConfirm={this.hideAlertSuccess}>
        {msg}
      </SweetAlert>
    );
    const password = this.refs.password.value;
    const token = tokens;
    var postData = {
      password: password,
      token: token
    };
    api.post('user/resetPassword', postData)
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


  render() {
    let errorMgs = this.state.error !== '' ? <p className="alert warning"> <i className="fa fa-info-circle"></i> {this.state.error}</p> : <span />
    $('body').addClass('single');

    return (
      <div className="login-contract">
        <div class="wrapper wrapper-full-page">
          <div class="full-page login-page section-image">
            <div class="content">
              <div class="container">
                <div class="col-md-4 ml-auto mr-auto">
                  {this.state.alert}
                  {/* <form class="form" method="" action="#"> */}
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
                            <i class="now-ui-icons text_caps-small"></i>
                          </div>
                        </span>
                        <input type="password" class="form-control" ref="password" placeholder="Password..." />
                      </div>
                      <div class="input-group no-border form-control-lg">
                        <div class="input-group-prepend">
                          <div class="input-group-text">
                            <i class="now-ui-icons text_caps-small"></i>
                          </div>
                        </div>
                        <input type="password" ref="confirmPassword" placeholder="Confirm Password..." class="form-control" />
                      </div>
                      {errorMgs}
                    </div>
                    <div class="card-footer ">
                      <button class="btn btn-primary btn-round btn-lg btn-block mb-3" onClick={this.doResetPassword.bind(this)}>Update</button>
                    </div>
                  </div>
                  {/* </form> */}
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