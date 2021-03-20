import Web3 from 'web3';

const ERC721ABI: any = require('../../public/ArtTokenABI.json');

export default async (req, res) => {

  const { userAddress, tokenAddress, tokenId, networkId } = req.query;

  const networks = {
    80001: 'wss://ws-mumbai.matic.today',
  };

  const web3 = new Web3(networks[networkId || 80001]);

  const tokenContract = new web3.eth.Contract(ERC721ABI, tokenAddress);

  const isOwner = await tokenContract.methods.ownerOf(tokenId).call() == userAddress;

  res.status(200).json({isOwner});
}
