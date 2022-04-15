import React from "react";
import { WebGazeContext } from "./WebGazeContext";
import MainApp from "./Main";
import { useSelector } from "react-redux";
// import { set } from "../../features/PageID/PageIDSlice";
import Script from "react-load-script";

window.saveDataAcrossSessions = true;

// Constants for determining when to scroll up or down
var TOP_CUTOFF = window.innerHeight / 4;
var BOTTOM_CUTOFF = window.innerHeight - window.innerHeight / 4;
var LEFT_CUTOFF = window.innerWidth / 4;
var RIGHT_CUTOFF = window.innerHeight - window.innerHeight / 4;

// Constant for determining how long they need to look in order to scroll
const LOOK_DELAY = 1350;
const SIDE_LOOK_DELAY = 2000;
let lookDirection = null;
let startLookTimer = Number.POSITIVE_INFINITY;
let sideLookDirection = null;
let startSideLookTimer = Number.POSITIVE_INFINITY;

var pageID;

declare var webgazer;

class WebGazeLoader extends React.Component {
	constructor() {
		super();
		this.state = {
			context: { x: -1, y: -1 },
		};
	}

	handleScriptLoad() {
		webgazer
			.setGazeListener((data, timestamp) => {
				if (data == null) {
					return;
				}
				this.setState({ context: webgazer.util.bound(data) });
				// console.log(TOP_CUTOFF);
				// console.log(BOTTOM_CUTOFF);
				if (data.y > TOP_CUTOFF && lookDirection !== "TOP") {
					// console.log("looking at top");
					startLookTimer = timestamp;
					lookDirection = "TOP";
				} else if (data.y < BOTTOM_CUTOFF && lookDirection !== "BOTTOM") {
					// console.log("looking at bottom");
					startLookTimer = timestamp;
					lookDirection = "BOTTOM";
				}
				if (data.x < LEFT_CUTOFF && sideLookDirection !== "LEFT") {
					console.log("looking left");
					startSideLookTimer = timestamp;
					sideLookDirection = "LEFT";
				}else if (data.x > RIGHT_CUTOFF && sideLookDirection !== "RIGHT") {
					console.log("looking right");
					startSideLookTimer = timestamp;
					sideLookDirection = "RIGHT";
				}
				if (data.y >= BOTTOM_CUTOFF && data.y <= TOP_CUTOFF) {
					startLookTimer = Number.POSITIVE_INFINITY;
					lookDirection = null;
				}
				if (data.x >= LEFT_CUTOFF && data.x < RIGHT_CUTOFF) {
					startSideLookTimer = Number.POSITIVE_INFINITY;
					sideLookDirection = null;
				}

				if (startSideLookTimer + SIDE_LOOK_DELAY < timestamp) {
					if (sideLookDirection === "LEFT") {
						window.history.back();
						sideLookDirection = "RESET";
					}
					if (sideLookDirection === "RIGHT") {
						// add commands
						console.log('should click here')
						document.getElementById("nextPage").click();
						sideLookDirection = "RESET";
					}
				}

				// Looking to see if direcion is found
				if (startLookTimer + LOOK_DELAY < timestamp) {
					if (lookDirection === "TOP") {
						//controll options for each page
						if (pageID === "MainAppPage") {
						} else if (pageID === "MainMenuPage") {
						} else if (pageID === "loginPage") {
						}
						window.scrollBy({ top: 300, behavior: "smooth" });
						startLookTimer = Number.POSITIVE_INFINITY;
						lookDirection = "RESET";
					} else if (lookDirection === "BOTTOM") {
						window.scrollBy({ top: -300, behavior: "smooth" });
						startLookTimer = Number.POSITIVE_INFINITY;
						lookDirection = "RESET";
					}
				}
			})
			.begin();
	}

	handleScriptError() {
		console.log("error");
	}

	render() {
		return (
			<WebGazeContext.Provider value={this.state.context}>
				<Script
					url="https://webgazer.cs.brown.edu/webgazer.js"
					onLoad={this.handleScriptLoad.bind(this)}
					onError={this.handleScriptError.bind(this)}
				/>
				<MainApp />
			</WebGazeContext.Provider>
		);
	}
}
WebGazeLoader.contextType = WebGazeContext;

function GazeApp() {
	pageID = useSelector((state) => state.PageID.id);
	console.log("gazeApp at pageid: " + pageID );

	return (
		<div className="App">
			<WebGazeLoader />
		</div>
	);
}

export default GazeApp;
