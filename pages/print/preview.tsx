import { useState, useEffect } from "react";
import { faChevronRight, faChevronLeft, faRedo} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { loadStripe } from "@stripe/stripe-js/pure";
import TokenForm from '../../components/TokenForm';
import axios from 'axios';

export default function Preview({ nftAsset, nftName, nftAddress, nftID, nftDescription, nftPrice, printPrice, imageMockup, printCID, item}) {

  const [linkName, setLinkName]: any = useState("");
  const [claimType, setClaimType]: any = useState("");
  const setName = () =>{}
  const setCity = () =>{}
  const setStateCode = () =>{}
  const setCountryCode = () =>{}
  const setZip = () =>{}

  const generateLink = async () => {
    console.log("Generating Link!");

    await axios.post('/api/print', {
      shortName: linkName,
      tokenAddress: nftAddress,
      tokenID: nftID,
      printType: claimType,
      printCID,
      productType: item,
    });

    const { data } = await axios.post(`/api/create-checkout-session?printCID=${printCID}`, { "itemType": item });
    console.log("data: ", data);
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE);
    console.log("done with loadStripe");
    return await stripe.redirectToCheckout({ sessionId: data.id });
  }

  const claimNFT = () => {
    alert("Congratulations, you have claimed your limited addition NFT!");
  }

  return (
    <div>
      <h1 style={{padding: 30, fontWeight: 400, textAlign: "center", margin: "0 auto", fontSize: "60px"}}>
        Create Your Token Link
      </h1>

      <div style={{textAlign: "center", display: "block", margin: "20px auto", fontSize: "30px"}}>
        <label htmlFor="tokenName">Token Link Name:</label>
        <input id="tokenName" style={{ marginLeft: "10px", fontSize: "30px"}} onChange={(e) => {setLinkName(e.target.value)}} placeholder="Name" />
      </div>

      <div style={{textAlign: "center", display: "block", margin: "20px auto", fontSize: "30px"}}>
        <label htmlFor="claimType">Form Type:</label>
        <select style={{marginLeft: "10px", fontSize: "30px"}} onChange={(e) => setClaimType(e.target.value)} name="claimType" id="claimType">
            <option value="free">Free</option>
            <option value="donation">Donation</option>
            <option value="shop">Shop</option>
          </select>
      </div>

      <input style={{display: "block", margin: "20px auto", fontSize: "30px"}} onClick={async () => {await generateLink()}} type="button" value="Confirm your MintPrint"/>

      <h1 style={{padding: 30, fontWeight: 400, textAlign: "center", margin: "50px auto 0 auto", fontSize: "40px"}}>
        Browser Preview
      </h1>

      <div style={{padding: "0 0 40px 0" ,margin: "0 10% 50px 10%", border: "1px solid gray"}}>
        <FontAwesomeIcon style={{fontSize: "25px", display: "inline-block", margin: "0 20px"}} icon={faChevronLeft} />
        <FontAwesomeIcon style={{fontSize: "25px", display: "inline-block", margin: "0 20px"}} icon={faChevronRight} />
        <FontAwesomeIcon style={{fontSize: "25px", display: "inline-block", margin: "0 75px 0 20px"}} icon={faRedo} />
        <p style={{display: "inline-block", padding: 15,  margin: "0 auto", fontSize: "30px"}}>https://mintprint.io/{linkName}</p>
        <hr/>

        <TokenForm 
          link={linkName}
          nftAsset={nftAsset}
          nftName={nftName}
          nftDescription={nftDescription}
          nftPrice={nftPrice}
          claimType={claimType}
          action={claimNFT}
          setName={setName}
          setCity={setCity}
          setStateCode={setStateCode}
          setCountryCode={setCountryCode}
          setZip={setZip}
        />
      </div>
    </div>
  )
}