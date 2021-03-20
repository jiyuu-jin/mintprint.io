import Web3 from 'web3';

const ERC721ABI: any = require('../../public/ArtTokenABI.json');

export default async (req, res) => {

  const { userAddress, tokenAddress, tokenId, network } = req.query;

  const networks = {
    mainnet: 'wss://main-light.eth.linkpool.io/ws',
    matic: 'wss://ws-mainnet.matic.network',
    mumbai: 'wss://ws-mumbai.matic.today',
    rinkeby: 'wss://rinkeby-light.eth.linkpool.io/ws',
  };

  const web3 = new Web3(networks[network || 'mumbai']);

  const tokenContract = new web3.eth.Contract(ERC721ABI, tokenAddress);

  const isOwner = await tokenContract.methods.ownerOf(tokenId).call() == userAddress;

  res.status(200).json({isOwner});
}
