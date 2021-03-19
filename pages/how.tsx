export default function How() {
  return (
    <div>
      <h1 style={{padding: 30, fontWeight: 400, textAlign: "center", margin: "0 auto", fontSize: "60px"}}>How it Works!</h1>
      <p style={{fontSize: "25px", textAlign: "center", margin: 0}}>Mintprint.io is a project for creators to mint digital assets (NFTs) and then print real world 
        merchandise that is paired with each NFT.</p>

      <p style={{fontSize: "25px", textAlign: "center"}}>Each NFT is an ERC721 token deployed to the polygon/matic network.</p>
      <p style={{margin: "0 auto", maxWidth: "700px", fontSize: "25px", textAlign: "center"}}>Tokens can then be claimed/purchased by anyone with the token link and a real-world piece of merchandise is printed and shipped.</p>

      <ul style={{maxWidth: "500px", margin: "50px auto 0 auto", fontSize: "25px", listStyle: "none"}}>
        <li style={{padding: "10px"}}><span style={{fontWeight: "bold"}} >Step 1:</span> Token details are collected (name, description, asset, supply)</li>
        <li style={{padding: "10px"}}><span style={{fontWeight: "bold"}} >Step 2:</span> The creator customizes a piece of merchandise using the MintPrint Mockup generator.</li>
        <li style={{padding: "10px"}}><span style={{fontWeight: "bold"}} >Step 3:</span> The token and merchandise details are confirmed the creator pays the transaction fees to mint the token and pre-pays for each print.</li>
        <li style={{padding: "10px"}}><span style={{fontWeight: "bold"}} >Step 4:</span> A customizable token link is generated for the creator. Each token link has a unique customizable name and type (fixed-price, donation, or free). The token link can be shared anywhere.</li>
        <li style={{padding: "10px"}}><span style={{fontWeight: "bold"}} >Step 5:</span> Supporters of the creator are able to click the link and claim a token from the supply. Creators can use the service as a shop, donation platform, or for free crypto giveaways.</li>
      </ul>
    </div>
  )
};