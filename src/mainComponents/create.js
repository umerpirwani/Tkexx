import React, { Component } from "react";
import Clock from "../components/components/Clock";
import Footer from '../components/components/footer';
import { Spinner, Alert,Button} from "react-bootstrap";
import{MdOutlineClose} from 'react-icons/md';
import { create as ipfsHttpClient } from 'ipfs-http-client'
import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
import {
  nftContractAddress,
  marketplaceContractAdress,
  nftContractABI,
  marketplaceABI,
  walletAddress,
  connectedChainId
} from '../Blockchain/config'
const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

export default class Createpage extends Component {

  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.state = {
      file: '',
      show: false,
      buttonDisable: false,
      alert: false,
      alertMsg:'',
      preImg: '',
      formInput: {
        name: 'Pinky Ocean',
        description: 'desHere',
        price: 0.08
      }
    };
    this.state.preImg = "./img/collections/coll-item-3.jpg";

  }

  async onChange(e) {
    var file = e.target.files[0];
    if (!file) {
      return
    }
    let previewUrl = URL.createObjectURL(file)
    this.setState({
      preImg: previewUrl
    })
    console.log(this.state.imgSrc)
    try {
      const added = await client.add(
        file,
        {
          progress: (prog) => console.log(`received: ${prog}`)
        }
      )
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      console.log(url)
      this.setState({ file: url })

    } catch (error) {
      console.log('Error uploading file: ', error)
      this.setState({ buttonDisable: false });
    }
  }
  async createItem() {

    let { name, description, price } = this.state.formInput
    if (!name || !description || !price) {
      // alert("Fill all fields");
      this.setState({ buttonDisable: false,alertMsg:"Fill all fields" });
      this.setState({alert:true});
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
      return
    }
    if (!parseFloat(price)) {
      // alert("Invalid price")
      this.setState({ buttonDisable: false,alertMsg:"invalid price" });
      this.setState({alert:true});
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
      return
    }
    if (!this.state.file) {
      // alert("No Image Uploaded")
      this.setState({ buttonDisable: false,alertMsg:"no image uploaded !" });
      this.setState({alert:true});
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
      return
    }
    this.setState({ show: true, buttonDisable: true });
    const data = JSON.stringify({
      name, description, image: this.state.file
    })
    try {
      const added = await client.add(data)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      console.log("jsonUrl : " + url)
      /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
      this.createSale(url)



    } catch (error) {
      // alert("Error uploading file");
      this.setState({ buttonDisable: false,alertMsg:"Error uploading file"});
      this.setState({alert:true});
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
      console.log('Error uploading file: ', error)
    }
  }
  async createSale(url) {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)

    const { chainId } = await provider.getNetwork()
    if (chainId != 1) {
      alert("You are not connected to the required network");
      this.setState({alertMsg:"You are connected to wrong network! Please switch your connection to Main network"});
      this.setState({ buttonDisable: false });
      this.setState({alert:true});
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
      return
    }
    const signer = provider.getSigner()

    /* next, create the item */
    let contract = new ethers.Contract(nftContractAddress, nftContractABI, signer)
    let overrides = {

      // The maximum units of gas for the transaction to use
      gasLimit: 300000,

      // The price (in wei) per unit of gas
      //  gasPrice: utils.parseUnits('9.0', 'gwei'),

      // The nonce to use in the transaction
      //nonce: 123,

      // The amount to send with the transaction (i.e. msg.value)
      //value: utils.parseEther('1.0'),

      // The chain ID (or network ID) to use
      //chainId: 4

    };
    try {
      let transaction = await contract.createToken(url, overrides)
      let tx = await transaction.wait()
      let event = tx.events[0]
      let value = event.args[2]
      let tokenId = value.toNumber()

      const price = ethers.utils.parseUnits(this.state.formInput.price, 'ether')

      /* then list the item for sale on the marketplace */
      contract = new ethers.Contract(marketplaceContractAdress, marketplaceABI, signer)
      let listingPrice = await contract.getListingPrice()
      listingPrice = listingPrice.toString()

      transaction = await contract.createMarketItem(nftContractAddress, tokenId, price, { value: listingPrice })
      await transaction.wait()
      // alert("Wow! NFT created")
      this.setState({alertMsg:"Wow! NFT created"});
      this.setState({alert:true});
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    } catch (e) {
      // alert("error occurred");
      this.setState({ show: false, buttonDisable: false,alertMsg:"error occurred"});
      this.setState({alert:true});
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
    // this.setState({buttonDisable:false});

  }




  render() {



    return (
      <div>


        <section className='jumbotron breadcumb no-bg'>

          <div className='mainbreadcumb'>
            <div className='container'>
              {
                this.state.alert && <Alert variant="dark" style={{'opacity':0.2}} onClose={() => this.setState({ alert: false })}>
                  <MdOutlineClose style={{"float":'right'}} onClick={() => this.setState({ alert: false })} />
                  <Alert.Heading style={{'color':'black'}}>{this.state.alertMsg}</Alert.Heading>
                </Alert>
              }
              <div className='row m-10-hor'>
                <div className='col-12'>
                  <h1 className='text-center'>Create</h1>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className='container'>

          <div className="row">
            <div className="col-lg-7 offset-lg-1 mb-5">
              <form id="form-create-item" className="form-border" action="#">
                <div className="field-set">
                  <h5>Upload file</h5>

                  <div className="d-create-file">
                    <p id="file_name">PNG, JPG, GIF, WEBP . Max 200mb.</p>

                    <div className='browse'>
                      <input type="button" id="get_file" className="btn-main" value="Browse" />
                      <input id='upload_file' type="file" multiple onChange={this.onChange} />
                    </div>

                  </div>

                  <div className="spacer-single"></div>

                  <h5>Title</h5>
                  <input type="text" name="item_title" id="item_title" className="form-control" placeholder="e.g. 'Crypto Funk" onChange={e => this.setState({ formInput: { ...this.state.formInput, name: e.target.value } })} />

                  <div className="spacer-10"></div>

                  <h5>Description</h5>
                  <textarea data-autoresize name="item_desc" id="item_desc" className="form-control" placeholder="e.g. 'This is very limited item'" onChange={e => this.setState({ formInput: { ...this.state.formInput, description: e.target.value } })}></textarea>

                  <div className="spacer-10"></div>

                  <h5>Price</h5>
                  <input type="text" name="item_price" id="item_price" className="form-control" placeholder="enter price for one item (ETH)" onChange={e => this.setState({ formInput: { ...this.state.formInput, price: e.target.value } })} />

                  {/* <div className="spacer-10"></div> */}

                  {this.state.show &&
                    <div className="container">
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                      Creating...
                      <br />
                      Accept the transaction in your MetaMask to complete transaction
                    </div>
                  }
                  <br />
                  <input onClick={() => {

                    this.createItem();
                    console.log("clicked");
                    // this.setState({buttonDisable:true});

                  }} type="button" id="submit" disabled={this.state.buttonDisable} className="btn-main" value="Create Item" />





                </div>
              </form>
            </div>

            <div className="col-lg-3 col-sm-6 col-xs-12">
              <h5>Preview item </h5>
              <div className="nft__item m-0">
                <div className="nft__item_wrap">
                  <span>
                    <img src={this.state.preImg} id="get_file_2" className="lazy nft__item_preview" alt="" />
                  </span>
                </div>
                <div className="nft__item_info">
                  <span >
                    <h4> {this.state.formInput.name}</h4>
                  </span>
                  <div className="nft__item_price">
                    {this.state.formInput.price} ETH
                  </div>


                </div>
              </div>
            </div>
          </div>

          <>



          </>

        </section>

        <Footer />
      </div>
    );
  }
}