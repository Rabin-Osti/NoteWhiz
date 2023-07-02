import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Cards from "./components/Cards/Cards";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer/Footer";
function App() {
  return (
    <div className="wrapper">
      <Header />
      <Toaster />
      <Cards />
      <Footer />
    </div>
  );
}

export default App;
