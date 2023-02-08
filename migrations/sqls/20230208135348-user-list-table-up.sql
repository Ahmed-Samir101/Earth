/* Replace with your SQL commands */


CREATE TABLE user-list(id SERIAL PRIMARY KEY, user_id REFERENCE users(id), movie_id REFERENCE movies(id));

