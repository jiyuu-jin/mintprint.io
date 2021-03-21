import Web3 from 'web3';

const ERC721ABI: any = require('../../public/ArtTokenABI.json');

export default async (req, res) => {

  const { userAddress, tokenAddress, tokenId, network } = req.query;

  const networks = {
    1: 'wss://main-light.eth.linkpool.io/ws',
    4: 'wss://rinkeby-light.eth.linkpool.io/ws',
    137: 'wss://ws-mainnet.matic.network',
    80001: 'wss://ws-mumbai.matic.today',
  };

  const web3 = new Web3(networks[network || 80001]);

  const tokenContract = new web3.eth.Contract(ERC721ABI, tokenAddress);

  const isOwner = await tokenContract.methods.ownerOf(tokenId).call() == userAddress;

  res.status(200).json({isOwner});
}
