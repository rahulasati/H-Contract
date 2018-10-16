import React, { Component } from 'react';
import loader from '../loader.svg';
  
class Loader extends Component {
  render() {
    return (
     
        <div className="loader none">
        <div>
            <img src={loader} className="App-loader" alt="logo" />
            <label>Please Wait...</label>
            </div>
        </div>
   
    );
  }
}

export default Loader;