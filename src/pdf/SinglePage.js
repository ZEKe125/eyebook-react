import React, { useState } from "react";
import { Document, Page } from "react-pdf";
// import stoic_book from "./books/stoic.pdf";
import  Button from "@mui/material/Button";
import { Container, Paper } from "@mui/material";
import './pdfView.css';

export default function SinglePage(props) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1); //setting 1 to show fisrt page

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(2);
  }

  const { pdf } = props;

  

  return (
    <>
    <Container className="center">
      <Document
        file={pdf}
        options={{ workerSrc: "/pdf.worker.js" }}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Paper elevation={12}><Page pageNumber={pageNumber} /></Paper>
        <hr/>
        <Paper elevation={12}><Page pageNumber={pageNumber + 1 } /></Paper>
      </Document>
      <div>
        <p>
          Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
        </p>
        <Button variant = "outlined" type="button" disabled={pageNumber <= 1} onClick={previousPage}>
          Previous
        </Button>
        <Button
          id = "nextPage"
          variant = "outlined"
          type="button"
          disabled={pageNumber >= numPages}
          onClick={nextPage}
        >
          Next (Focus Right)
        </Button>
      </div>
      </Container>
    </>
  );
}