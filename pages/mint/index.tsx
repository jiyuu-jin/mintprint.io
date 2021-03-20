import { useState } from 'react';
import { useRouter } from 'next/router'

export default function Mint({nftAsset, setNFTAsset, setNFTName, setNFTDescription, setTokenType}) {
  let [supply, setSupply] = useState<number>(1);

  const router = useRouter();

  const onImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setNFTAsset(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  const continueToPrint = () => {
    router.push("/print");
  }

  return (
    <div>
      <h1 style={{padding: 30, fontWeight: 400, textAlign: "center", margin: "0 auto", fontSize: "60px"}}>Create a New NFT</h1>

      <img src={nftAsset} style={{border: "1px solid gray", height: 250, minWidth: 250, display: "block", margin: "0 auto"}} />
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
          <input id="tokenName"style={{ marginLeft: "10px", fontSize: "30px"}} onChange={(e) => setNFTName(e.target.value)} placeholder="Beeple's NFT" />
        </div>

        <div style={{display: "block", margin: "20px auto", fontSize: "30px"}}>
          <label htmlFor="tokenSupply">Token Supply:</label>
          <input id="tokenSupply" type="number" value={supply} onChange={(e) => setSupply(Number(e.target.value))} style={{width: "75px", marginLeft: "10px", fontSize: "30px"}} />
        </div>

        <div style={{display: "block", margin: "20px auto", fontSize: "30px"}}>
          <label htmlFor="tokenDescription">Token Description:</label>
          <textarea id="tokenDescription"style={{ display: "block", margin: "20px 0 0 0", fontSize: "30px", height: 220}} onChange={(e) => setNFTDescription(e.target.value)} placeholder="Details about the asset." />
        </div>
      </div>

      <input style={{display: "block", margin: "20px auto", fontSize: "30px"}} onClick={continueToPrint} type="button" value="Continue to Printing"/>
    </div>
  )
};