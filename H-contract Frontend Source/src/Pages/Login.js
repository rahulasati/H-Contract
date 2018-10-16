import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router';
import api from '../utils/api.js';
import Loader from '../components/Loader.js';
import Footer from '../components/Footer.js';
import $ from 'jquery';



class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
          email: '',
          msg: '',
          forgotPassword: false,
          error: '',
  
        };
      }
      componentWillMount() {
        if (localStorage.getItem('auth_token') != null) {
          window.location.href='/';
        }
       
      }
      doLogin = (event) => {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (this.refs.email.value === '') {
          this.setState({
            error: 'Email is required field'
          })
        }
        else if (!this.refs.email.value.match(mailformat)) {
          this.setState({
            error: 'Email Not Valid'
          })
    
        }
        else if (this.refs.password.value === '') {
          this.setState({
            error: 'Password is required field'
          })
        }
        else {
          this.setState({
            error: ''
          })
          this.login(event);
        }
        event.preventDefault();
      }
    
    
      login(event) {
        event.preventDefault();
        const email = this.refs.email.value;
        const password = this.refs.password.value;
        var postData = {
          email: email,
          password: password
        };
        api.post('user/login', postData)
          .then((response) => {
            localStorage.setItem('auth_profile', JSON.stringify(response.data.data));
            localStorage.setItem('auth_token', response.data.data.token);
            localStorage.setItem('auth_email', JSON.stringify(response.data.data.email));
            this.props.history.push('/')      
          })
      }
      render() {
        let errorMgs = this.state.error !== '' ? <p className="alert warning"> <i className="fa fa-info-circle"></i> {this.state.error}</p> : <span />
        $('body').addClass('single');
        return (
            <div>
                <Loader/>
            <div className="login-contract">
                <div className="wrapper wrapper-full-page">
                    <div className="full-page login-page section-image">
                        <div className="content">
                            <div className="container">
                                <div className="col-md-4 ml-auto mr-auto">
                                <form onSubmit={this.doLogin.bind(this)}>
                                        <div className="card card-login card-plain">
                                            <div className="card-header ">
                                                <div className="logo-container logo">
                                                  <Link to="/"> <h2 class="spin">H-Contract</h2></Link>
                                                </div>
                                            </div>
                                            
                                            <div className="card-body ">
                                                <div className="input-group no-border form-control-lg">
                                                    <span className="input-group-prepend">
                                                        <div className="input-group-text">
                                                            <i className="now-ui-icons users_circle-08"></i>
                                                        </div>
                                                    </span>
                                                    <input type="text" className="form-control" ref="email"  placeholder="Email..." />
                                                </div>
                                                <div className="input-group no-border form-control-lg">
                                                    <div className="input-group-prepend">
                                                        <div className="input-group-text">
                                                            <i className="now-ui-icons text_caps-small"></i>
                                                        </div>
                                                    </div>
                                                    <input type="password" ref="password" placeholder="Password..." className="form-control" />
                                                </div>
                                                {errorMgs}
                                            </div>
                                            
                                            <div className="card-footer ">
                                            
                                                <button type="submit" className="btn btn-primary btn-round btn-lg btn-block mb-3">Login</button>
                                                <div className="pull-left">
                                                    <h6><Link to="/register" className="link footer-link">Create Account</Link></h6>
                                                </div>
                                                <div className="pull-right">
                                                    <h6><Link to="/forgotPassword" className="link footer-link">Forgot Password?</Link></h6>
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
            <Footer/>
            </div>
        );
    }
}

export default withRouter(Login);