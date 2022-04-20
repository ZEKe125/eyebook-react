import React, { useState } from "react";
import "./Main.css";
import Button from "@mui/material/Button";
import SinglePagePDFViewer from "../../pdf/SinglePage";
import stoic from "../../library/stoic.pdf";
import alice from "../../library/alice.pdf";
import illiad from "../../library/illiad.pdf";
import pride from "../../library/pride.pdf";
import twocities from "../../library/twocities.pdf";

import Container from "@mui/material/Container";
import { useDispatch } from "react-redux";
import { set } from "../../features/PageID/PageIDSlice";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const pageID = "readerAppPage";
var bookValue = -1;
var bookTitle;


const book = [stoic, alice, illiad, pride, twocities];
function selectTitle(){
	if(bookValue === 0 ){
		bookTitle ="The Daily Stoic"
	}
	if(bookValue === 1 ){
		bookTitle ="Alice in Wonderland"
	}
	if(bookValue === 2 ){
		bookTitle ="The Illiad"
	}
	if(bookValue === 3 ){
		bookTitle = "Pride and Prejudice"
	}
	if(bookValue === 4 ){
		bookTitle ="A Tale of Two Cities"
	}
}


function ReaderApp() {
	const dispatch = useDispatch();
	dispatch(set(pageID));
	// console.log(pageID);
	bookValue = useSelector((state) => state.ChooseBook.value);
	// console.log(`bookValue is:  ${bookValue}`)
	selectTitle();
	
	return (
		<div className="body">
			<Container>
				<div className="center">
					<hr />
					<Link to="/MainMenu" style={{ textDecoration: "none" }}>
						<Button id="readerBack" variant="outlined" size="large">
							Go Back (Focus Left)
						</Button>
					</Link>
					<hr />

					<h1>New EyeBook Reader</h1>
					<h2>TITLE: {bookTitle}</h2>

					<div className="center">
						<SinglePagePDFViewer pdf={book[bookValue]} />
						{/* <AllPagesPDFViewer pdf = {stoic_book}/> */}
					</div>
				</div>
			</Container>
		</div>
	);
}

export default ReaderApp;
