import { useEffect, useState } from 'react';
import Web3 from 'web3';
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  const [nftAsset, setNFTAsset]: any = useState();
  const [printCID, setPrintCID] = useState("");
  const [tokenType, setTokenType]: any = useState();
  const [nftName, setNFTName]: any = useState("");
  const [nftDescription, setNFTDescription]: any = useState("");
  const [nftAddress, setNFTAddress]: any = useState("");
  const [printType, setPrintType]: any = useState("");
  const [nftID, setNFTID]: any = useState("");
  const [imageMockup, setImageMockup]: any = useState("");
  const [item, setItem]: any = useState("71");
  const [w3, setW3]: any = useState();

  useEffect(() => {
    try{
      if ((window as any).ethereum) {
        (window as any).ethereum.enable();
        const web3Instance = new Web3((window as any).ethereum);
        (async() =>{
          console.log(await web3Instance.eth.getAccounts());
        })();
        setW3(web3Instance);
      }else{
        alert("Please connect MetaMask to use this site.")
      };
    }catch(error){
      console.error(error);
    };
}, []);
  
  return (
    <Component
      web3={w3}
      setNFTAsset={setNFTAsset}
      setNFTName={setNFTName}
      setNFTDescription={setNFTDescription}
      setNFTAddress={setNFTAddress}
      setNFTID={setNFTID}
      setPrintType={setPrintType}
      setImageMockup={setImageMockup}
      setPrintCID={setPrintCID}
      setItem={setItem}
      printCID={printCID}
      nftName={nftName}
      nftDescription={nftDescription}
      nftAsset={nftAsset}
      nftAddress={nftAddress}
      nftID={nftID}
      printType={printType}
      imageMockup={imageMockup}
      item={item}
      {...pageProps}
    />
  )
}
