import express, { Request, Response } from 'express';
import { UserModel, User } from '../models/users.model';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const JWT_TOKEN = process.env.JWT_TOKEN as string;

const Model = new UserModel();

const create = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user: User = {
      email: email,
      password: password,
    };
    const users = await Model.show(email);
    if (users) {
      res.status(400).json({ message: 'email is used' });
    } else {
      const addUser = await Model.create(user);
      res.status(200).json({ message: 'Added user', addUser });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error', error });
  }
};

const index = async (req: Request, res: Response) => {
  try {
    const users = await Model.index();
    res.status(200).json({ message: 'all users', users });
  } catch (error) {
    res.status(400).json({ message: 'Error', error });
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const email = req.body.email as string;
    const user = await Model.show(email);
    res.status(200).json({ message: 'user', user });
  } catch (error) {
    res.status(400).json({ message: 'Error', error });
  }
};

const authenticate = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await Model.authenticate(email, password);
    if (user) {
      const token = jwt.sign({ id: user?.id }, JWT_TOKEN);
      res.status(200).json({ message: 'login', token });
    } else {
      res.status(400).json({ message: 'id or password uncorrect' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error', error });
  }
};

const userRoutes = (app: express.Application) => {
  app.post('/users', create);
  app.get('/users', index);
  app.get('/users/:id', show);
  app.post('/users/authenticate', authenticate);
};

export default userRoutes;
