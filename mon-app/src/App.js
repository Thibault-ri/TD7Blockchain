import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Web3 from 'web3';
import React, { Component } from 'react';
import erc721_abi from './abis/ERC721.json'
import Navbar from './Navbar'
import Main from './Main'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = { 
      network :'',
      account: '' ,
      chain_id :0,
      last_block:0,
      counter_token:'',
      name_token:''

    }
  }
 

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
    Web3.givenProvider.enable()
    const network = await web3.eth.net.getNetworkType()
    this.setState({ network: network })
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const chainId = await web3.eth.getChainId()
    this.setState({ chain_id: chainId })
    const blockNum = await web3.eth.getBlockNumber()
    this.setState({ last_block: blockNum })    
    var myContract = new web3.eth.Contract(erc721_abi.abi, addresse.ERC721);
    const nametoken = await myContract.methods.name().call()
    const countertoken = await myContract.methods.counter().call()
    this.setState({ name_token: nametoken })   
    this.setState({ counter_token: countertoken }) 
  }

  
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }
  
  render() {
    return (
      <div className="container">        
        <h1 style={{textAlign:"center"}}>TD07 !</h1><br></br>
        <p>Network : {this.state.network}</p>
        <p>Your account : {this.state.account}</p>
        <p>Chain Id : {this.state.chain_id}</p>
        <p>Last block number : {this.state.last_block}</p>
        <p>Token name : {this.state.name_token}</p>
        <p>Counter of token : {this.state.counter_token}</p>
      </div>
    );
  }
}

export default App;