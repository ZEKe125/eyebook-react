import React from "react";
import { WebGazeContext } from "./WebGazeContext";
import MainApp from "./Main";
// import { useHistory } from 'react-router-dom';

import "./App.css";
import Script from "react-load-script";

window.saveDataAcrossSessions = true;

// Constants for determining when to scroll up or down
const TOP_CUTOFF = window.innerHeight - window.innerHeight / 4;
const BOTTOM_CUTOFF = window.innerHeight / 4;
const LEFT_CUTOFF = window.innerWidth / 4;
const RIGHT_CUTOFF = window.innerWidth - window.innerWidth / 4;

// Constant for determining how long they need to look in order to scroll
const LOOK_DELAY = 1350;
let lookDirection = null;
let startLookTimer = Number.POSITIVE_INFINITY;
let startLookTimer2 = Number.POSITIVE_INFINITY;
let lookDirection2 = null;

function openFile() {
	const framebook = document.querySelector("iframe");
	const filebook = document.querySelector("input[type=file]").files[0];
	const reader = new FileReader();

	reader.addEventListener(
		"load",
		function () {
			framebook.src = reader.result;
		},
		false
	);

	if (filebook) {
		reader.readAsDataURL(filebook);
	}
}

// var btn = document.getElementById("main");
// // const BUTTON_CUTOFF = btn.style.width;

// // function goBack(data, timestamp) {
// //   // Function for going back up to the top of the screen when looking at the button
// //   if (data.y == BUTTON_CUTOFF && lookDirection !== "BUTTON") {
// //     startLookTimer = timestamp;
// //     lookDirection = "BUTTON";
// //   }
// //   if (startLookTimer + LOOK_DELAY < timestamp) {
// //     if (lookDirection === "BUTTON") {
// //       window.scrollTo(0, 0, { behavior: "smooth" });
// //       startLookTimer = Number.POSITIVE_INFINITY;
// //       lookDirection = null;
// //     }
// //   }
// // }

declare var webgazer;

const cutoffs = [
	{ top: TOP_CUTOFF },
	{ bottom: BOTTOM_CUTOFF },
	{ left: LEFT_CUTOFF },
	{ right: RIGHT_CUTOFF },
];
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
				// console.log(cutoffs);

				if (data.y > TOP_CUTOFF && lookDirection !== "TOP") {
					startLookTimer = timestamp;
					lookDirection = "TOP";
				} else if (data.y < BOTTOM_CUTOFF && lookDirection !== "BOTTOM") {
					startLookTimer = timestamp;
					lookDirection = "BOTTOM";
				} else if (
					data.y >= BOTTOM_CUTOFF &&
					data.y <= TOP_CUTOFF
					//  || (data.x >= LEFT_CUTOFF && data.x <= RIGHT_CUTOFF)
				) {
					startLookTimer = Number.POSITIVE_INFINITY;
					lookDirection = null;
				}

				// Looking to see if direcion is found
				if (startLookTimer + LOOK_DELAY < timestamp) {
					if (lookDirection === "TOP") {
						console.log("scrolling up");
						window.scrollBy({ top: 300, behavior: "smooth" });
						startLookTimer = Number.POSITIVE_INFINITY;
						lookDirection = null;
					} else if (lookDirection === "BOTTOM") {
						console.log("scrolling down");
						window.scrollBy({ top: -300, behavior: "smooth" });
						startLookTimer = Number.POSITIVE_INFINITY;
						lookDirection = null;
					}
				}
			})
			.begin();

		webgazer.showVideoPreview(true).showPredictionPoints(true);
	}

	handleScriptLoad2() {
		webgazer
			.setGazeListener((data, timestamp) => {
				if (data == null) {
					return;
				} else if (
					data.x < LEFT_CUTOFF &&
					lookDirection2 !== "LEFT" &&
					lookDirection2 !== "RESET"
				) {
					console.log('looking left');
					startLookTimer2 = timestamp;
					lookDirection2 = "LEFT";
				} else if (
					data.x > RIGHT_CUTOFF &&
					lookDirection2 !== "RIGHT" &&
					lookDirection2 !== "RESET"
				) {
					startLookTimer2 = timestamp;
					lookDirection2 = "RIGHT";
				} else if (data.x >= LEFT_CUTOFF && data.x <= RIGHT_CUTOFF) {
					startLookTimer2 = Number.POSITIVE_INFINITY;
					lookDirection2 = null;
				}

				if (startLookTimer2 + LOOK_DELAY < timestamp) {
					if (lookDirection === "LEFT") {
						window.history.back();
					} else if (lookDirection === "RIGHT") {
					}
				}

				startLookTimer2 = Number.POSITIVE_INFINITY
				lookDirection2 = "RESET"
				
			})
			.begin();
			webgazer.showVideoPreview(false).showPredictionPoints(true);
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
					onLoad={this.handleScriptLoad2.bind(this)}
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
