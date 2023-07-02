import React from "react";
import "./cardsLoading.css";

function CardsLoading() {
  const renderComponents = () => {
    const components = [];
    for (let i = 0; i < 6; i++) {
      components.push(<div className="grid-item loading-effect" key={i}></div>);
    }
    return components;
  };
  return <div className="grid">{renderComponents()}</div>;
}

export default CardsLoading;
