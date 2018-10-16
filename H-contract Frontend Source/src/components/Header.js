import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Sidebar from './Sidebar.js';

class Header extends Component {
  static mInstance;

  constructor(props) {
    super(props);
    this.state = {
      update: false,
      title: ''
    };
    Header.mInstance = this;
    this.doLogout = this.doLogout.bind(this);
  }

  static getInstance() {
    return Header.mInstance;
  }

  refresh = () => {
    this.setState({ update: true });
  };

  updateTitle = (title) => {
    this.setState({ title: title });
  };

  doLogout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_profile');
    localStorage.removeItem('auth_email');
    this.refresh();
    Sidebar.getInstance().refresh();
    this.props.history.push('/createContract')
  }

  render() {
    let reg
    if (localStorage.getItem('auth_token') == null) {
      reg = <div className="sign"><Link to="/Login" className="btn btn-info btn-round data-color"><i className="fa fa-user"></i> Login</Link><Link to="/register" className="btn btn-info btn-round data-color"><i className="fa fa-user"></i> Sign up</Link></div>;
    } else {
      reg = <div className="sign"><a className="btn btn-info btn-round data-color" onClick={this.doLogout.bind(this)}><i className="fa fa-power-off"></i> Logout</a></div>;
    }
    return (
      <nav className="navbar navbar-expand-lg navbar-transparent  navbar-absolute bg-primary fixed-top">
        <div className="container-fluid">
          <div className="navbar-wrapper">
            <h3>{this.state.title}</h3>
            <div className="navbar-toggle">
              <button type="button" className="navbar-toggler">
                <span className="navbar-toggler-bar bar1"></span>
                <span className="navbar-toggler-bar bar2"></span>
                <span className="navbar-toggler-bar bar3"></span>
              </button>
            </div>
          </div>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-bar navbar-kebab"></span>
            <span className="navbar-toggler-bar navbar-kebab"></span>
            <span className="navbar-toggler-bar navbar-kebab"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navigation">
            {reg}
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(Header)