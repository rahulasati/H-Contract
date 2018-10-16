import React, { Component } from 'react';
import api from '../utils/api.js';
import $ from 'jquery';
import { Link } from "react-router-dom";
import loader from '../loader.svg';
import Header from '../components/Header.js';
import Formats from '../utils/Formats'
import moment from 'moment';

class MyContract extends Component {
    constructor(props) {
        super(props);
        this.state = {
            details: '',
        }
    }

    componentWillMount() {
        Header.getInstance().updateTitle('My Contracts');
        if (localStorage.getItem('auth_token') != null) {
            setTimeout(() => {
                this.getBonusDetails();
            }, 1000);
        }
        $('body').addClass('right-only')
    }


    getBonusDetails = () => {
        api.get(`contract/getContracts`)
            .then((response) => {
                const details = response.data.data;
                this.setState({
                    details: details
                })
            })
    }
    render() {
        $(function () {
            $('.my-contract').on('click', function () {
                $(this).closest('.App').find('.contract-details').slideToggle();
                $('html, body').animate({
                    scrollTop: $(this).offset().top - 18
                }, 500);
            });

        });
        var status = {
            DEPLOYED: 'Deployed',
            FAILED_TO_DEPLOY: 'Failed to Deploy',
            WAITING_FOR_DEPLOYMENT: 'Waiting for deployment',
        }
        var statusclassName = {
            DEPLOYED: ' gool fa fa-check green',
            FAILED_TO_DEPLOY: 'gool fa fa-times red',
            WAITING_FOR_DEPLOYMENT: 'gool fa fa-spinner fa-spin yellow',
        }

        return (
            localStorage.getItem('auth_token') !== null ? (
                this.state.details ?
                    this.state.details.length > 0 ? this.state.details.map((list, i) => (<div key={i} className="main-list">
                        <div className="create-contract">
                            <div className="App">
                                <div className="row ">
                                    <div className="col-md-12">
                                        <div className="card card-contributions  ">
                                            <div className="flex my-contract">
                                                <img src="../../assets/img/hashgraph.jpg" alt="" />
                                                <div className="card-header ">
                                                    <h4 className="contract-name">{list.name ? list.name : 'Token Name'}</h4>
                                                </div>
                                                <div className="card-body text-right deployedd">
                                                    <div>
                                                        <i className={statusclassName[list.deployment_status]} ></i>{status[list.deployment_status]}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-footer contract-details ">
                                                <div className="mint">
                                                    <table><tbody>
                                                        < tr > < td className = "bold" > Contract Name </td><td>{list.name}</td > </tr>
                                                        < tr > < td className = "bold" > Contract Address </td><td>{list.contract_address}</td > </tr>

                                                        <tr><td className="bold">Token Owner</td><td>{list.contract_owner ? list.contract_owner  : '-'}<i className="fa fa-clone copy-to-clipboard" title="copy to clipboard" onClick={() => Formats.copyToClipboard(list.contract_owner ? list.contract_owner : '-')}></i></td></tr>
                                                        < tr > < td className = "bold" > Transaction Hash </td><td>{ list.transactionHash ? list.transactionHash  : '-'}</td > </tr>
                                                        {/* <tr className={list.deployment_status !== 'DEPLOYED' ? 'none' : ''}><td className="bold">Contract Address</td><td><a target="_blank" href={'https://rinkeby.etherscan.io/address/' + list.contract_address}>{list.contract_address ? list.contract_address.substring(0, 20) + "..." : '-'}</a> <i className="fa fa-clone copy-to-clipboard" title="copy to clipboard" onClick={() => Formats.copyToClipboard(list.contract_address ? list.contract_address : '-')}></i></td></tr> */}
                                                        <tr><td className="bold">Create Date</td><td>{Formats.DateFormat(list.create_date)}</td></tr>
                                                        {/* <tr><td className="bold">Opening Time</td><td>{moment(list.opening_time).format('DD MMM, YYYY')}</td></tr> */}
                                                        {/* <tr><td className="bold">End Time</td><td>{moment(list.end_time).format('DD MMM, YYYY')} </td></tr> */}
                                                        {/* <tr><td className="bold">Hardcap Tokens</td><td>{list.hardcap_tokens}</td></tr> */}
                                                        {/* <tr><td className="bold">Investment Storage</td><td>{list.investment_storage.substring(0, 20) + " ..."}<i className="fa fa-clone copy-to-clipboard" title="copy to clipboard" onClick={() => Formats.copyToClipboard(list.investment_storage ? list.investment_storage : '-')}></i></td></tr>
                                                        <tr><td className="bold">Min Investment</td><td>{list.min_investment}</td></tr>
                                                        <tr><td className="bold">Max Investment</td><td>{list.max_investment}</td></tr>
                                                        <tr><td className="bold">Rate</td><td>{list.rate}</td></tr> */}
                                                        {/* <tr><td className="bold">Token Symbol</td><td>{list.token_symbol}</td></tr>
                                                        <tr className={list.bonus_percent <= 0 ? 'none' : ''}><td className="bold">Bonus Percent</td><td>{list.bonus_percent}%</td></tr>
                                                        <tr className={list.team_address === '' ? 'none' : ''}><td className="bold">Address</td><td>{list.team_address ? list.team_address.substring(0, 20) + " ..." : '0x0'}<i className="fa fa-clone copy-to-clipboard" title="copy to clipboard" onClick={() => Formats.copyToClipboard(list.team_address ? list.team_address : '-')}></i></td></tr>
                                                        <tr className={list.team_address === '' ? 'none' : ''}><td className="bold">Token Amount</td><td>{list.team_tokens ? list.team_tokens : 0}</td></tr>
                                                        <tr><td className="bold">Tranferrable</td><td>{list.tranferrable ? '✔' : '✘'}</td></tr>
                                                        <tr><td className="bold">Whitelisting</td><td>{list.whitelisting ? '✔' : '✘'}</td></tr>
                                                        <tr><td className="bold">Change Date</td><td>{list.changedate ? '✔' : '✘'}</td></tr> */}
                                                    </tbody></table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>)) : <div className="col-md-9 card card-center"><p>The list of smart contracts is empty</p><Link to="/createContract" className="btn btn-info btn-round data-color"><i className="fa fa-plus"></i> Create Contract</Link></div> : <div className="loader"><img src={loader} className="App-loader" alt="logo" /><label>Please Wait...</label></div>) : <div className="col-md-9 card card-center"><p>The list of smart contracts is empty</p><Link to="/createContract" className="btn btn-info btn-round data-color"><i className="fa fa-plus"></i> Create Contract</Link></div>
        );
    }
}

export default MyContract;