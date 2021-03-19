import { useEffect, useState } from 'react';
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  const [nftAsset, setNFTAsset]: any = useState();
  
  return <Component setNFTAsset={setNFTAsset} nftAsset={nftAsset} {...pageProps} />
}
