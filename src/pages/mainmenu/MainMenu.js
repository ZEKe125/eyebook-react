import React from "react";
import DenseAppBar from "../resourses/AppBar"
import { Button, } from "@mui/material";
import { Input } from "@mui/material";
import {  useDispatch } from "react-redux";
import { set } from "../../features/PageID/PageIDSlice";
// import { CurrentPageContext } from "../resourses/CurrentPageContext";

export default function MainMenu() {

	var pageID = 'MainMenuPage';
	const dispatch = useDispatch();
  	dispatch(set(pageID));

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
