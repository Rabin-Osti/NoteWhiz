import React, { useState, useContext, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { MdDelete } from "react-icons/md";
import { AiFillStar } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import "./card.css";
import toast from "react-hot-toast";
import { OverlayContext } from "../../context/overlayContext";

function Card({ _id, title, note, tagline, color, pinned }) {
  const queryClient = useQueryClient();
  const { setOverlay, setNoteToEdit } = useContext(OverlayContext);
  const [isHovered, setIsHovered] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 700);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast.success("Note deleted!", { style: { fontSize: "1.6rem" } });
    },
  });

  const pinMutation = useMutation({
    mutationFn: (id) => {
      return newRequest.put(`/pin/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast.success(`${pinned ? "Pin removed" : "Note pinned!"}`, {
        style: { fontSize: "1.6rem" },
      });
    },
    onError: () => {
      toast.success("Pin couldn't beupdated!", {
        style: { fontSize: "1.6rem" },
      });
    },
  });

  const handleEdit = () => {
    setNoteToEdit({ _id, title, tagline, note });
    setOverlay((prev) => ({ ...prev, show: true, mode: "edit" }));
  };

  return (
    <div
      onClick={() => handleEdit(_id)}
      className="card"
      style={{ backgroundColor: color }}
      onMouseEnter={() => setIsHovered(!isHovered)}
      onMouseLeave={() => setIsHovered(!isHovered)}
    >
      <div className="card-top">
        <h2 className="card-title">{title}</h2>
        <div className="card-tagline">
          <h3 style={{ color }}>{tagline.toUpperCase()}</h3>
        </div>
      </div>
      <div className="card-middle">
    
        <span className="card-note">{note}</span>
      </div>
      <AiFillStar
        className={`pin ${pinned ? "pin-active" : ""}`}
        onClick={(e) => {
          e.stopPropagation();
          pinMutation.mutate(_id);
        }}
      />
      <div
        className={`card-bottom ${
          isHovered || isSmallScreen ? "card-show" : "card-hide"
        }`}
      >
        <BiEdit
          className="card-icon"
          onClick={(e) =>
            {
            e.stopPropagation();

            handleEdit(_id)
            }
          }
        />
        <MdDelete className="card-icon" onClick={(e) => 
          {
            e.stopPropagation();

            mutation.mutate(_id)
        }} />
      </div>
    </div>
  );
}

export default Card;
