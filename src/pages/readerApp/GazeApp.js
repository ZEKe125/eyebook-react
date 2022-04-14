import React from "react";
import { WebGazeContext } from "./WebGazeContext";
import MainApp from "./Main";

// import "./App.css";
import Script from "react-load-script";

window.saveDataAcrossSessions = true;

// Constants for determining when to scroll up or down
const TOP_CUTOFF = window.innerHeight / 4;
const BOTTOM_CUTOFF = window.innerHeight - window.innerHeight / 4;
const LEFT_CUTOFF = window.innerWidth / 4;
const RiGHT_CUTOFF = window.innerHeight - window.innerHeight / 4;

// Constant for determining how long they need to look in order to scroll
const LOOK_DELAY = 1350;
const BACK_LOOK_DELAY = 2000;
let lookDirection = null;
let startLookTimer = Number.POSITIVE_INFINITY;
let sideLookDirection = null;
let startSideLookTimer = Number.POSITIVE_INFINITY;



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
					console.log("top");
					startLookTimer = timestamp;
					lookDirection = "TOP";
				} else if (data.y < BOTTOM_CUTOFF && lookDirection !== "BOTTOM") {
					console.log("bottom");
					startLookTimer = timestamp;
					lookDirection = "BOTTOM";
				}else if(data.x < LEFT_CUTOFF && sideLookDirection !== "LEFT"){
						console.log("left");
						startSideLookTimer = timestamp;
						sideLookDirection = "LEFT";
				} else if (data.y >= BOTTOM_CUTOFF && data.y <= TOP_CUTOFF) {
					startLookTimer = Number.POSITIVE_INFINITY;
					lookDirection = null;
				}else if (data.x >= LEFT_CUTOFF ) {
					startSideLookTimer = Number.POSITIVE_INFINITY;
					sideLookDirection = null;
				}

				if (startSideLookTimer + BACK_LOOK_DELAY < timestamp) {
					if (sideLookDirection === "LEFT") {
						window.history.back();
						sideLookDirection = "RESET";

					}
				}

				// Looking to see if direcion is found
				if (startLookTimer + LOOK_DELAY < timestamp) {
					if (lookDirection === "TOP") {
						window.scrollBy({ top: 300, behavior: "smooth" });
						startLookTimer = Number.POSITIVE_INFINITY;
						lookDirection = null;
					} else if (lookDirection === "BOTTOM") {
						window.scrollBy({ top: -300, behavior: "smooth" });
						startLookTimer = Number.POSITIVE_INFINITY;
						lookDirection = null;
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
	return (
		<div className="App">
			<WebGazeLoader />
		</div>
	);
}

export default GazeApp;
