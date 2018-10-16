
import React, { Component } from 'react';
import $ from 'jquery';
import api from '../utils/api.js';
import SweetAlert from 'react-bootstrap-sweetalert';
import Loader from '../components/Loader.js';
import Header from '../components/Header.js';
import { withRouter } from 'react-router';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

class DeferredPaymentContract extends Component {

  componentWillMount() {
    Header.getInstance().updateTitle('Create Deferred Payment Contract');
  }

  componentDidMount() {

  }

  constructor(props) {
    super(props);
    this.state = {
      alert: null,
      terms: 'not-accepted',
      error: '',
      whitelist: 0,
      changedate: 0,
      tranferrable: 0,
      minMax: 0,
      bonus_percentage: 0,
      add_bonus_amount: 0,
      startDate: moment().format('DD/MM/YYYY'),
      endDate: moment().add(1, "days").format('DD/MM/YYYY'),
      startDateSelected: moment(),
      endDateSelected: moment().add(1, "days"),
      endDateMinValue: moment().add(1, "days")
    }
    this.handleEndDate = this.handleEndDate.bind(this);
    this.handleStartDate = this.handleStartDate.bind(this);
    this.hideAlertSuccess = this.hideAlertSuccess.bind(this);
  }

  minMax(e) {
    if (e.target.checked) {
      $('#min-max .card-body').slideToggle();
      this.setState({ bonus_percentage: 1 })
    } else {
      $('#min-max .card-body').slideToggle();
      this.setState({ bonus_percentage: 1 })
    }
  }

  AddBonus(e) {
    if (e.target.checked) {
      $('#add-bonus .card-body').slideToggle();
      this.setState({ minMax: 1 })
    } else {
      this.refs.max_investment.classList.add("disabled");
      $('#add-bonus .card-body').slideToggle();
      this.setState({ minMax: 0 })
    }
  }

  AddBonusAmount(e) {
    if (e.target.checked) {
      $('#mint-clone .card-body').slideToggle();
      this.setState({ add_bonus_amount: 1 })
    } else {
      this.refs.max_investment.classList.add("disabled");
      $('#mint-clone .card-body').slideToggle();
      this.setState({ add_bonus_amount: 0 })
    }
  }

  whitelist(e) {
    let options = this.state.whitelist

    if (e.target.checked) {
      options = 1
    } else {
      options = 0
    }
    this.setState({ whitelist: options })
  }
  tranferrable(e) {
    let options = this.state.tranferrable

    if (e.target.checked) {
      options = 1
    } else {
      options = 0
    }
    this.setState({ tranferrable: options })
  }
  changedate(e) {
    let options = this.state.changedate

    if (e.target.checked) {
      options = 1
    } else {
      options = 0
    }
    this.setState({ changedate: options })
  }
  decimalValidation(e) {
    if ((e.target.value > 50) || (e.target.value < 0)) {
      e.target.style.borderColor = "red";
      $('<div class="copy-notification warning">Decimal Should be Minimum in between 0 to  50</div>').prependTo('body').delay(1000).fadeOut(200, function () {
        $('.copy-notification').remove();
      })
    }
    else {
      $('input').css('border-color', '#e3e3e3');
    }
  }

  handleStartDate(date) {
    let originalDate = date.clone();
    this.setState({ startDate: originalDate ? originalDate.format('DD/MM/YYYY') : this.state.startDate });
    this.setState({ startDateSelected: originalDate });
    if (!this.state.endDateMinValue.isAfter(date)) {
      let endDateMinValue = date.add(1, "days");
      if(!this.state.endDateSelected.isAfter(endDateMinValue)) {
        this.setState({
          endDate: endDateMinValue.format('DD/MM/YYYY'),
          endDateMinValue: endDateMinValue,
          endDateSelected: endDateMinValue
        });
      } else {
        this.setState({
          endDateMinValue: endDateMinValue,
        });
      }
    } else {
      let endDateMinValue = date.add(1, "days");
      this.setState({
        endDateMinValue: endDateMinValue
      });
    }
  }

  handleEndDate(date) {
    this.setState({
      endDate: date ? date.format('DD/MM/YYYY') : this.state.endDate,
      endDateSelected: date
    });
  }

