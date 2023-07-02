import React, { useContext } from "react";
import "./header.css";
import { OverlayContext } from "../../context/overlayContext";

function Header() {
  const { setOverlay } = useContext(OverlayContext);
  return (
    <div className="header">
      <img src="/images/logo.png" alt="logo" className="logo" />
      <button
        className="primary-btn"
        onClick={() => setOverlay((prev) => ({ ...prev,mode:"add", show: true }))}
      >
        Add New Note
      </button>
    </div>
  );
}

export default Header;
