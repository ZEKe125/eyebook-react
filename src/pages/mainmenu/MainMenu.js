import React from "react";
import DenseAppBar from "../resourses/AppBar"
import { Button, } from "@mui/material";
import { Input } from "@mui/material";

export default function MainMenu() {
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
