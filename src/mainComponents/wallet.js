import React, { useState } from 'react';
import Wallet from '../components/components/wallet';
import Footer from '../components/components/footer';
import { walletAddress } from '../Blockchain/config';

const Wallett= () => {
  const [address,setAddress] = useState(walletAddress)
  return (
<div>
  <section className='jumbotron breadcumb no-bg' >
    <div className='mainbreadcumb'>
      <div className='container'>
        <div className='row m-10-hor'>
          <div className='col-12'>
            <h1 className='text-center'>Wallet</h1>
             {
               address?(<h4 className='text-center my-3'>Connected : {address}</h4>):(<></>)
             }
          </div>
        </div>
      </div>
    </div>
  </section>

  <section className='container'>
    <Wallet  addressChange={(_addresss)=>{
      setAddress(_addresss)
    }}/>
  </section>

  <Footer />
</div>

);}
export default Wallett;