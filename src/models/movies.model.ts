import client from '../database'

export type Movie = {
    id?:Number,
    name:string,
    release_date:Date|String
}

export class MovieModel{
    async index():Promise<Movie[]> {
        try {
            const conn=await client.connect()
            const sql =`SELECT * from movies`
            const result=await conn.query(sql)
            conn.release()

            return result.rows
        } catch (error) {
            throw new Error(`Error ${error}`);
        }
        
    }

    async show(id:string):Promise<Movie> {
        try {
            const conn=await client.connect()
            const sql =`SELECT * from movies WHERE id=($1)`
            const result=await conn.query(sql,[id])
            conn.release()

            return result.rows[0]
        } catch (error) {
            throw new Error(`Error ${error}`);
        }
        
    }

    async create(m: Movie): Promise<Movie> {
       try {
          const conn = await client.connect()
          const sql = 'INSERT INTO movies (name,release_date) VALUES($1, $2) RETURNING *'
          const result = await conn.query(sql, [m.name,m.release_date])
          const movie = result.rows[0]
    
          conn.release()
    
          return movie
        } catch(err) {
          throw new Error(`unable create movie (${m.name}): ${err}`)
        } 
    }

    async delete(id:string):Promise<Movie> {
        try {
            const conn=await client.connect()
            const sql =`DELETE FROM movies WHERE id=($1) RETURNING *; `
            const result=await conn.query(sql,[id])
            conn.release()

            return result.rows[0]
        } catch (error) {
            throw new Error(`Error ${error}`);
        }
        
    }

    async update(m: Movie):Promise<Movie> {
        try {
            const conn=await client.connect()
            const sql =`UPDATE movies SET (name, release_date) = ($1, $2) WHERE id =$3 RETURNING *`
            const result=await conn.query(sql,[m.name,m.release_date,m.id])
            conn.release()

            return result.rows[0]
        } catch (error) {
            throw new Error(`Error ${error}`);
        }
        
    }
}