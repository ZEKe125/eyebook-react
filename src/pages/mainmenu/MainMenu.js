import React from "react";
import DenseAppBar from "../resourses/AppBar"
import { Button, } from "@mui/material";
import { Input } from "@mui/material";
// import { CurrentPageContext } from "../resourses/CurrentPageContext";

export default function MainMenu() {

	const page = 'mainmenu';
	console.log(page);

	return (
		<>
			<DenseAppBar />
	
			<hr />
			<Button href="/" variant="outlined" size="large">
				Go Back
			</Button>
            <hr />
			<label htmlFor="contained-button-file">
				<Input
					accept="image/*"
					id="contained-button-file"
					multiple
					type="file"
				/>
				<Button variant="contained" component="span">
					Upload
				</Button>
			</label>
		</>
	);
}
