import pic from "../images/Image.png";
import React from "react";
function Map(props) {
    const { innerWidth: width} = window;
    var imagevw = 925
    var imagevh = 588
    const height = width * imagevh / imagevw
    let count = 40

return (
    <view className='base'>
    <img src={pic} alt="map" className='map'></img>
    {function() {
      let list = []
      let name
      for (let i = 0; i < 40; i++) {
        const pos1 = {left:228 * width / imagevw, top:200 * height / imagevh}
        let w = props.place[i].x * width / imagevw
        let h = props.place[i].y * height / imagevh
        list.push(<div
          className='base-place'
          style={{left:w,top:h}}
        ></div>)
      }
      return list
    }()}
    </view>
  );
}

export default Map;