  docreatecontract(event) {
    let regexEtherium = /^0x[a-fA-F0-9]{40}$/;
    if (this.refs.name.value === '') {
      $('input').css('border-color', '#e3e3e3');
      this.refs.name.style.borderColor = "red";
      this.refs.name.scrollIntoView(true);
      $('<div class="copy-notification warning">Contract Name is required field*</div>').prependTo('body').delay(1000).fadeOut(200, function () {
        $('.copy-notification').remove();
      })
    } else if (this.refs.token_name.value === '') {
      $('input').css('border-color', '#e3e3e3');
      this.refs.token_name.scrollIntoView(true);
      window.scrollBy(0, -40);
      this.refs.token_name.style.borderColor = "red";
      $('<div class="copy-notification warning">Token Name is required field*</div>').prependTo('body').delay(1000).fadeOut(200, function () {
        $('.copy-notification').remove();
      })
    } else if (this.refs.token_symbol.value === '') {
      $('input').css('border-color', '#e3e3e3');
      this.refs.token_symbol.style.borderColor = "red";
      this.refs.token_symbol.scrollIntoView(true); window.scrollBy(0, -40);;
      $('<div class="copy-notification warning">Token Symbol is required field*</div>').prependTo('body').delay(1000).fadeOut(200, function () {
        $('.copy-notification').remove();
      })
    } else if (this.refs.token_decimal.value === '') {
      $('input').css('border-color', '#e3e3e3');
      this.refs.token_decimal.style.borderColor = "red";
      this.refs.token_decimal.scrollIntoView(true); window.scrollBy(0, -40);;
      $('<div class="copy-notification warning">Token Decimal is required field*</div>').prependTo('body').delay(1000).fadeOut(200, function () {
        $('.copy-notification').remove();
      })
    } else if (this.refs.token_decimal.value > 50) {
      $('input').css('border-color', '#e3e3e3');

      this.refs.token_decimal.scrollIntoView(true); window.scrollBy(0, -40);;
      $('<div class="copy-notification warning">Decimal Should be Minimum in between 0 to  50</div>').prependTo('body').delay(1000).fadeOut(200, function () {
        $('.copy-notification').remove();
      })
    } else if (this.refs.contract_owner.value === '') {
      $('input').css('border-color', '#e3e3e3');
      this.refs.contract_owner.style.borderColor = "red";
      this.refs.contract_owner.scrollIntoView(true); window.scrollBy(0, -40);;
      $('<div class="copy-notification warning">Token owner is required field*</div>').prependTo('body').delay(1000).fadeOut(200, function () {
        $('.copy-notification').remove();
      })
    } else if (!this.refs.contract_owner.value.match(regexEtherium)) {
      $('input').css('border-color', '#e3e3e3');
      this.refs.contract_owner.style.borderColor = "red";
      this.refs.contract_owner.scrollIntoView(true); window.scrollBy(0, -40);;
      $('<div class="copy-notification warning">Token Owner Address is Not Valid </div>').prependTo('body').delay(1000).fadeOut(200, function () {
        $('.copy-notification').remove();
      })
    } else if (this.refs.investment_storage.value === '') {
      $('input').css('border-color', '#e3e3e3');
      this.refs.investment_storage.style.borderColor = "red";
      this.refs.investment_storage.scrollIntoView(true); window.scrollBy(0, -40);;
      $('<div class="copy-notification warning" >Receiver is required field</div>').prependTo('body').delay(1000).fadeOut(200, function () {
        $('.copy-notification').remove();
      })
    } else if (!this.refs.investment_storage.value.match(regexEtherium)) {
      $('input').css('border-color', '#e3e3e3');
      this.refs.investment_storage.style.borderColor = "red";
      this.refs.investment_storage.scrollIntoView(true); window.scrollBy(0, -40);;
      $('<div class="copy-notification warning">Receiver address is Not</div>').prependTo('body').delay(1000).fadeOut(200, function () {
        $('.copy-notification').remove();
      })
    } else if (this.refs.rate.value === '') {
      $('input').css('border-color', '#e3e3e3');
      this.refs.rate.style.borderColor = "red";
      this.refs.rate.scrollIntoView(true); window.scrollBy(0, -40);;
      $('<div class="copy-notification warning">Rate is required field*</div>').prependTo('body').delay(1000).fadeOut(200, function () {
        $('.copy-notification').remove();
      })
    } else if (this.refs.hard_cap.value === '') {
      $('input').css('border-color', '#e3e3e3');
      this.refs.hard_cap.style.borderColor = "red";
      this.refs.hard_cap.scrollIntoView(true); window.scrollBy(0, -40);;
      $('<div class="copy-notification warning">Hard Cap is required</div>').prependTo('body').delay(1000).fadeOut(200, function () {
        $('.copy-notification').remove();
      })
    } else if (this.refs.opening_time.value === '') {
      $('input').css('border-color', '#e3e3e3');
      this.refs.opening_time.style.borderColor = "red";
      this.refs.opening_time.scrollIntoView(true); window.scrollBy(0, -40);;
      $('<div class="copy-notification warning">Opening time is required fied</div>').prependTo('body').delay(1000).fadeOut(200, function () {
        $('.copy-notification').remove();
      })
    } else if (this.refs.end_time.value === '') {
      $('input').css('border-color', '#e3e3e3');
      this.refs.end_time.style.borderColor = "red";
      this.refs.end_time.scrollIntoView(true); window.scrollBy(0, -40);;
      $('<div class="copy-notification warning">Finish Time is required field</div>').prependTo('body').delay(1000).fadeOut(200, function () {
        $('.copy-notification').remove();
      })
    } else if ((this.refs.bonus.value === '') && (this.refs.addBonus.checked)) {
      $('input').css('border-color', '#e3e3e3');
      this.refs.bonus.style.borderColor = "red";
      this.refs.bonus.scrollIntoView(true); window.scrollBy(0, -40);;
      $('<div class="copy-notification warning">Bonus Percentage is required field</div>').prependTo('body').delay(1000).fadeOut(200, function () {
        $('.copy-notification').remove();
      })
    } else if ((this.refs.min_investment.value === '') && (this.refs.minMaxx.checked)) {
      $('input').css('border-color', '#e3e3e3');
      this.refs.min_investment.style.borderColor = "red";
      this.refs.min_investment.scrollIntoView(true); window.scrollBy(0, -40);;
      $('<div class="copy-notification warning">Min Investment is required field</div>').prependTo('body').delay(1000).fadeOut(200, function () {
        $('.copy-notification').remove();
      })
    } else if ((this.refs.min_investment.value < 0) && (this.refs.minMaxx.checked)) {
      $('input').css('border-color', '#e3e3e3');
      this.refs.min_investment.style.borderColor = "red";
      this.refs.min_investment.scrollIntoView(true); window.scrollBy(0, -40);;
      $('<div class="copy-notification warning">Min Investment should be greater than Zero</div>').prependTo('body').delay(1000).fadeOut(200, function () {
        $('.copy-notification').remove();
      })
    } else if ((this.refs.max_investment.value === '') && (this.refs.minMaxx.checked)) {
      $('input').css('border-color', '#e3e3e3');
      this.refs.max_investment.style.borderColor = "red";
      this.refs.max_investment.scrollIntoView(true); window.scrollBy(0, -40);;
      $('<div class="copy-notification warning">Max Investment is required field</div>').prependTo('body').delay(1000).fadeOut(200, function () {
        $('.copy-notification').remove();
      })
    } else if ((this.refs.max_investment.value > this.refs.hard_cap.value) && (this.refs.minMaxx.checked)) {
      $('input').css('border-color', '#e3e3e3');
      this.refs.max_investment.style.borderColor = "red";
      this.refs.max_investment.scrollIntoView(true); window.scrollBy(0, -40);;
      $('<div class="copy-notification warning">Max Investment should be less than or equal to Hardcap</div>').prependTo('body').delay(1000).fadeOut(200, function () {
        $('.copy-notification').remove();
      })
    } else if ((this.refs.team_address.value === '') && (this.refs.addBonusAmount.checked)) {
      $('input').css('border-color', '#e3e3e3');
      this.refs.team_address.style.borderColor = "red";
      this.refs.team_address.scrollIntoView(true); window.scrollBy(0, -40);;
      $('<div class="copy-notification warning">Team Address is required field</div>').prependTo('body').delay(1000).fadeOut(200, function () {
        $('.copy-notification').remove();
      })
    } else if ((!this.refs.team_address.value.match(regexEtherium)) && (this.refs.addBonusAmount.checked)) {
      $('input').css('border-color', '#e3e3e3');
      this.refs.team_address.style.borderColor = "red";
      this.refs.team_address.scrollIntoView(true); window.scrollBy(0, -40);;
      $('<div class="copy-notification warning">Team Address is Not Valid</div>').prependTo('body').delay(1000).fadeOut(200, function () {
        $('.copy-notification').remove();
      })
    } else if ((this.refs.team_tokens.value === '') && (this.refs.addBonusAmount.checked)) {
      $('input').css('border-color', '#e3e3e3');
      this.refs.team_tokens.style.borderColor = "red";
      this.refs.team_tokens.scrollIntoView(true); window.scrollBy(0, -40);;
      $('<div class="copy-notification warning">Token Amount is required field</div>').prependTo('body').delay(1000).fadeOut(200, function () {
        $('.copy-notification').remove();
      })
    } else if ((this.refs.team_tokens.value < 0) && (this.refs.addBonusAmount.checked)) {
      $('input').css('border-color', '#e3e3e3');
      this.refs.team_tokens.style.borderColor = "red";
      this.refs.team_tokens.scrollIntoView(true); window.scrollBy(0, -40);;
      $('<div class="copy-notification warning">Tokens should be greater than or equal to 0</div>').prependTo('body').delay(1000).fadeOut(200, function () {
        $('.copy-notification').remove();
      })
    } else if ((this.refs.team_tokens.value > this.refs.hard_cap.value) && (this.refs.addBonusAmount.checked)) {
      $('input').css('border-color', '#e3e3e3');
      this.refs.team_tokens.style.borderColor = "red";
      this.refs.team_tokens.scrollIntoView(true); window.scrollBy(0, -40);;
      $('<div class="copy-notification warning">Tokens should be less than or equal to Hardcap</div>').prependTo('body').delay(1000).fadeOut(200, function () {
        $('.copy-notification').remove();
      })
    } else if (localStorage.getItem('auth_token') == null) {
      $('.popup').addClass('active');
      $('input').css('border-color', '#e3e3e3');
    } else {
      $('input').css('border-color', '#e3e3e3');
      this.createcontract();
    }
  }

