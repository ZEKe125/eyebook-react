import React from "react";
import { WebGazeContext } from "./WebGazeContext";
import "./Main.css";
import Book from "./book";
import  Button  from "@mui/material/Button";

function MainApp() {
	return (
		<div id="container">
			<h1>New EyeBook Reader</h1>
			<h2>the revolution has begun</h2>
			<WebGazeContext.Consumer>
				{(value) => (
					<div>
						{value.x} {value.y}
					</div>
				)}
			</WebGazeContext.Consumer>
			<Button href="/" variant="outlined" size="large">
				Go Back
			</Button>
			<Book />
		</div>
	);
}

export default MainApp;
