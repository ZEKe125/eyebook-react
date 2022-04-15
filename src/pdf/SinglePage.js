import React, { useState } from "react";
import { Document, Page } from "react-pdf";
// import stoic_book from "./books/stoic.pdf";
import  Button from "@mui/material/Button";

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
      <Document
        file={pdf}
        options={{ workerSrc: "/pdf.worker.js" }}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
        <Page pageNumber={pageNumber+1} />
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
    </>
  );
}