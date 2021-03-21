
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import TokenForm from "../components/TokenForm";
import axios from 'axios';

export default function Link({ web3 }) {
  const router = useRouter();
  const { link } = router.query;

  const [tokenAddress, setTokenAddress] = useState('');
  const [tokenId, setTokenId] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [stateCode, setStateCode] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [zip, setZip] = useState('');
  const [printCID, setPrintCID] = useState('');
  const [order, setOrder] = useState({
      "recipient": {
          "name": "",
          "address1": "",
          "city": "",
          "state_code": "",
          "country_code": "",
          "zip": ""
      },
      "items": [{
          "variant_id": 0,
          "quantity": 0,
          "files": [{
              "url": ""
          }]
      }]
  });

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`/api/print?name=${link}`);
      setTokenAddress(data.tokenaddress);
      setTokenId(data.tokenid);
      setPrintCID(`https://ipfs.io/ipfs/${data.printcid}`);
    })();
  });

  const claimToken = async () => {
    // check token ownership (loosely)
    const accounts = await web3.eth.getAccounts();
    setUserAddress(accounts[0]);
    const networkId = await web3.eth.getChainId() || 80001;
    const { data } = await axios.get(`/api/check?tokenAddress=${tokenAddress}&tokenId=${tokenId}&userAddress=${accounts[0]}&network=${networkId}`);
    const { isOwner } = data;
    if (!isOwner) {
      alert('You do not own this token!');
      return;
    }
    // trigger printing
    console.log('You are the owner');
  }

  return (
    <div>
      <TokenForm 
        setUserAddress={setUserAddress}
        action={claimToken}
        link={link}
        nftAsset={printCID}
        setName={setName}
        setCity={setCity}
        setStateCode={setStateCode}
        setCountryCode={setCountryCode}
        setZip={setZip}
      />
    </div>
  )
}