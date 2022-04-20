import React ,{useEffect}from "react";
import { Button, Container } from "@mui/material";
import { useDispatch } from "react-redux";
import { set } from "../../features/PageID/PageIDSlice";
import Carrusel from "./Carrusel";
import "./MainMenu.css";
import { Link } from "react-router-dom";
import {set as reset} from "../../features/ChooseBook/ChooseBookSlice";




export default function MainMenu() {
	var pageID = "MainMenuPage";
	const dispatch = useDispatch();
	dispatch(set(pageID));
	// console.log(pageID);
	

	useEffect(() => {
		dispatch(reset(0));
		
	 
	}, [])


	return (
		<div className="body">
			<Container>
				<div className="center">
					<hr />

					<Link to="/readerApp" style={{ textDecoration: 'none' }}>
						<Button
							id="main-choose-btn"
							// href="/readerApp"
							size="large"
							variant="outlined"
							sx={{
								marginY: 0,
								marginX: "25%",
								bgcolor: "background.default",
							}}>
							Choose (Focus UP)
						</Button>
					</Link>
					<hr />
					<Carrusel
						className="center"
						sx={{
							marginY: 0,
							marginX: "25%",
						}}></Carrusel>
				</div>
			</Container>
		</div>
	);
}
