// import logo from './logo.svg';
import styles from '../App.css';
import pic from "../Images/image.png";
// import { type } from '@testing-library/user-event/dist/type';
import { useForm, Controller } from 'react-hook-form';
// import Map from "./Map";
import data from "../data.json";
import { useState } from 'react';
// import { DevTool } from '@hookform/devtools';
import {
  TextField,
  Autocomplete,
} from '@mui/material';
var sendId = 0;

function App() {
  const [count, setNum] = useState(0);
  const { control, handleSubmit, setValue, getValues } = useForm({
    mode: 'onChange',
    defaultValues: {
      single: {},
    },
  });

  const handleClickOpen = () => {
    // setOpen(true);
    console.log('handleC');
  };
  const handleClose = () => {
    // setOpen(false);
    console.log('handleClo');
  };
  const handleChange = (e) => {
    // console.log(e.target.id);
    sendId = e.target.id;
    const new_count = e.target.id;
    setNum(new_count)
    // console.log(setNum);
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
      // if(e=!null) sendId = e.id
      // console.log(sendId);
      let list = []
      // let name
      for (let i = 0; i < 40; i++) {
        const pos1 = {left:228 * width / imagevw, top:200 * height / imagevh}
        let w = data.place[i].x * width / imagevw
        let h = data.place[i].y * height / imagevh
        if(sendId==data.place[i].id){
          list.push(<div
            key={list}
            className='base-place'
            style={{left:w,top:h,backgroundColor:'red'}}
          ></div>)
        }else{
        // list.push(<div
        //   key={list}
        //   className='base-place'
        //   style={{left:w,top:h}}
        // ></div>)
        }
      }
      return list
    }()}    
    <form onSubmit={handleSubmit(handleClickOpen)}>
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
            
    </div>
  );
}

export default App;
