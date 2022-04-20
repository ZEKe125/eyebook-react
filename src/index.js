import React from "react";
import ReactDOM from "react-dom/client";
import store from './store'
import { Provider } from 'react-redux'
import "./index.css";
import App from "./App";


import { BrowserRouter, Routes, Route,  } from "react-router-dom";
// import GazeApp from "./pages/readerApp/GazeApp";
import Login from "./pages/login/Login";
import MainMenu from "./pages/mainmenu/MainMenu";
import ReaderApp from "./pages/readerApp/ReaderApp";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<Provider store={store}>
	<BrowserRouter>
		<App/>
		<Routes>
			{/* add more routes */}
			<Route exact path="/" element={<Login />}  >
		
			</Route>
			
			<Route exact path="/readerApp" element={<ReaderApp/>} />
			<Route exact path="/MainMenu" element={<MainMenu />} />
			<Route exact path="/login" element={<Login />} />
		</Routes>
	</BrowserRouter>
	</Provider>
);

