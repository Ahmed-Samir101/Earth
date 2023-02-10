"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieModel = void 0;
const database_1 = __importDefault(require("../database"));
class MovieModel {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = `SELECT * from movies`;
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`Error ${error}`);
        }
    }
    async show(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = `SELECT * from movies WHERE id=($1)`;
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Error ${error}`);
        }
    }
    async create(m) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO movies (name,release_date) VALUES($1, $2) RETURNING *';
            const result = await conn.query(sql, [m.name, m.release_date]);
            const movie = result.rows[0];
            conn.release();
            return movie;
        }
        catch (err) {
            throw new Error(`unable create movie (${m.name}): ${err}`);
        }
    }
    async delete(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = `DELETE FROM movies WHERE id=($1) RETURNING *; `;
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Error ${error}`);
        }
    }
    async update(m) {
        try {
            const conn = await database_1.default.connect();
            const sql = `UPDATE movies SET (name, release_date) = ($1, $2)
        WHERE id =$3 RETURNING *`;
            const result = await conn.query(sql, [m.name, m.release_date, m.id]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Error ${error}`);
        }
    }
}
exports.MovieModel = MovieModel;
