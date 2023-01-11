CREATE DATABASE birdnest_monitron;

USE DATABASE birdnest_monitron;

CREATE TABLE IF NOT EXISTS pilots (
	id SERIAL PRIMARY KEY,
	name VARCHAR(20),
	lastName VARCHAR(20),
	email VARCHAR(200),
	phone VARCHAR(20),
	pilotId VARCHAR(70),
	lastSeen TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE closest_distance_recorded (
	id SERIAL PRIMARY KEY,
	lastSeen TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	distance NUMERIC(17, 11)
);
