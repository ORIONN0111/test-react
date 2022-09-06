// import logo from './logo.svg';
import styles from '../App.css';
import pic from "../Images/image.png";
// import { type } from '@testing-library/user-event/dist/type';
import { useForm, Controller } from 'react-hook-form';
// import Map from "./Map";
import data from "../data2.json";
import { useState } from 'react';
// import { DevTool } from '@hookform/devtools';
import {
  TextField,
  Autocomplete,
  inputAdornmentClasses,
} from '@mui/material';
import LeaderLine from "leader-line-new";
var sendId = 0;

function App() {

  let link = [];
  // const initialLinks: LeaderLine[] = [];
  // const [links, setLinks] = useState(initialLinks);

  const [count, setNum] = useState(0);
  const { control, handleSubmit, setValue, getValues } = useForm({
    mode: 'onChange',
    defaultValues: {
      single: {},
    },
  });

  // const handleClickOpen = () => {
  //   // setOpen(true);
  //   // console.log('handleC');
  // };
  // const handleClose = () => {
  //   // setOpen(false);
  //   // console.log('handleClo');
  // };
  const handleChange = (e) => {
    // console.log(e.target.id);
    sendId = e.target.id;
    const new_count = e.target.id;
    // // gvu
    // if (links.length > 0){
    //   links.filter(l => {
    //     l.remove();
    //   })
    // }
    // link.push(new LeaderLine(
    //               document.getElementById("3"),
    //               document.getElementById(String(new_count-1)),
    //               {dash: {animation: true}}));
    // setLinks(link);
    // // lll

    setNum(new_count);
    // console.log(setNum);
  };

  // const handleDisply = (e) =>{
  //   console.log(document.getElementById("3"));
  //           //ラインを引く
  //           let nodeLine = [];

  //           // console.log(document.getElementById("3"));


  //           // nodeLine.push(new LeaderLine(
  //           //   document.getElementById("3"),
  //           //   document.getElementById("9"),
  //           //   {dash: {animation: true}}));
  //           // setLinks(nodeLine);
  //           // setNum(4);
            
  //           for (let i = 0; i < data.place.length; i++) {
  //             const elements = data.place[i];
  //             // console.log(elements.node);
  //             if(elements.node.length<=0) continue;
  //             for (let e = 0; e < elements.node.length; e++) {
  //             nodeLine.push(new LeaderLine(
  //             document.getElementById(String(elements.id-1)),
  //             document.getElementById(String(elements.node[e]-1)),
  //             {dash: {animation: true}}));
  //             }
  //           }
  //           // setLinks(nodeLine);
  //           // setNum(1000);
  // }


  const gps = () => {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }

  // 取得に成功した場合の処理
function successCallback(position){
  // 緯度と経度を取得し画面に表示
  var latitude = position.coords.latitude - 35.1835865;
  var longitude = position.coords.longitude - 137.1118045;
  let myPos = [];
  myPos.push(<div
    key={"myPos"}
    className='base-place'
    style={{left:latitude,top:longitude,backgroundColor:'blue'}}
    id={"myPos"}
  >
    {/* {String(i+1)} */}
    </div>)
};

// 取得に失敗した場合の処理
function errorCallback(error){
  alert("位置情報が取得できませんでした");
};

  const { innerWidth: width} = window;
  var imagevw = 925
  var imagevh = 588
  const height = width * imagevh / imagevw
  // let count = 40

  return (
    <div className='base'>

    <img src={pic} alt="map" className='map'></img>
    {function(e) {

      //点を置く
      // if(e=!null) sendId = e.id
      // console.log(sendId);
      let list = []
      // let name
      for (let i = 0; i < data.place.length; i++) {
        // const pos1 = {left:228 * width / imagevw, top:200 * height / imagevh};
        let w = data.place[i].x * width / imagevw;
        let h = data.place[i].y * height / imagevh;
        if(!data.place[i].info.length){
          list.push(<div
            key={list}
            className='base-place'
            style={{left:w,top:h,backgroundColor:'blue'}}
            id={String(i)}
          >
            {/* {String(i+1)} */}
            </div>)
        }else if(sendId==data.place[i].id){
          list.push(<div
            key={list}
            className='base-place'
            style={{left:w,top:h,backgroundColor:'red'}}
            id={String(i)}
          >
            {/* {String(i+1)} */}
            </div>)
        }else{
        list.push(<div
          key={list}
          className='base-place'
          style={{left:w,top:h,backgroundColor:'green'}}
          id={String(i)}
        >
          {/* {String(i+1)} */}
          </div>)
        }
      }
      return list
    }()}    
    <form onSubmit={handleSubmit(handleChange)}>
    <Controller
      control={control}
      name="single"
      render={({ props }) => (
        <Autocomplete
          fullWidth
          options={data.place}
          renderOption={(props, option) => {
            return (
              <li {...props} key={option.id} id={option.id}>
                {option.label}
              </li>
              );
            }}
          renderInput={(params) => <TextField {...params} label="施設名" />}
          onChange={(e) => handleChange(e)}
          />
          )}
        />
       </form>
       {/* 経路探索用
    <button onClick={(e) => (handleDisply(e))}>矢印表示</button> */}
    <button onClick={() => (gps())}>GPS取得</button>
    </div>
  );
}

// document.getElementById("gps").onclick = function(){
//   // 位置情報を取得する
//   navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
// };
// // 取得に成功した場合の処理
// function successCallback(position){
//   // 緯度を取得し画面に表示
//   var latitude = position.coords.latitude;
//   document.getElementById("latitude").innerHTML = latitude;
//   // 経度を取得し画面に表示
//   var longitude = position.coords.longitude;
//   document.getElementById("longitude").innerHTML = longitude;
// };

export default App;
