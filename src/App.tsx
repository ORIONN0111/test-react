import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
// import { Cube } from './Cube';
// import { SearchForm } from './Search';
import './styles.css'
import data from "./data.json";
import * as THREE from 'three';
import type { Mesh } from 'three';
import { FC, useRef } from 'react';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
	Grid,
	Button,
	Box,
	TextField,
	Autocomplete,
	Typography,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material';
var sendId = -10;

function App() {
	const [count, setNum] = useState(0);
	const { control, handleSubmit, setValue, getValues } = useForm({
		mode: 'onChange',
		defaultValues: {
			single: {},
		},
	});
	const magnification = 0.01;
	const cubeRef = useRef<Mesh>(null);


	const handleClickOpen = () => {
		// setOpen(true);
		console.log('handleC');
	};
	const handleClose = () => {
		// setOpen(false);
		console.log('handleClo');
	};
	const handleChange = (e: any) => {
		// console.log(e.target.id);
		sendId = e.id;
		const new_count = e.id;
		setNum(new_count)
		console.log(sendId);
	};

	return (
		<>
			<div className="App">
				<Canvas
					camera={{
						fov: 45,
						near: 0.1,
						far: 1000,
						position: [0, 0, 10]
					}}
				>
					<mesh ref={cubeRef}>
						<mesh>
							<>
								{/* ボックスを置く */}
								{function () {
									let list = [];
									for (let i = 0; i < data.place.length; i++) {
										let w = data.place[i].x - 925 / 2;
										let h = -data.place[i].y + 588 / 2;
										console.log(sendId);
										
										if(i===sendId-1){
											list.push(
												<mesh position={[w * magnification, h * magnification, 15 * magnification * 10]} key={["boxkey",i].join('')}>
													<boxBufferGeometry args={[10 * data.place[i].w * magnification, 10 * data.place[i].h * magnification, 10 * data.place[i].d * magnification]} />
													<meshNormalMaterial  attach="material"/>
												</mesh>
											)
										}else{
										list.push(
											<mesh position={[w * magnification, h * magnification, 15 * magnification * 10]} key={["boxkey",i].join('')}>
												<boxBufferGeometry args={[10 * data.place[i].w * magnification, 10 * data.place[i].h * magnification, 10 * data.place[i].d * magnification]} />
												<meshNormalMaterial wireframe />
											</mesh>
										)
									}
									}
									return list;
								}()}
							</>

							<>
								{/* 地面を作る */}
								{function () {
									let list = [];
									let xAd = 250;
									let yAd = 250;
									for (let i = 0; i < data.ground.length; i++) {
										for (let v = 0; v < data.ground[i].length; v++) {
											let a = 2000 / data.ground[i].length;
											let b = 1200 / data.ground.length;
											const maskPts = [];
											maskPts.push(new THREE.Vector2((a - a * (v - 1) / 2 + xAd) * magnification, (b - b * (i - 1) / 2 + yAd) * magnification));
											maskPts.push(new THREE.Vector2((a - a * (v - 1) / 2 + xAd) * magnification, (b - b * (i - 0) / 2 + yAd) * magnification));
											maskPts.push(new THREE.Vector2((a - a * (v - 0) / 2 + xAd) * magnification, (b - b * (i - 0) / 2 + yAd) * magnification));
											maskPts.push(new THREE.Vector2((a - a * (v - 0) / 2 + xAd) * magnification, (b - b * (i - 1) / 2 + yAd) * magnification));
											const maskShape: any = new THREE.Shape(maskPts);
											list.push(
												<mesh position={[0, 0, data.ground[i][data.ground.length - v]]} key={["groundKey",i,"k",v].join('')}>
													<shapeBufferGeometry attach="geometry" args={[maskShape]} />
													<meshStandardMaterial color='hotpink' />
												</mesh>
											)
										}
									}
									return list;
								}()}
							</>

						</mesh>
						<meshPhongMaterial color="aqua" />
					</mesh>
					<ambientLight args={[0xffffff]} intensity={0.2} />
					<directionalLight position={[1, 1, 1]} intensity={0.8} />
					<OrbitControls />
				</Canvas>
				{/* <SearchForm /> */}
			</div>
			{/* <footer> */}
			<div className="form" >
				<form onSubmit={handleSubmit(handleClickOpen)}>
					<Controller
						control={control}
						name="single"
						render={({ }) => (
							<Autocomplete
								fullWidth
								options={data.place}
								renderOption={(props, option) => {
									return (
										<li {...props} key={option.id} id={option.id.toString()}>
											{option.label}
										</li>
									);
								}}
								renderInput={(params) => <TextField {...params} label="施設名" />}
								onChange={(e) => handleChange(e.target)}
							/>
						)}
					/>
				</form>
			</div>
			{/* </footer> */}
		</>
	);
}

export default App;