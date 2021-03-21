import { useState } from "react";
import { useRouter } from 'next/router';

export default function TokenForm({
  nftAsset, nftDescription, 
  nftName, nftPrice, claimType, 
  action, setName, setCity, 
  setCountryCode, setStateCode, 
  setZip, setUserAddress
}: any) {

  return (
    <div>
      <div style={{padding: 30, fontWeight: 300, textAlign: "center", margin: "0 auto", fontSize: "60px"}}>
        Print Token
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

      <input style={{display: "block", margin: "20px auto", fontSize: "30px"}} onChange={(e) => {setName(e.target.value)}} type="input" placeholder="Name" />
      <input style={{display: "block", margin: "20px auto", fontSize: "30px"}} onChange={(e) => {setUserAddress(e.target.value)}} type="input" placeholder="Address" />
      <input style={{display: "block", margin: "20px auto", fontSize: "30px"}} onChange={(e) => {setCity(e.target.value)}} type="input" placeholder="City" />
      <input style={{display: "block", margin: "20px auto", fontSize: "30px"}} onChange={(e) => {setStateCode(e.target.value)}} type="input" placeholder="State Code" />
      <input style={{display: "block", margin: "20px auto", fontSize: "30px"}} onChange={(e) => {setCountryCode(e.target.value)}} type="input" placeholder="Country Code" />
      <input style={{display: "block", margin: "20px auto", fontSize: "30px"}} onChange={(e) => {setZip(e.target.value)}} type="input" placeholder="Zip Code" />
      <input style={{display: "block", margin: "20px auto", fontSize: "30px"}} onClick={async () => await action()} type="button" value="Claim NFT"/>
    </div>
  )
}