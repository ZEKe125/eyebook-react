import React from "react";
import AppBar from "../resourses/AppBar";
import { Button, Container } from "@mui/material";
import { useDispatch } from "react-redux";
import { set } from "../../features/PageID/PageIDSlice";
import Carrusel from "./Carrusel";
import "./MainMenu.css";



export default function MainMenu() {
	var pageID = "MainMenuPage";
	const dispatch = useDispatch();
	dispatch(set(pageID));
	console.log(pageID)

	return (
		<div className="body">
			<Container>
				<div className="center">
					<AppBar />

					<hr />
					{/* <Button href="" variant="outlined" size="large">
						
						Go Back
					</Button> */}
					
					<Button
						id="main-choose-btn"						
						href="/readerApp"
						size="large"
						variant="outlined"
						sx={{
							marginY: 0,
							marginX: "25%",
							bgcolor: "background.default",
						}}>
						Choose (Focus UP)
					</Button>
					<hr/>
					<Carrusel className="center" sx={{
							marginY: 0,
							marginX: "25%",
						}} ></Carrusel>
					
				</div>
			</Container>
		</div>
	);
}
