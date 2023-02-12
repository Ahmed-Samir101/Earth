import client from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();
const saltRound = process.env.SALT as string;

export type User = {
  id?: Number;
  email: string;
  password: string;
};

export let hash: string;

export class UserModel {
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * from users`;
      const result = await conn.query(sql);
      const users = result.rows;
      conn.release();
      return users;
    } catch (error) {
      throw new Error(`Error ${error}`);
    }
  }

  async show(email: string): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * from users WHERE email=($1)`;
      const result = await conn.query(sql, [email]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (error) {
      console.log(error);
      throw new Error(`Error ${error}`);
    }
  }

  async create(u: User): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = `INSERT INTO users (email,password) VALUES ($1,$2) RETURNING *`;
      hash = bcrypt.hashSync(u.password, parseInt(saltRound));
      const result = await conn.query(sql, [u.email, hash]);
      const user = result.rows[0];
      conn.release;
      return user;
    } catch (error) {
      throw new Error(`Error ${error}`);
    }
  }

  async authenticate(email: string, password: string): Promise<User | null> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM users WHERE email=($1)`;
      const result = await conn.query(sql, [email]);

      if (result.rows.length) {
        const user = result.rows[0];
        if (bcrypt.compareSync(password, user.password)) {
          return user;
        }
      }
      return null;
    } catch (error) {
      throw new Error(`Error ${error}`);
    }
  }
}
