import React, { useState, useEffect } from "react";
import "./cards.css";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import Pagination from "../Pagination/Pagination";
import Card from "../Card/Card";
import CardsLoading from "../CardsLoading/CardsLoading";
function Cards() {
  const [pageNumber, setPageNumber] = useState(1);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pageNumber]);
  const colors = [
    "rgba(232, 28, 76, 0.70)",
    "rgba(232, 28, 175, 0.70)",
    "rgba(28, 85, 232, 0.70)",
    "rgba(118, 28, 232, 0.70)",
    "rgba(255, 0, 0, 0.70)",
    "rgba(255, 61, 0, 0.70)",
  ];

  const { isLoading, isError, data } = useQuery({
    queryKey: ["notes", pageNumber],
    queryFn: async () => {
      const data = await newRequest.get(`/?pageNumber=${pageNumber}`);
      return data.data;
    },
  });

  if (isLoading) return <CardsLoading />;
  if (isError)
    return (
      <div className="error-screen">
        <img
          src="/images/error-compressed.png"
          alt="error"
          className="error-image"
        />
      </div>
    );
  return (
    <div className="cards-wrapper" data-testid="cards-container">
      <div className="cards">
        {data.notes.map((note, index) => {
          return (
            <Card {...note} key={note._id} color={colors[index]} pageNumber />
          );
        })}
      </div>
      {data.totalPage > 1 && (
        <Pagination
          totalPage={data.totalPage}
          setPageNumber={setPageNumber}
          pageNumber={pageNumber}
        />
      )}
    </div>
  );
}

export default Cards;
