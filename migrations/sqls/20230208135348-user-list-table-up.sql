/* Replace with your SQL commands */


CREATE TABLE user-list(id SERIAL PRIMARY KEY, user_id REFRENCE users(id), movie_id REFERENCE movies(id));

