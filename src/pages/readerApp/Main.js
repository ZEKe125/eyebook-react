import React from "react";
import { WebGazeContext } from "./WebGazeContext";
import "./Main.css";
import Button from "@mui/material/Button";
import SinglePagePDFViewer from "../../pdf/SinglePage";
// import AllPagesPDFViewer from "../../pdf/AllPages";
import stoic_book from "../../books/stoic.pdf";
import  Container  from "@mui/material/Container";
import { useDispatch } from "react-redux";
import { set } from "../../features/PageID/PageIDSlice";
import AppBar from "../resourses/AppBar";

const thisPageID = "MainAppPage";

function MainApp() {
	const dispatch = useDispatch();
	dispatch(set(thisPageID));

	return (
		<div class="body">
			<Container>
				<div class="center">
					<AppBar />

					<hr />
					<Button href="/" variant="outlined" size="large">
						Go Back
					</Button>
					<hr />

					<h1>New EyeBook Reader</h1>
					<h2>the revolution has begun</h2>

					{/* <WebGazeContext.Consumer>
						{(value) => (
							<div>
								{"coor x: " + value.x} ||
								{"coor y: " + value.y}
							</div>
						)}
					</WebGazeContext.Consumer> */}
					{/* <Button href="/" variant="outlined" size="large">
						Go Back
					</Button> */}
					<div class= 'center'>
					<SinglePagePDFViewer pdf={stoic_book} />
					{/* <AllPagesPDFViewer pdf = {stoic_book}/> */}
					</div>
				</div>
			</Container>
		</div>
	);
}

export default MainApp;
