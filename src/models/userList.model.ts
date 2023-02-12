import client from '../database';

export type user_list = {
  id?: Number;
  user_id: Number | String;
  movie_id: Number | String;
};

export class UserListModule {
  async index(): Promise<user_list[]> {
    try {
      const conn = await client.connect();
      const sql =
        'SELECT * FROM user_list INNER JOIN movies ON movies.id = user_list.user_id';
      const result = await conn.query(sql);
      conn.release();

      return result.rows;
    } catch (err) {
      console.log(err);
      throw new Error(`unable get users and movies: ${err}`);
    }
  }

  async show(id: string): Promise<user_list> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM user_list WHERE user_id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot get user list ${error}`);
    }
  }

  async create(l: user_list): Promise<user_list> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO user_list (user_id, movie_id) VALUES($1, $2) RETURNING *';
      const result = await conn.query(sql, [l.user_id, l.movie_id]);
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (error) {
      console.log(error);
      throw new Error(`Cannot create  ${error}`);
    }
  }

  async delete(id: string): Promise<user_list> {
    try {
      const conn = await client.connect();
      const sql = 'DELETE FROM user_list WHERE user_id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot delete ${id} : ${error}`);
    }
  }
  async delete2(id: string): Promise<user_list> {
    try {
      const conn = await client.connect();
      const sql = 'DELETE FROM user_list WHERE movie_id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot delete ${id} : ${error}`);
    }
  }
  async update(l: user_list): Promise<user_list[]> {
    try {
      const conn = await client.connect();
      const sql =
        'UPDATE user_list SET (user_id, movie_id) = ($1, $2) WHERE id =$3 RETURNING *';
      const result = await conn.query(sql, [l.user_id, l.movie_id, l.id]);
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (error) {
      throw new Error(`Cannot update  ${error}`);
    }
  }
}
