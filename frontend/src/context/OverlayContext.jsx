import React, { createContext, useState } from "react";
import Overlay from "../components/Overlay/Overlay";

export const OverlayContext = createContext();

export const OverlayContextProvider = ({ children }) =>{
  const [overlay, setOverlay] = useState({ show: false, mode: "add" });
  const [noteToEdit,setNoteToEdit] = useState("")
  return (
    <OverlayContext.Provider value={{ setOverlay,setNoteToEdit }}>
      {overlay.show && <Overlay mode={overlay.mode} noteToEdit={noteToEdit}/>}
      {children}
    </OverlayContext.Provider>
  );
}
