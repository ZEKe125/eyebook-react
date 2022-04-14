import React from "react";
import { WebGazeContext } from "./WebGazeContext";
import "./Main.css";
import  Button  from "@mui/material/Button";
import SinglePagePDFViewer from "../../pdf/SinglePage";
// import AllPagesPDFViewer from "../../pdf/AllPages";
import stoic_book from "../../books/stoic.pdf";
// import { Paper } from "@mui/material";
import { useDispatch } from "react-redux";
import { set } from "../../features/PageID/PageIDSlice";

const thisPageID = 'MainApp';


function MainApp() {
	const dispatch = useDispatch();
	dispatch(set(thisPageID));
	
	
	return (
		<div id="container">
			<h1>New EyeBook Reader</h1>
			<h2>the revolution has begun</h2>
			

			
			{/* <WebGazeContext.Consumer>
				{(value) => (
					<div>
						{value.x} {value.y}
					</div>
				)}
			</WebGazeContext.Consumer> */}
			<Button href="/" variant="outlined" size="large">
				Go Back
			</Button>
			
			<SinglePagePDFViewer pdf= {stoic_book} />
			{/* <AllPagesPDFViewer pdf = {stoic_book}/> */}
		</div>
	);
}

export default MainApp;
