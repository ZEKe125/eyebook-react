import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GazeApp from "./GazeApp";
import Login from "./Login";
import MainMenu from "./MainMenu";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<BrowserRouter>
		<Routes>
			{/* add more routes */}
			<Route exact path="/" element={<App />} />
			<Route exact path="/GazeApp" element={<GazeApp />} />
			<Route exact path="/MainMenu" element={<MainMenu />} />
			<Route exact path="/login" element={<Login />} />
		</Routes>
	</BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
