import { MovieModel, Movie } from '../models/movies.model';
import express, { Request, Response } from 'express';
const model = new MovieModel();

const create = async (req: Request, res: Response) => {
  try {
    const m: Movie = {
      name: req.body.name,
      release_date: req.body.release_date,
    };
    const newMovie = await model.create(m);
    res.status(200).json({ message: 'created movie', newMovie });
  } catch (error) {
    res.status(400).json({ message: 'unable create movie', error });
  }
};

const index = async (req: Request, res: Response) => {
  try {
    const getAllMovie = await model.index();
    res.status(200).json({ message: 'all movie', getAllMovie });
  } catch (error) {
    res.status(400).json({ message: 'Error', error });
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id as string;
    const showMovie = await model.show(id);
    res.status(200).json({ message: 'movie', showMovie });
  } catch (error) {
    res.status(400).json({ message: 'Error', error });
  }
};

const deleteMovie = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    const delMovie = await model.delete(id);
    res.status(200).json({ message: 'movie is removed', delMovie });
  } catch (error) {
    res.status(400).json({ message: 'Error', error });
  }
};

const update = async (req: Request, res: Response) => {
  const m: Movie = {
    id: parseInt(req.params.id),
    name: req.body.name,
    release_date: req.body.release_date,
  };

  try {
    const updated = await model.update(m);
    res.status(200).json({ message: 'updated', updated });
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const movieRoutes = (app: express.Application) => {
  app.post('/movies', create);
  app.get('/movies', index);
  app.get('/movies/:id', show);
  app.delete('/movies/:id', deleteMovie);
  app.put('/movies/:id', update);
};

export default movieRoutes;
