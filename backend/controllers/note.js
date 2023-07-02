import Note from "../models/noteModel.js";
import { createError } from "../utils/error.js";

export const getNotes = async (req, res, next) => {
  try {
    const { pageNumber } = req.query;
    const pageSize = 6;
    const page = Number(pageNumber) || 1;
    const count = await Note.countDocuments({});
    const pinnedNote = await Note.findOne({ pinned: true });
    if (pinnedNote) {
      const notes = await Note.find({ pinned: { $ne: true } })
        .limit(pageSize - 1)
        .skip(pageSize * (page - 1));
      const combinedNote = [pinnedNote, ...notes];
      return res.json({
        notes: combinedNote,
        totalPage: Math.ceil(count / pageSize),
      });
    } else {
      const notes = await Note.find({})
        .limit(pageSize)
        .skip(pageSize * (page - 1));
      return res.json({ notes, totalPage: Math.ceil(count / pageSize) });
    }
  } catch (error) {
    next(error);
  }
};

export const getNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const note = await Note.findById(id);
    if (!note) return next(createError(404, "Note not found."));
    return res.json(note);
  } catch (error) {
    next(error);
  }
};

export const deleteNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const note = await Note.findById(id);
    if (!note) return next(createError(404, "Note not found!"));
    await Note.findByIdAndDelete(id);
    res.json({ message: "Note Removed" });
  } catch (error) {
    next(error);
  }
};

export const updateNote = async (req, res, next) => {
  try {
    const { title, tagline, note: text } = req.body;
    const note = await Note.findById(req.params.id);
    if (!note) return next(createError(404, "Note not found!"));
    note.title = title || note.title;
    note.tagline = tagline || note.tagline;
    note.note = text || note.note;
    await note.save();
    res.status(201).send("Note updated successfully");
  } catch (error) {
    next(error);
  }
};

export const addNote = async (req, res, next) => {
  try {
    const { title, tagline, note } = req.body;
    if (!title || !tagline || !note)
      return next(createError(404, "Please provide all the values."));
    await Note.create({ title, tagline, note });
    res.status(201).json({ status: "success" });
  } catch (error) {
    next(error);
  }
};

export const pinNote = async (req, res, next) => {
  try {
    const previouslyPinned = await Note.findOne({ pinned: true });
    const note = await Note.findById(req.params.id);
    if (!note) return next(createError(404, "Note not found."));
    if (previouslyPinned) {
      if (previouslyPinned._id !== note._id) {
        previouslyPinned.pinned = false;
        await previouslyPinned.save();
      }
    }

    note.pinned = !note.pinned;
    await note.save();

    res.status(200).send("Pin toggled successfully.");
  } catch (error) {
    next(error);
  }
};
