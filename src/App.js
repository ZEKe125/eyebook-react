import "./App.css";
import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {  set } from "./features/PageID/PageIDSlice";

var pageID = 'appPage';

function App() {
	// pageID = useSelector((state) => state.PageID.id);
	const dispatch = useDispatch();
  	dispatch(set(pageID))

	return (
		<div className="App">
			<h1>Gazer Project - Debug</h1>
			<p>User should not be able to see this page!</p>
			<nav
				style={{
					borderBottom: "solid 1px",
					paddingBottom: "1rem",
				}}>
				<Link to="/login">Login</Link> | <Link to="/MainMenu">Main-Menu</Link> |{" "}
				<Link to="/GazeApp">GazeApp</Link>
			</nav>
			{/* <div>
				<div>
					<button
						aria-label="Increment value"
						onClick={() => dispatch(increment())}>
						Increment
					</button>
					<span>| |  pageID : {pageID} | |</span>
					<button
						aria-label="Decrement value"
						onClick={() => dispatch(decrement())}>
						Decrement
					</button>
				</div>
			</div> */}
		</div>
	);
}

export default App;
