import { useState } from "react";
import { useRouter } from 'next/router';

export default function TokenForm({link, nftAsset}: any) {

  let [mailingAddress, setMailingAddress] = useState("");
  let [cryptoAddress, setCryptoAddress] = useState("");

  const claimNFT = () => {
      alert("Congratulations, you have claimed your limited addition NFT!")
  }

  return (
    <div>
      <div style={{padding: 30, fontWeight: 300, textAlign: "center", margin: "0 auto", fontSize: "60px"}}>
        Claim {link}'s Token
      </div>

      <img src={nftAsset} style={{border: "1px solid gray", height: 250, minWidth: 250, display: "block", margin: "0 auto"}} />

      <input style={{display: "block", margin: "20px auto", fontSize: "30px"}} onChange={(e) => {setCryptoAddress(e.target.value)}} type="input" placeholder="Crypto Address" />
      <input style={{display: "block", margin: "20px auto", fontSize: "30px"}} onChange={(e) => {setMailingAddress(e.target.value)}} type="input" placeholder="Mailing Address" />
      <input style={{display: "block", margin: "20px auto", fontSize: "30px"}} onClick={claimNFT} type="button" value="Claim NFT"/>
    </div>
  )
}