import mongoose from "mongoose";

const noteSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Must provide a title."],
    },
    tagline: {
      type: String,
      required: [true, "Must provide a tagline."],
    },
    note: {
      type: String,
      required: [true, "Note can't be empty."],
    },
    pinned: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model("Note", noteSchema);

export default Note;
