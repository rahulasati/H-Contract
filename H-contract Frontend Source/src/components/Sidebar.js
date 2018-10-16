import React, { Component } from 'react';
import { Link } from "react-router-dom";
import api from '../utils/api';
import $ from 'jquery';

class Sidebar extends Component {
  static mInstance;

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      update: false
    };
    Sidebar.mInstance = this;
  }

  static getInstance() {
    return Sidebar.mInstance;
  }

  refresh = () => {
    this.setState({ update: true });
  };

  doLogout() {
    api.logout();
  }

  render() {
    $(function () {
      $('.sidebar ul li a').each(function () {
        if ($(this).prop('href') == window.location.href) {
          console.log(window.location.href)
          $(this).parent('li').siblings('li').removeClass('active');
          $(this).parent('li').addClass('active');
        }
      });
    });

    let email = '';
    if (localStorage.getItem('auth_token') != null) {
      email = JSON.parse(localStorage.getItem('auth_email'));
    }

    return (
      <div className="sidebar" data-color="blue" >
        <div className="logo">
          <Link to="/"> <h2 className="spin">H-Contract</h2></Link>
        </div>
        <div className="sidebar-wrapper">
          <ul className="nav">
            <span className="email"><i className={email !== '' ? 'fa fa-envelope' : 'fa fa-user-circle'}></i>{email !== '' ? email : 'Guest User'}</span>
            <li className="active" >
              <Link to="/createContract">
                <i className="fa fa-plus-circle"></i>
                <p>Create Contract</p>
              </Link>
            </li>
            <li>
              <Link to="/myContract">
                <i className="fa fa-file"></i>
                <p>My Contract</p>
              </Link>
            </li>
            {/* <li>
              <a href="mailto:spinwish@spinfluence.co">
                <i className="fa fa-phone-square"></i>
                <p>Support</p>
              </a>
            </li> */}
            <li>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Sidebar;