import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Draggable from 'react-draggable';

export default function Print({nftAsset}: any) {
  const [item, setItem]: any = useState("71");
  const [itemTemplates, setItemTemplates]: any = useState({});
  const [itemScalingFactor, setItemScalingFactor]: any = useState(2);
  const [currentTemplate, setCurrentTemplate]: any = useState(0);
  const [image, setImage]: any = useState(nftAsset);
  const [mockup, setMockup] = useState({
    image_url: "/loader.svg", 
    template_height: "", 
    template_width: "", 
    background_color: "",
    print_area_height: 0,
    print_area_left: 0,
    print_area_top: 0,
    print_area_width: 0,
  });
  const router = useRouter();

  useEffect(() =>{
    const checkHttps = (process.env.NEXT_PUBLIC_MODE == 'dev') ? 'http': 'https';
    (async() =>{
      const mockupResp = await axios.get(
        `${checkHttps}://${window.location.host}/api/item?item=${item}`
      );

      console.log("Printful Response:", mockupResp.data);

      setItemTemplates(mockupResp.data);
      setItemScalingFactor(mockupResp.data[currentTemplate].template_width / 500);
      setMockup(mockupResp.data[currentTemplate]);
    })();
  }, [item]);

  return (
    <div>
      <h1 style={{padding: 30, fontWeight: "bold", textAlign: "center", margin: "0 auto", fontSize: "60px"}}>Create a New NFTee.</h1>
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
      
      <div style={{position: "relative", margin: "0 auto", backgroundColor: "white", width: 500, height: 500, overflow: "hidden"}}>
        <div style={{overflow: "hidden", opacity: 0.5, position: "absolute", top: (mockup.print_area_top / itemScalingFactor), left: ((mockup.print_area_left - 5) / itemScalingFactor), zIndex: 20, background: "rgb(13, 97, 222)", width: mockup.print_area_width / itemScalingFactor, height: mockup.print_area_height / itemScalingFactor}}>
          <Draggable
          handle=".handle"
          bounds="parent"
          >
            <img draggable="false" className="handle" src={image} style={{width: "100%"}} />
          </Draggable>
        </div>
        <img style={{backgroundColor: mockup.background_color, width: "100%"}}  src={mockup.image_url}/>
      </div>
      <input style={{display: "block", margin: "20px auto", fontSize: "30px"}} onClick={() => {router.push("/mint/preview")}} type="button" value="Preview"/>
    </div>
  )
}
