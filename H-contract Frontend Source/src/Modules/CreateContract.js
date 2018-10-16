import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Header from '../components/Header.js';

class CreateContract extends Component {
    componentWillMount() {
        Header.getInstance().updateTitle('Select Contract Type');
    }
    render() {
        return (
            <div className="create-contract">
                <div className="App">
                    <div className="row">
                        <div className="col-md-12">
                            { /* <div className="card card-contributions">
                                <div className="card-header ">
                                    <h4 className="choose-blockchain">Choose Blockchain</h4>
                                </div>
                                <div className="card-body ">
                                    <button className="btn btn-info btn-img btn-round data-color">
                                        <img src="../../assets/img/ethereum.png" alt="" />
                                        Etherium
                                    </button>
                                    <button className="btn btn-info btn-img btn-round data-color disable">
                                        <img src="../../assets/img/eos.png" alt="" />
                                        Eos
                                    </button>
                                    <button className="btn btn-info btn-img btn-round data-color disable">
                                        <img src="../../assets/img/bitcoin.png" alt="" />
                                        Bitcoin
                                    </button>
                                    <button className="btn btn-info btn-img btn-round data-color disable">
                                        <img src="../../assets/img/neo.png" alt="" />
                                        Neo
                                    </button>
                                    
                                </div>
                                <div className="card-footer ">
                                    <p>Free of charge - for testing your contract before paying for it</p>
                                </div>
                            </div> */}
                            <div className="card card-click">
                               <div className="card-body ">
                                   <div className="row">
                                       <Link to="/TestContract"></Link>
                                       <div className="col-10">
                                           <h3 className="info-title">Test</h3>
                                           <p>Create a Token and distribute it yourself or by our Crowdfunding Contract</p>
                                       </div>
                                   </div>
                               </div>
                           </div>

                           <div className="card card-click">
                               <div className="card-body ">
                               <Link to="/DeferredPaymentContract"></Link>
                                   <div className="row">
                                       <div className="col-10">
                                           <h3 className="info-title">Deferred payment</h3>
                                           <p>Smart contract makes payment on a specified date.</p>
                                       </div>
                                       <div className="col-2">
                                           {/* <span className="btn  btn-simple statistics">
                                               2.49
                                              < img src="../../assets/img/ethereum.png" alt="" />
                                           </span> */ }
                                       </div>
                                   </div>
                               </div>
                           </div>
                            <div className="card card-click">
                                <div className="card-body ">
                                    <div className="row">
                                        <Link to="/CrowdSaleContract"></Link>
                                        <div className="col-12">
                                            <h3 className="info-title">Crowdsale Contract</h3>
                                            <p>Start your ICO/Token sale with a few clicks</p>
                                        </div>
                                        {/* <div className="col-2 col-xs-3">
                                            <span className="btn  btn-simple statistics">
                                                2.49
                                               < img src="../../assets/img/ethereum.png" alt="" />
                                            </span>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                            {/* <div className="card card-click">
                                <div className="card-body ">
                                    <div className="row">
                                        <div className="col-10">
                                            <h3 className="info-title">Token contract</h3>
                                            <p>Create a Token and distribute it yourself or by our Crowdsale Contract</p>
                                        </div>
                                        <div className="col-2">
                                            <span className="btn  btn-simple statistics">
                                                2.49
                                               < img src="../../assets/img/ethereum.png" alt="" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card card-click">
                                <div className="card-body ">
                                    <div className="row">
                                        <div className="col-10">
                                            <h3 className="info-title">Airdrop</h3>
                                            <p>Distribute any ERC-20/ERC-223 tokens among many addresses (for example, after Bounty program or Crowdsale)</p>
                                        </div>
                                        <div className="col-2">
                                            <span className="btn  btn-simple statistics">
                                                2.49
                                               < img src="../../assets/img/ethereum.png" alt="" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card card-click">
                                <div className="card-body ">
                                    <div className="row">
                                        <div className="col-10">
                                            <h3 className="info-title">Investment pool</h3>
                                            <p>The contract for ETH accumulation before the investment. Create it and share the address with others.</p>
                                        </div>
                                        <div className="col-2">
                                            <span className="btn  btn-simple statistics">
                                                2.49
                                               < img src="../../assets/img/ethereum.png" alt="" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card card-click">
                                <div className="card-body ">
                                    <div className="row">
                                        <div className="col-10">
                                            <h3 className="info-title">Lost key</h3>
                                            <p>The smart contract has all the same features as the standard Ethereum wallet and, in addition, redirecting your funds to the backup wallet, if you will lose the access/private key.</p>
                                        </div>
                                        <div className="col-2">
                                            <span className="btn  btn-simple statistics">
                                                2.49
                                               < img src="../../assets/img/ethereum.png" alt="" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card card-click">
                                <div className="card-body ">
                                    <div className="row">
                                        <div className="col-10">
                                            <h3 className="info-title">Deferred payment</h3>
                                            <p>Smart contract makes payment on a specified date.</p>
                                        </div>
                                        <div className="col-2">
                                            <span className="btn  btn-simple statistics">
                                                2.49
                                               < img src="../../assets/img/ethereum.png" alt="" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card card-click">
                                <div className="card-body ">
                                    <div className="row">
                                        <div className="col-10">
                                            <h3 className="info-title">Will contract</h3>
                                            <p>Setup the transfer of funds to family or friends, in case of long inactive period of time (death, accidents &amp; so on).</p>
                                        </div>
                                        <div className="col-2">
                                            <span className="btn  btn-simple statistics">
                                                2.49
                                               < img src="../../assets/img/ethereum.png" alt="" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card card-click">
                                <div className="card-body ">
                                    <div className="row">
                                        <div className="col-10">
                                            <h3 className="info-title">Wedding contract</h3>
                                            <p>Wallet with Multisig function &amp; distribution of funds between the owners after/during specified period of time.</p>
                                        </div>
                                        <div className="col-2">
                                            <span className="btn  btn-simple statistics">
                                                2.49
                                               < img src="../../assets/img/ethereum.png" alt="" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateContract;