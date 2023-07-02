import React, { useState, useEffect } from "react";
import "./addnote.css";

function AddNote() {
  const [data, setData] = useState({
    title: "",
    tagline: "",
    note: "",
  });
  const [error, setError] = useState(false);

  const handleInput = (key, value) => {
    setData((prev) => {
      return { ...prev, [key]: value };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.note.length && data.tagline.length && data.title.length) {
      setError(false);
    } else {
      setError(true);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="container">
        <input
          type="text"
          placeholder="Enter your title"
          className="title"
          value={data.title}
          onChange={(e) => handleInput("title", e.target.value)}
        />
        {error
          ? data.title.length == 0 && (
              <span className="message">Must provide a title.</span>
            )
          : ""}

        <input
          type="text"
          placeholder="Tagline"
          className="tagline"
          value={data.tagline}
          onChange={(e) => handleInput("tagline", e.target.value)}
        />
        {error
          ? data.tagline.length == 0 && (
              <span className="message">Must provide a tagline.</span>
            )
          : ""}
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          placeholder="Enter your note"
          className="note"
          value={data.note}
          onChange={(e) => handleInput("note", e.target.value)}
        ></textarea>
        {error
          ? data.note.length == 0 && (
              <span className="message">Must provide a note.</span>
            )
          : ""}

        <button className="primary-btn">Add Note</button>
      </div>
    </form>
  );
}

export default AddNote;
