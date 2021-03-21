import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Draggable from 'react-draggable';
//import styles from "./progress.module.css";

export default function Print({ nftAsset, imageMockup, item, setImageMockup, setNFTAsset, setNFTAddress, setNFTID, setPrintCID, setItem}: any) {
  const [printView, setPrintView]: any = useState("template");
  const [itemTemplates, setItemTemplates]: any = useState({});
  const [currentTemplate, setCurrentTemplate]: any = useState(0);
  const [itemPrintFiles, setItemPrintFiles]: any = useState({});
  const [itemScalingFactor, setItemScalingFactor]: any = useState(2);
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
  const [progressBarRunning, setProgressBarRunning] = useState(false);

  const router = useRouter();

  const viewPreview = async () =>{
    console.log("generating print");
    setPrintView("loading");
    console.log("Variant ID", itemPrintFiles.variant_printfiles[0].variant_id);

    let printScheme = {
      "variant_ids" : [itemPrintFiles.variant_printfiles[0].variant_id],
      "format": "jpg",
      "files" : [
          {
              "placement": Object.keys(itemPrintFiles.available_placements)[0],
              "image_url": "https://ipfs.io/ipfs/QmQP8PxFWkqoSFwzi3RBHyS5tnDct2bnwaA2TzNL4mwbvf",
              "position": {
                "area_width": itemPrintFiles.printfiles[0].width,
                "area_height": itemPrintFiles.printfiles[0].height,
                "width": itemPrintFiles.printfiles[0].width,
                "height": itemPrintFiles.printfiles[0].height,
                "top": 0,
                "left": 0
              }
          }
      ]
    }

    setProgressBarRunning(true);

    const mockupResp = await axios.post(`/api/mockup?item=${item}`, printScheme);
    console.log(mockupResp.data.result);
    const { data } = await axios.post(`/api/pin?fileURL=${mockupResp.data.result.mockups[0].mockup_url}`);
    setImageMockup(`https://ipfs.io/ipfs/${data}`);
    setPrintCID(data);
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
    "mockup": imageMockup,
    "loading": "/loader.svg"
  };

  useEffect(() =>{
    (async() =>{
      const mockupResp = await axios.get(`/api/item?item=${item}`);

      console.log("Printful Response:", mockupResp.data);

      setItemTemplates(mockupResp.data.itemTemplates);
      setItemPrintFiles(mockupResp.data.itemPrintFiles);
      setItemScalingFactor(mockupResp.data.itemTemplates[currentTemplate].template_width / 500);
      setItemTemplate(mockupResp.data.itemTemplates[currentTemplate]);
    })();
  }, [item]);

  const renderButtons = () =>{
    if (printView != "template"){
      return (
        <div style={{display: "block", margin: "20px auto", maxWidth: "500px"}}>
          <input style={{display: "inline-block", fontSize: "30px", margin: "0 10px 0 0"}} onClick={() => setPrintView("template")} type="button" value="Edit Mockup"/>
          <input style={{display: "inline-block", fontSize: "30px"}} onClick={() => router.push("/print/preview")} type="button" value="Create MintPrint"/>
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
          <input id="tokenAddress"style={{ marginLeft: "10px", fontSize: "30px"}} onChange={(e) => setNFTAddress(e.target.value)} placeholder="0x333" />
        </div>

        <div style={{textAlign: "center", display: "block", margin: "20px auto", fontSize: "30px"}}>
          <label htmlFor="tokenId">Token ID:</label>
          <input id="tokenId"style={{ marginLeft: "10px", fontSize: "30px"}} onChange={(e) => setNFTID(e.target.value)} placeholder="Token ID" />
        </div>

        {(printView == 'template') &&
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
        }
        <div style={{textAlign: "center", display: "block", margin: "20px auto", fontSize: "30px"}}>
          <label htmlFor="useTokenAsset">Use Token Asset:</label>
          <input type="checkbox" id="useTokenAsset" style={{ marginLeft: "10px", fontSize: "30px", height: "30px", width: "30px"}} />
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
          <div style={{width: "500px", height: "30px", margin: "20px auto", backgroundColor: "#ddd"}}>
            <div style={{backgroundColor: "#4CAF50", width: progressBarRunning ? "100%" : "0%", height: "100%", transitionProperty: "width", transitionDuration: "60s", transitionTimingFunction: "linear"}}/>
          </div>
        {renderButtons()}
    </div>
  )
}
