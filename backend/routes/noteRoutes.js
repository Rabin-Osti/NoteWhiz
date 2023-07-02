import express from "express";
import {
  getNotes,
  getNote,
  deleteNote,
  addNote,
  updateNote,
  pinNote
} from "../controllers/note.js";

const router = express.Router();

router.get("/", getNotes);

router.get("/:id", getNote);

router.delete("/:id", deleteNote);

router.put("/:id", updateNote);

router.post("/addNote", addNote);

router.put("/pin/:id", pinNote);

export default router;
