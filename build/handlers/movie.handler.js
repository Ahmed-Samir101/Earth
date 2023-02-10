"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const movies_model_1 = require("../models/movies.model");
const model = new movies_model_1.MovieModel;
const create = async (req, res) => {
    try {
        const m = {
            name: req.body.name,
            release_date: req.body.release_date
        };
        const newMovie = await model.create(m);
        res.status(200).json({ message: "created movie", newMovie });
    }
    catch (error) {
        res.status(400).json({ message: "unable create movie", error });
    }
};
const index = async (req, res) => {
    try {
        const getAllMovie = await model.index();
        res.status(200).json({ message: "all movie", getAllMovie });
    }
    catch (error) {
        res.status(400).json({ message: "Error", error });
    }
};
const show = async (req, res) => {
    try {
        const id = req.params.id;
        const showMovie = await model.show(id);
        res.status(200).json({ message: "movie", showMovie });
    }
    catch (error) {
        res.status(400).json({ message: "Error", error });
    }
};
const deleteMovie = async (req, res) => {
    try {
        const id = req.body.id;
        const delMovie = await model.delete(id);
        res.status(200).json({ message: "movie is removed", delMovie });
    }
    catch (error) {
        res.status(400).json({ message: "Error", error });
    }
};
const update = async (req, res) => {
    const m = {
        id: parseInt(req.params.id),
        name: req.body.name,
        release_date: req.body.release_date,
    };
    try {
        const updated = await model.update(m);
        res.json({ message: "updated", updated });
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const movieRoutes = (app) => {
    app.post('/movies', create);
    app.get('/movies', index);
    app.get('/movies/:id', show);
    app.delete('/movies', deleteMovie);
    app.put("/movies/:id", update);
};
exports.default = movieRoutes;
