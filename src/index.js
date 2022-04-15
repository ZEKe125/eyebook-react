import React from "react";
import ReactDOM from "react-dom/client";
import store from './store'
import { Provider } from 'react-redux'
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GazeApp from "./pages/readerApp/GazeApp";
import Login from "./pages/login/Login";
import MainMenu from "./pages/mainmenu/MainMenu";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<Provider store={store}>
	<BrowserRouter>
		<Routes>
			{/* add more routes */}
			<Route exact path="/" element={<App />} />
			<Route exact path="/GazeApp" element={<GazeApp />} />
			<Route exact path="/MainMenu" element={<MainMenu />} />
			<Route exact path="/login" element={<Login />} />
		</Routes>
	</BrowserRouter>
	</Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
