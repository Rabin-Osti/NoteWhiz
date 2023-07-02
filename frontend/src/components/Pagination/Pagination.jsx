import React from "react";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import "./pagination.css";

function Pagination({ totalPage, pageNumber, setPageNumber }) {
  const handlePageNumber = (direction) => {
    if (direction === "left" && pageNumber > 1) {
      setPageNumber((prev) => prev - 1);
    }
    if (direction === "right" && pageNumber < totalPage) {
      setPageNumber((prev) => prev + 1);
    }
  };
  return (
    <div className="pagination">
      <AiOutlineArrowLeft
        className="pag-icon"
        onClick={() => handlePageNumber("left")}
      />

      {[...Array(totalPage)].map((ind, index) => (
        <div
          className="numberButton"
          onClick={() => setPageNumber(index + 1)}
          key={index}
        >
          <span
            className={`${
              index + 1 === Number(pageNumber) ? "pag-change" : "pag-outer"
            }`}
          >
            {index + 1}
          </span>
        </div>
      ))}
      <AiOutlineArrowRight
        className="pag-icon"
        onClick={() => handlePageNumber("right")}
      />
    </div>
  );
}

export default Pagination;
