import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Draggable from 'react-draggable';

export default function Print({nftAsset, setNFTAsset, setNFTAddress, setTokenID}: any) {
  const [printView, setPrintView]: any = useState("template");
  const [item, setItem]: any = useState("71");
  const [itemTemplates, setItemTemplates]: any = useState({});
  const [currentTemplate, setCurrentTemplate]: any = useState(0);
  const [itemPrintFiles, setItemPrintFiles]: any = useState({});
  const [itemScalingFactor, setItemScalingFactor]: any = useState(2);
  const [itemMockupImage, setItemMockupImage]: any = useState();
  const [itemTemplate, setItemTemplate]: any = useState({
    image_url: "/loader.svg",
    template_height: "", 
    template_width: "",
    background_color: "",
    print_area_height: 0,
    print_area_left: 0,
    print_area_top: 0,
    print_area_width: 0,
  });
  const [printScheme, setPrintScheme] = useState({
    "area_width": 0,
    "area_height": 0,
    "width": 0,
    "height": 0,
    "top": 300,
    "left": 0
  });

  const checkHttps = (process.env.NEXT_PUBLIC_MODE == 'dev') ? 'http': 'https';
  const router = useRouter();

  const viewPreview = async () =>{
    console.log("generating print");
    setPrintView("loading");

    let printScheme = {
      "variant_ids" : [4012],
      "format": "jpg",
      "files" : [
          {
              "placement": "front",
              "image_url": "https://ipfs.io/ipfs/QmQP8PxFWkqoSFwzi3RBHyS5tnDct2bnwaA2TzNL4mwbvf",
              "position": {
                "area_width": 1800, //(itemPrintFiles[0].width),
                "area_height": 1800, //(itemPrintFiles[0].height),
                "width": 1800, //(itemPrintFiles[0].width),
                "height": 1800,// (itemPrintFiles[0].height,
                "top": 300,
                "left": 0
              }
          }
      ]
    }

    const mockupResp = await axios.post(
      `${checkHttps}://${window.location.host}/api/mockup?item=${item}`,
      printScheme
    );
    console.log(mockupResp.data.result);
    setItemMockupImage(mockupResp.data.result.mockups[0].mockup_url);
    setPrintView("mockup");
  }

  const onImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setNFTAsset(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  const mockupView = {
    "template": itemTemplate.image_url,
    "mockup": itemMockupImage,
    "loading": "/loader.svg"
  };

  useEffect(() =>{
    (async() =>{
      const mockupResp = await axios.get(
        `${checkHttps}://${window.location.host}/api/item?item=${item}`
      );

      console.log("Printful Response:", mockupResp.data);

      setItemTemplates(mockupResp.data.itemTemplates);
      setItemPrintFiles(mockupResp.data.itemPrintFiles.printfiles);
      setItemScalingFactor(mockupResp.data.itemTemplates[currentTemplate].template_width / 500);
      setItemTemplate(mockupResp.data.itemTemplates[currentTemplate]);
    })();
  }, [item]);

  const renderButtons = () =>{
    if (printView != "template"){
      return (
        <div style={{display: "block", margin: "20px auto", maxWidth: "500px"}}>
          <input style={{display: "inline-block", fontSize: "30px", margin: "0 10px 0 0"}} onClick={() => setPrintView("template")} type="button" value="Edit Mockup"/>
          <input style={{display: "inline-block", fontSize: "30px"}} onClick={() => router.push("/mint/preview")} type="button" value="Create MintPrint"/>
        </div>
      )
    }else{
      return <input style={{display: "block", margin: "20px auto", fontSize: "30px"}} onClick={() => viewPreview()} type="button" value="Preview"/>
    };      
  }

  return (
    <div>
      <h1 style={{padding: 30, fontWeight: 400, textAlign: "center", margin: "0 auto", fontSize: "60px"}}>Customize Your Print</h1>
        <div style={{textAlign: "center", display: "block", margin: "20px auto", fontSize: "30px"}}>
          <label htmlFor="tokenAddress">Token Address:</label>
          <input id="tokenAddress"style={{ marginLeft: "10px", fontSize: "30px"}} onChange={(e) => setNFTAddress(e.target.value)} placeholder="Address" />
        </div>

        <div style={{textAlign: "center", display: "block", margin: "20px auto", fontSize: "30px"}}>
          <label htmlFor="tokenAddress">Token ID:</label>
          <input id="tokenAddress"style={{ marginLeft: "10px", fontSize: "30px"}} onChange={(e) => setTokenID(e.target.value)} placeholder="Address" />
        </div>

        <div style={{textAlign: "center", display: "block", margin: "20px auto", fontSize: "30px"}}>
          <label htmlFor="products">Choose an Item:</label>
          <select style={{marginLeft: "10px", fontSize: "30px"}} onChange={(e) => setItem(e.target.value)} name="items" id="items">
            <option value="71">T-shirt</option>
            <option value="1">Matte Paper Poster</option>
            <option value="3">Canvas Print</option>
            <option value="19">Mug</option>
            <option value="186">Socks</option>
            <option value="358">Stickers</option>
            <option value="469">ECO-Friendly Bikini</option>
          </select>
        </div>

        <input onChange={onImageChange} style={{padding: "20px 20px 20px 80px", display: "block", margin: "0 auto", fontSize: "30px"}} type="file" />


          <div style={{position: "relative", margin: "0 auto", backgroundColor: "white", width: 500, height: 500, overflow: "hidden"}}>
            {
              printView != "template" ?
                <div/>
              :
                <div style={{overflow: "hidden", opacity: 0.5, position: "absolute", top: (itemTemplate.print_area_top / itemScalingFactor), left: ((itemTemplate.print_area_left - 5) / itemScalingFactor), zIndex: 20, background: "rgb(13, 97, 222)", width: itemTemplate.print_area_width / itemScalingFactor, height: itemTemplate.print_area_height / itemScalingFactor}}>
                  <Draggable
                  handle=".handle"
                  bounds="parent"
                  >
                    <img draggable="false" className="handle" src={nftAsset} style={{width: "100%"}} /> 
                  </Draggable>
                </div>
            }
              <img style={{backgroundColor: itemTemplate.background_color, width: "100%"}}  src={mockupView[printView]}/>
          </div>
        {renderButtons()}
    </div>
  )
}
