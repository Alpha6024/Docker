require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db/db");
const Note = require("./db/model");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get("/notes", async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});

app.post("/notes", async (req, res) => {
  const note = await Note.create({ text: req.body.text });
  res.json(note);
});

app.delete("/notes/:id", async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server Running on port", PORT);
});
