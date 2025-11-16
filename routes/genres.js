const Joi = require("joi");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
});

const Genre = mongoose.model("Genre", genreSchema);

async function getAllGenres() {
  return await Genre.find();
}

async function getGenre(id) {
  return await Genre.findById(id);
}

async function addGenre(name) {
  const genre = new Genre({
    name: name,
  });
  return await genre.save();
}

async function updateGenre(id, newName) {
  return await Genre.findByIdAndUpdate(
    id,
    {
      $set: {
        name: newName,
      },
    },
    { new: true }
  );
}

async function deleteGenre(id) {
  return await Genre.findByIdAndDelete(id);
}

router.get("/", (req, res) => {
  getAllGenres()
    .then((genres) => res.send(genres))
    .catch((err) => res.send(err.message));
});

router.get("/:id", (req, res) => {
  getGenre(req.params.id)
    .then((genre) => {
      if (!genre) return res.status(404).send("Genre not found");
      res.send(genre);
    })
    .catch((err) => res.send(err.message));
});

router.post("/", (req, res) => {
  const result = validateGenre(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  addGenre(req.body.name)
    .then((newGenre) => res.send(newGenre))
    .catch((err) => res.send(err.message));
});

router.put("/:id", (req, res) => {
  const result = validateGenre(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  updateGenre(req.params.id, req.body.name)
    .then((genre) => {
      if (!genre) return res.status(404).send("Genre not found");
      res.send(genre);
    })
    .catch((err) => res.send(err.message));
});

router.delete("/:id", (req, res) => {
  deleteGenre(req.params.id)
    .then((genre) => {
      if (!genre) return res.status(404).send("Genre not found");
      res.send(genre);
    })
    .catch((err) => res.send(err.message));
});

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(genre, schema);
}

module.exports = router;
