import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'

export default function Mint({setNFTAsset}) {
  let [image, setImage]: any = useState();
  let [tokenType, setTokenType]: any = useState();
  let [supply, setSupply] = useState<number>(1);

  const router = useRouter();

  const onImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
        setNFTAsset(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  const continueToPrint = () => {
    router.push("/mint/print");
  }

  return (
    <div>
      <h1 style={{padding: 30, fontWeight: 400, textAlign: "center", margin: "0 auto", fontSize: "60px"}}>Create a New NFT</h1>

      <img src={image} style={{border: "1px solid gray", height: 250, minWidth: 250, display: "block", margin: "0 auto"}} />
      <input onChange={onImageChange} style={{padding: "20px 20px 20px 80px", display: "block", margin: "0 auto", fontSize: "30px"}} type="file" />

      <div style={{margin: "0 auto", maxWidth: "400px"}}>
        <div style={{display: "block", margin: "20px auto", fontSize: "30px"}}>
          <label htmlFor="tokenType">Choose a Token Type:</label>
          <select style={{marginLeft: "10px", fontSize: "30px"}} onChange={(e) => setTokenType(e.target.value)} name="tokenType" id="tokenType">
            <option value="721">Polygon ERC721</option>
          </select>
        </div>

        <div style={{display: "block", margin: "20px auto", fontSize: "30px"}}>
          <label htmlFor="tokenName">Token Name:</label>
          <input id="tokenName"style={{ marginLeft: "10px", fontSize: "30px"}} placeholder="Beeple's NFT" />
        </div>

        <div style={{display: "block", margin: "20px auto", fontSize: "30px"}}>
          <label htmlFor="tokenSupply">Token Supply:</label>
          <input id="tokenSupply" type="number" value={supply} onChange={(e) => setSupply(Number(e.target.value))} style={{width: "75px", marginLeft: "10px", fontSize: "30px"}} />
        </div>

        <div style={{display: "block", margin: "20px auto", fontSize: "30px"}}>
          <label htmlFor="tokenDescription">Token Description:</label>
          <textarea id="tokenDescription"style={{ display: "block", margin: "20px 0 0 0", fontSize: "30px", height: 220}} placeholder="Details about the asset." />
        </div>
      </div>

      <input style={{display: "block", margin: "20px auto", fontSize: "30px"}} onClick={continueToPrint} type="button" value="Continue to Printing"/>
    </div>
  )
};