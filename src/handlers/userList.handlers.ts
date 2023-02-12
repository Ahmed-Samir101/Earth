import express, { Request, Response } from 'express';
import { user_list, UserListModule } from '../models/userList.model';
import auth from '../middleware/auth';

const list = new UserListModule();

const index = async (_req: Request, res: Response) => {
  try {
    const users = await list.index();
    res.json(users);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const user = await list.show(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const l: user_list = {
      user_id: req.body.user_id,
      movie_id: req.body.movie_id,
    };
    const newuser = await list.create(l);
    res.status(200).json(newuser);
  } catch (err) {
    console.log(err);
    res.status(400);
    res.json(err);
  }
};

const deleteUserList = async (req: Request, res: Response) => {
  try {
    const delUserList = await list.delete(req.params.id);
    res.json(delUserList);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const l: user_list = {
      id: parseInt(req.body.id),
      user_id: req.body.user_id,
      movie_id: req.body.movie_id,
    };
    const updateUserList = await list.update(l);
    res.json(updateUserList);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const userListRoutes = (app: express.Application) => {
  app.get('/users-list', auth,index);
  app.get('/users-list/:id',auth, show);
  app.post('/users-list', auth,create);
  app.delete('/users-list/:id', auth,deleteUserList);
  app.put('/users-list', auth,update);
};

export default userListRoutes;
