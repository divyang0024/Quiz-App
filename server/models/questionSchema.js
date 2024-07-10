import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  question: {
    type: String,
    default: "",
  },
  options: {
    type: Array,
    default: [],
  },
  answer: {
    type: String,
    default: "",
  },
  createdAt: { type: Date, default: Date.now },
});

questionSchema.set("versionKey", false);

export const Questions = mongoose.model("Question", questionSchema);
