import React from "react";
import "./Main.css";
import Button from "@mui/material/Button";
import SinglePagePDFViewer from "../../pdf/SinglePage";
import books from "../../library/alice.pdf"
import Container from "@mui/material/Container";
import { useDispatch } from "react-redux";
import { set } from "../../features/PageID/PageIDSlice";
import AppBar from "../resourses/AppBar";


const thisPageID = "readerAppPage";



function ReaderApp({ book_name = 'alice' }) {
	const dispatch = useDispatch();
	dispatch(set(thisPageID));
	console.log(thisPageID);


	//  async import (`../../../public/library/${book_name}.pdf`)
	//  const book = lazy(() => import(`../../../public/library/${book_name}.pdf`));

	return (
		<div className="body">
			<Container>
				<div className="center">
					<AppBar />

					<hr />
					<Button href="/MainMenu" variant="outlined" size="large">
						Go Back (Focus Left)
					</Button>
					<hr />

					<h1>New EyeBook Reader</h1>
					<h2>the revolution has begun</h2>

					<div className="center">
						<SinglePagePDFViewer pdf={books} />
						{/* <AllPagesPDFViewer pdf = {stoic_book}/> */}
					</div>
				</div>
			</Container>
		</div>
	);
}

export default ReaderApp;
