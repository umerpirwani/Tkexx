import React from 'react';
import {connect} from '../../Blockchain/functions'

const Wallet= ({addressChange}) => (
  <div className="row">
    <div className="col-lg-3 mb30" style={{"alignItems":'center'}}>
        <span className="box-url" onClick={()=>{
            connect((address)=>{
                 addressChange(address)
            })
        }}>
            <span className="box-url-label">Most Popular</span>
            <img src="./img/wallet/1.png" alt="" className="mb20"/>
            <h4>Metamask</h4>
            <p>Start exploring blockchain applications in seconds.  Trusted by over 1 million users worldwide.</p>
        </span>
    </div>
                                
</div>
);
export default Wallet;