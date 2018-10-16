import axios from 'axios';
import config from './config.js';
import swal from 'sweetalert';
import $ from 'jquery';
let token = () => { return localStorage.getItem('auth_token'); }
let api = {};
var BASE_URL = config.BASE_URL;

let getDefaultHeaders = () => {
  return {
    headers: {
      'Authorization': token()
    }
  }
}

api.getDefaultHeaders = getDefaultHeaders;

api.showLoader = () => {
  $(".loader.none").addClass("show")
}

api.hideLoader = () => {
  $(".loader").addClass("none")
  $(".loader.none").removeClass("show")
}

api.logout = () => {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('auth_profile');
  window.location.href = '/Login';
}

api.get = (url) => {
  let headers = getDefaultHeaders();
  return new Promise(function (resolve, reject) {
    axios.get(`${BASE_URL}/${url}`, headers)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        api.handleError(error);
      })
  });
}

api.post = (url, body) => {
  api.showLoader();
  let headers = getDefaultHeaders();
  return new Promise(function (resolve, reject) {
    axios.post(`${BASE_URL}/${url}`, body, headers)
      .then((response) => {
        resolve(response);
        api.hideLoader();
      }).catch((error) => {
        api.handleError(error, body);
      })
  });
}

api.handleError = (error, body) => {
  api.hideLoader();
  if (error && error.response) {
    if (error.response.status === 432) {
      api.showAuthFail(error.response);
    } else if (error.response.status === 420) {
      if (body.fromPopup) {
        $('.action-buttons ul li').removeClass('active');
        $('.popup form').hide();
        $('#resend').slideToggle();
      } else {
        window.location.href = `/resendEmail?email=${body.email}`;
      }
    } else {
      // reject(error)
      let errorMsg = "something went wrong, please try again!";
      if (error && error.response.data) {
        errorMsg = error.response.data.msg;
      }
      swal({
        title: "Error!",
        text: errorMsg ? errorMsg : 'Something went wrong!',
        icon: "error"
      });
    }
  } else {
    swal({
      title: "Error!",
      text: "something went wrong, please try again!",
      icon: "error"
    });
  }
}

api.showAuthFail = (error) => {
  if (error.data) {
    let errMsg = error.data.msg;
    if (error.data.data && error.data.data.name) {
      errMsg += " " + error.data.data.name + "!";
    }
    swal({
      title: "Authorization failed!",
      text: errMsg ? errMsg : 'Something went wrong!',
      icon: "error"
    }).then((value) => {
      api.logout();
    });
  }
}

export default api;