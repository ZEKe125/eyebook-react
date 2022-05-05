import "./App.css";
import React, { useEffect } from "react";
import ApplicationBar from "./pages/resourses/AppBar";
import { useSelector } from "react-redux";
import Container from "@mui/material/Container";
import "./App.css";

// Constants for determining when to scroll up or down
var TOP_CUTOFF = window.innerHeight / 5;
var BOTTOM_CUTOFF = window.innerHeight - window.innerHeight / 5;
var LEFT_CUTOFF = window.innerWidth / 5;
var RIGHT_CUTOFF = window.innerHeight - window.innerHeight / 5;

// Constant for determining how long they need to look in order to scroll
const LOOK_DELAY = 1350;
const SIDE_LOOK_DELAY = 2000;
let lookDirection = null;
let startLookTimer = Number.POSITIVE_INFINITY;
let sideLookDirection = null;
let startSideLookTimer = Number.POSITIVE_INFINITY;

//page where user is
var pageID;
// const nextPage = document.getElementById("nextPage").click();
// Promise.all
// "MainMenuPage";
// 'loginPage';
// "readerAppPage";

function App() {
	//
	pageID = useSelector((state) => state.PageID.id);

	useEffect(() => {
		const webgazer = window.webgazer;
		webgazer
			.setGazeListener((data, timestamp) => {
				// console.log('data.x = ' + data.x)
				// console.log('data.y = ' + data.y)
				// console.log(pageID)

				if (data == null) {
					return;
				}

				if (data.y < TOP_CUTOFF && lookDirection !== "TOP") {
					// console.log("looking at top");
					startLookTimer = timestamp;
					lookDirection = "TOP";
				} else if (data.y > BOTTOM_CUTOFF && lookDirection !== "BOTTOM") {
					// console.log("looking at bottom");
					startLookTimer = timestamp;
					lookDirection = "BOTTOM";
				}
				if (data.x < LEFT_CUTOFF && sideLookDirection !== "LEFT") {
					// console.log("left");
					startSideLookTimer = timestamp;
					sideLookDirection = "LEFT";
				} else if (data.x > RIGHT_CUTOFF && sideLookDirection !== "RIGHT") {
					// console.log("right");
					startSideLookTimer = timestamp;
					sideLookDirection = "RIGHT";
				}

				// GAZE RESETS
				if (data.y <= BOTTOM_CUTOFF && lookDirection === "BOTTOM") {
					startLookTimer = Number.POSITIVE_INFINITY;
					lookDirection = null;
					console.log("reset1");
				}
				if (data.y >= TOP_CUTOFF && lookDirection === "TOP") {
					startLookTimer = Number.POSITIVE_INFINITY;
					lookDirection = null;
					console.log("reset2");
				}

				if (data.x >= LEFT_CUTOFF && sideLookDirection === "LEFT") {
					startSideLookTimer = Number.POSITIVE_INFINITY;
					sideLookDirection = null;
					console.log("reset3");
				}
				if (data.x < RIGHT_CUTOFF && sideLookDirection === "RIGHT") {
					startSideLookTimer = Number.POSITIVE_INFINITY;
					sideLookDirection = null;
					console.log("reset4");
				}

				// COMMANDS FOR EACH PAGE
				if (startSideLookTimer + SIDE_LOOK_DELAY < timestamp) {
					if (sideLookDirection === "LEFT") {
						console.log("left");

						if (pageID === "MainMenuPage") {
							// toggle PREV book button
							document.getElementById("backBook").click();
						} else {
							if (pageID === "readerAppPage") {
								// CLICK BACK button
								document.getElementById("readerBack").click();
							} else {
								window.history.back();
							}
						}
						// window.history.back();
						sideLookDirection = "RESET";
						startSideLookTimer = Number.POSITIVE_INFINITY;
					}
					if (sideLookDirection === "RIGHT") {
						// add commands
						console.log("right");
						//controll options for each page
						if (pageID === "readerAppPage") {
							document.getElementById("nextPage").click();
						} else if (pageID === "MainMenuPage") {
							// toggle next book button
							document.getElementById("nextBook").click();
						} else if (pageID === "loginPage") {
							document.getElementById("login-btn").click();
							// nothing
						}

						startSideLookTimer = Number.POSITIVE_INFINITY;
						sideLookDirection = "RESET";
					}
				}

				// Looking to see if direcion is found
				if (startLookTimer + LOOK_DELAY < timestamp) {
					if (lookDirection === "TOP") {
						console.log("top");

						//controll options for each page
						if (pageID === "readerAppPage") {
							window.scrollBy({ top: -300, behavior: "smooth" });
						} else if (pageID === "MainMenuPage") {
							document.getElementById("main-choose-btn").click();
						} else if (pageID === "loginPage") {
							// nothing
						}

						// window.scrollBy({ top: -300, behavior: "smooth" });

						startLookTimer = Number.POSITIVE_INFINITY;
						lookDirection = "RESET";
					} else if (lookDirection === "BOTTOM") {
						console.log("bottom");

						//controll options for each page
						if (pageID === "readerAppPage") {
							window.scrollBy({ top: 300, behavior: "smooth" });
						} else if (pageID === "MainMenuPage") {
						} else if (pageID === "loginPage") {
							// nothing
						}

						// window.scrollBy({ top: 300, behavior: "smooth" });
						startLookTimer = Number.POSITIVE_INFINITY;
						lookDirection = "RESET";
					}
				}
			})
			.begin();
	}, []);

	return (
		<div className="body">
			<Container>
				<div className="center">
					<ApplicationBar currentPage={`${pageID} `} />
				</div>
			</Container>
		</div>
	);
}

export default App;
