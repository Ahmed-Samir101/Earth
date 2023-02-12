/* Replace with your SQL commands */

CREATE TABLE user_list(id SERIAL PRIMARY KEY, user_id bigint REFERENCES users(id), movie_id bigint REFERENCES movies(id));