  createcontract(event) {
    const getSuccessAlert = (msg) => (
      <SweetAlert success title="Congratulations!" onConfirm={this.hideAlertSuccess}>
        {msg}
      </SweetAlert>
    );
    const name = this.refs.name.value;
    const opening_time = moment(this.refs.opening_time.input.value, 'DD/MM/YYYY').valueOf();
    const end_time = moment(this.refs.end_time.input.value, 'DD/MM/YYYY').valueOf();
    const token_name = this.refs.token_name.value;
    const token_symbol = this.refs.token_symbol.value;
    const token_decimal = this.refs.token_decimal.value;
    const hard_cap = this.refs.hard_cap.value;
    const rate = this.refs.rate.value;
    const investment_storage = this.refs.investment_storage.value;
    const min_investment = this.state.minMax === 0 ? -1 : this.refs.min_investment.value;
    const max_investment = this.state.minMax === 0 ? -1 : this.refs.max_investment.value;
    const bonus_percent = this.state.add_bonus_amount === 0 ? -1 : this.refs.bonus.value;
    const team_address = this.state.add_bonus_amount === 0 ? '' : this.refs.team_address.value;
    const team_tokens = this.state.bonus_percentage === 0 ? -1 : this.refs.team_tokens.value;
    const contract_owner = this.refs.contract_owner.value;
    var changedate = this.state.changedate;
    var tranferrable = this.state.tranferrable;
    var whitelisting = this.state.whitelist;

    var postData = {
      name: name,
      opening_time: opening_time,
      end_time: end_time,
      token_name: token_name,
      token_symbol: token_symbol.toUpperCase(),
      token_decimal: token_decimal,
      hard_cap: hard_cap,
      rate: rate,
      investment_storage: investment_storage,
      min_investment: min_investment,
      max_investment: max_investment,
      bonus_percent: bonus_percent,
      team_address: team_address,
      team_tokens: team_tokens,
      contract_owner: contract_owner,
      changedate: changedate,
      tranferrable: tranferrable,
      whitelisting: whitelisting
    };


    api.post('contract/create', postData)
      .then((res) => {
        this.setState({
          alert: getSuccessAlert(res.data.msg)
        });

      })
  }

