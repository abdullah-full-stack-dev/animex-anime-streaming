import mongoose from "mongoose";

const newsLetterScehma = new mongoose.Schema({
    email: { type: String, required: true, trim: true }
}, { timestamps: true })

const NewsLetter = mongoose.model("NewsLetter", newsLetterScehma);
export default NewsLetter;