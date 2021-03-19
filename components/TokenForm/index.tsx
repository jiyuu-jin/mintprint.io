import { useState } from "react";
import { useRouter } from 'next/router';

export default function TokenForm({link, nftAsset, nftDescription, nftName, nftPrice, claimType}: any) {

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

      <div className="flip-card" style={{margin: "0 auto"}}>
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <img src={nftAsset} style={{height: "100%", width: "100%", objectFit: "contain"}} />
          </div>
          <div className="flip-card-back">
            <img src={nftAsset} style={{height: "100%", width: "100%", objectFit: "contain"}} />
          </div>
        </div>
      </div>

      <h3 style={{textAlign: "center", fontSize: "25px"}}>{nftName}</h3>
      <p style={{textAlign: "center", maxWidth: "500px", margin: "0 auto"}}>{nftDescription}</p>

      <input style={{display: "block", margin: "20px auto", fontSize: "30px"}} onChange={(e) => {setCryptoAddress(e.target.value)}} type="input" placeholder="Crypto Address" />
      <input style={{display: "block", margin: "20px auto", fontSize: "30px"}} onChange={(e) => {setMailingAddress(e.target.value)}} type="input" placeholder="Mailing Address" />
      <input style={{display: "block", margin: "20px auto", fontSize: "30px"}} onClick={claimNFT} type="button" value="Claim NFT"/>
    </div>
  )
}