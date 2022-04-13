import React from "react";
import { WebGazeContext } from "./WebGazeContext";
import MainApp from "./Main";

import "./App.css";
import Script from "react-load-script";

window.saveDataAcrossSessions = true;

// Constants for determining when to scroll up or down
const TOP_CUTOFF = window.innerHeight / 3;
const BOTTOM_CUTOFF = window.innerHeight / 3;

// Constant for determining how long they need to look in order to scroll
const LOOK_DELAY = 1350;
let lookDirection = null;
let startLookTimer = Number.POSITIVE_INFINITY;

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
				console.log(TOP_CUTOFF);
				console.log(BOTTOM_CUTOFF);
				if (data.y > TOP_CUTOFF && lookDirection !== "TOP") {
					startLookTimer = timestamp;
					lookDirection = "TOP";
				} else if (data.y < BOTTOM_CUTOFF && lookDirection !== "BOTTOM") {
					startLookTimer = timestamp;
					lookDirection = "BOTTOM";
				} else if (data.y >= BOTTOM_CUTOFF && data.y <= TOP_CUTOFF) {
					startLookTimer = Number.POSITIVE_INFINITY;
					lookDirection = null;
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
