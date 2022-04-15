import React from "react";
import AppBar from "../resourses/AppBar";
import { Button, Box, Container } from "@mui/material";
// import { Input } from "@mui/material";
import { useDispatch } from "react-redux";
import { set } from "../../features/PageID/PageIDSlice";
import Carrusel from "./Carrusel";
import Typography from "@mui/material/Typography";
import "./MainMenu.css";

export default function MainMenu() {
	var pageID = "MainMenuPage";
	const dispatch = useDispatch();
	dispatch(set(pageID));

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
					<Button
						size="large"
						variant="outlined"
						sx={{
							marginY: 2,
							marginX: "25%",
							bgcolor: "background.default",
						}}>
						Look Down to Choose
					</Button>
					<Carrusel />
					
				</div>
			</Container>
		</div>
	);
}
