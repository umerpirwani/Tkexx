import React, { useState } from "react";
import Footer from '../components/components/footer';
import { createGlobalStyle } from 'styled-components';
import ProgressButton from 'react-progress-button'
import Web3Modal, { getChainId } from "web3modal"
import { ethers } from 'ethers'
import { useLocation } from "@reach/router";
import { Spinner,Alert} from "react-bootstrap";
import{MdOutlineClose} from 'react-icons/md';
import {
  nftContractAddress,
  marketplaceContractAdress,
  nftContractABI,
  marketplaceABI,
  walletAddress,
  connectedChainId
} from '../Blockchain/config'
const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: #212428;
  }
`;


const Colection = function (props) {

  // const location = useLocation()
  const data = props.location.state.from;
  const isBuy = props.location.state.isBuy
  console.log(data);
  const [alert,setAlert] = React.useState(false);
  const [alertMsg,setAlertMsg] = React.useState(" ");
  const [openMenu, setOpenMenu] = React.useState(true);
  const [sell_price, setSellprice] = React.useState(0);
  const [spinBuy, setSpinBuy] = React.useState(false)
  const [disableBuySell, setDisableBuySell] = React.useState(false)
  const [openMenu1, setOpenMenu1] = React.useState(false);
  const handleBtnClick = () => {
    setOpenMenu(!openMenu);
    setOpenMenu1(false);
    document.getElementById("Mainbtn").classList.add("active");
    document.getElementById("Mainbtn1").classList.remove("active");
  };
  const handleBtnClick1 = () => {
    setOpenMenu1(!openMenu1);
    setOpenMenu(false);
    document.getElementById("Mainbtn1").classList.add("active");
    document.getElementById("Mainbtn").classList.remove("active");
  };

  const handleClick3 = () => {
    return new Promise(function (resolve, reject) {
      setTimeout(resolve, 3000)
    })
  };
  async function buyNft(nft) {
    setSpinBuy(true);
    setDisableBuySell(true);
    try{
      const web3Modal = new Web3Modal()
      const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(marketplaceContractAdress, marketplaceABI, signer)

    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')
    const transaction = await contract.createMarketSale(nftContractAddress, nft.itemId, {
      value: price
    })
    await transaction.wait()
    setSpinBuy(false);
    setDisableBuySell(true);
    setAlertMsg("Wow! You own this Nft now")
    setAlert(true)
    }
    catch(e){
      setSpinBuy(false);
      setDisableBuySell(false);
      console.log("buy failed");
      setAlertMsg("buy failed");
      setAlert(true);
      window.scrollTo({
      top: 0,
      behavior: "smooth"
      });
    }
    
  }
  async function sellNft(nft) {
    setSpinBuy(true);
    setDisableBuySell(true);

    try{

    }
    catch(e){
      setSpinBuy(false);
      setDisableBuySell(false);
      setAlertMsg("sell failed");
      setAlert(true);
      window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    }


  }
  return (
    <div>
      <GlobalStyles />

      <section className='container'>
        <div className='row mt-md-5 pt-md-4'>

              {
                alert && <Alert variant="dark" onClose={() => setAlert(false)}>
                  <MdOutlineClose style={{"float":'right'}} onClick={() => setAlert(false)} />
                  <Alert.Heading>{alertMsg}</Alert.Heading>
                </Alert>
              }

          <div className="col-md-6 text-center">
            <img src={data.image} style={{ "maxBlockSize": 350 }} className="img-fluid img-rounded mb-sm-30" alt="" />
          </div>
          <div className="col-md-6">
            <div className="item_info">

              <h2>{data.title}</h2>
              <div className="item_info_counts">
                <div className="item_info_type"><i className="fa fa-image"></i>Artist</div>

              </div>
              <p>{data.description}</p>
              {/* <h5>Price</h5> */}
             {!isBuy && <input type="number" name="item_price" id="item_price" className="form-control" placeholder="enter price to Buy (ETH)" onChange={(e) => {
                setSellprice(e.target.value);
                // console.log(sell_price);
              }
              } />}

              {spinBuy &&
                <div className="container">
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  Processing...
                  <br />
                  {/* Accept the transaction in your MetaMask to complete transaction */}
                </div>
              }

              {isBuy &&

                <input type="button" value="Buy Now" disabled={disableBuySell} className="btn-main" onClick={() => { buyNft(data) }} />}
              {!isBuy&& <input type="button" value="Sell Now" disabled={disableBuySell} className="btn-main" onClick={() => { sellNft(data) }} />}



              <div className="spacer-40"></div>

              <div className="de_tab">



              </div>

            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
export default Colection;