  hideAlertSuccess() {
    this.setState({
      alert: null
    });
    this.props.history.push('/myContract');
    Header.getInstance().refresh();
  }


  render() {
$('body').addClass('paddind-top');
    return (
      <div className="row crowd">
        <Loader />

        <div className="col-md-12 ">
          <div className="card">

            <div className="card-body">
              <label>Enter The Contract Name</label>
              <div className="form-group row">
              <div className="col-md-8">  <input type="text" ref="name" defaultValue="MyNewTokenContract" className="form-control" /> </div>
              <div className="col-md-4">
                  <h6>Enter name of the contract without spaces, usually 5-25 charachters.</h6>
                </div>
              </div>
              {this.state.alert}
              

              
              <label>Token Owner</label>
              <div className="form-group row">
                <div className="col-md-8">
                  <input type="text" placeholder="0x1234567890adfbced543567acbedf34565437e8f" ref="contract_owner" className="form-control" /></div>
                <div className="col-md-4">
                  <h6>ETH address (not exchange address). This address will be owner of the token.</h6>
                </div>
              </div>

              <label>Receiver Address</label>

              <div className="form-group row">
                <div className="col-md-8">
                  <input type="text" ref="investment_storage" placeholder="0x1234567890adfbced543567acbedf34565437e8f" className="form-control" /></div>
                <div className="col-md-4">
                  <h6>ETH address (not exchange address). All payments will be sent to that address on transfer date</h6>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-12">
          <div className="card">
            <div className="card-header ">
            </div>

            <div className="card-body">
             


              {/* <div className="form-group col-md-12 row">
                <span className="red"><i className="fa fa-info-circle"></i>Please note!</span>
                <h6>
                  If softcap > 0 all investments are stored on the vault contract until the end of crowdsale.
                  If you need to get investments on your address right away set softcap = 0.</h6>
              </div> */}

              {/* <label>Soft cap tokens:</label>

              <div className="form-group row">
                <div className="col-md-8">  <input type="text" className="form-control" /></div>
                <div className="col-md-4">
                  <h6>Defines the minimum number of tokens that needs to be sold for the project continuation. If soft cap is not reached - contributors get their vestments back, project gets nothing. You can set it to 0 (no soft cap) <a tabindex="-1" href="https://etherscan.com/tokens" target="_blank">https://etherscan.com/tokens</a></h6>
                </div>
              </div> */}

              <div className="form-group row">

                <div className="col-md-4">
                  <label>Transfer Date</label>
                  <DatePicker className="form-control datepicker" ref="opening_time"
                    onChange={this.handleStartDate}
                    dateFormat="DD/MM/YYYY"
                    selected={this.state.startDateSelected}
                    value={this.state.startDate}
                    minDate={moment()}
                  />
                </div>

                <div className="col-md-4">
                  <label><br /></label>
                  <h6>Start/Finish date for sale. No contributions will be accepted before or after that time</h6>
                </div>
              </div>

            </div>
          </div>
        </div>





        <div className="text-center col-md-10">
          <button className="btn data-color btn-round btn-lrg" id="submit" onClick={this.docreatecontract.bind(this)}>
            <span className="btn-label">
              <i className="fa fa-plus-circle"></i>
            </span>
            Create
                </button>
          {/* <button className="btn btn-danger">
            <span className="btn-label">
              <i className="fa fa-times"></i>
            </span>
            clean
                </button> */}
        </div>
      </div>
    );
  }
}

export default withRouter(DeferredPaymentContract);