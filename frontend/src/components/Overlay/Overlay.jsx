import React, { useEffect, useState, useRef, useContext } from "react";
import { useCallback } from "react";
import "./overlay.css";
import { RxCross1 } from "react-icons/rx";
import { useMutation } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { toast } from "react-hot-toast";
import { OverlayContext } from "../../context/overlayContext";
import { useQueryClient } from "@tanstack/react-query";
function Overlay({ mode, noteToEdit }) {
  const [data, setData] = useState({ title: "", tagline: "", note: "" });
  const overlayRef = useRef();
  const [error, setError] = useState(false);
  const { setOverlay } = useContext(OverlayContext);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (mode === "edit" && noteToEdit) {
      setData(noteToEdit);
    }
  }, [mode, noteToEdit]);

  const handleInput = (key, value) => {
    setData((prev) => {
      return { ...prev, [key]: value };
    });
  };
  const keyPress = useCallback((e) => {
    if (e.key === "Escape") {
      setOverlay((prev) => ({ ...prev, show: false }));
    }
  });
  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  const mutation = useMutation({
    mutationFn: (newNote) => {
      if (mode === "add") {
        return newRequest.post("/addNote", newNote);
      } else {
        return newRequest.put(`/${noteToEdit._id}`, newNote);
      }
    },
    onSuccess: () => {
      setOverlay((prev) => ({ ...prev, show: false }));
      queryClient.invalidateQueries({ queryKey: ["notes"] });

      if (mode === "add") {
        toast.success("Note Added!", { style: { fontSize: "1.6rem" } });
      } else {
        toast.success("Note Updated!", { style: { fontSize: "1.6rem" } });
      }
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.note.length && data.tagline.length && data.title.length) {
      setError(false);
      mutation.mutate(data);
    } else {
      setError(true);
    }
  };

  const closeModal = (e) => {
    if (e.target === overlayRef.current) {
      setOverlay((prev) => ({ ...prev, show: false }));
    }
  };

  return (
    <div className="container" ref={overlayRef} onClick={(e) => closeModal(e)} data-testid="overlay-outer">
      <form onSubmit={handleSubmit}>
        <div className="overlay-inner">
          <div className="overlay-top">
            {mode && <h3>{mode === "add" ? "Add Note" : "Edit Note"}</h3>}

            <div className="icon-wrapper">
              <RxCross1
                className="overlay-icon"
                onClick={() => setOverlay((prev) => ({ ...prev, show: false }))}
              />
            </div>
          </div>
          <div className="input-wrapper">
            <div className="input-field">
              <input
                type="text"
                value={data.title}
                data-testid="title-field"
                onChange={(e) => handleInput("title", e.target.value)}
              />
              <label className={data.title ? "active" : ""}>Title</label>
            </div>
            {error
              ? data.title.length == 0 && (
                  <span className="message">Must provide a title.</span>
                )
              : ""}
          </div>
          <div className="input-wrapper">
            <div className="input-field">
              <input
                type="text"
                data-testid="tagline-field"
                value={data.tagline}
                onChange={(e) => handleInput("tagline", e.target.value)}
              />

              <label className={data.tagline ? "active" : ""}>Tagline</label>
            </div>
            {error
              ? data.tagline.length == 0 && (
                  <span className="message">Must provide a tagline.</span>
                )
              : ""}
          </div>
          <div className="input-wrapper">
            <div className="input-field">
              <textarea
                rows={7}
                placeholder="Enter your note"
                data-testid="note-field"
                value={data.note}
                onChange={(e) => handleInput("note", e.target.value)}
              />
            </div>
            {error
              ? data.note.length == 0 && (
                  <span className="message">Must provide a note.</span>
                )
              : ""}
          </div>
          {mutation.isError && (
            <span className="message">
              {mode === "add"
                ? "Couldn't add note. "
                : "Couldn't update note. "}{" "}
              Please try again later.
            </span>
          )}
          <button className="primary-btn change-btn" data-testid="action-btn">
            {mode === "add" ? "Add Note" : "Update Note"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Overlay;
