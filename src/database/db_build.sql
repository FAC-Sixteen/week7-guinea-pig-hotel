BEGIN;

  DROP TABLE IF EXISTS guinea_pigs, rooms, users
  CASCADE;

CREATE TABLE guinea_pigs
(
  guinea_id SERIAL PRIMARY KEY,
  guinea_name TEXT NOT NULL,
  guinea_colour TEXT NOT NULL,
  gender TEXT NOT NULL,
  here BIT NOT NULL,
  room_num INTEGER,
  room_service TEXT
);

CREATE TABLE rooms
(
  room_id SERIAL PRIMARY KEY,
  room_num INTEGER NOT NULL,
  guinea_id INTEGER,
  occupied BIT NOT NULL,
  CONSTRAINT guinea_id FOREIGN KEY (guinea_id) REFERENCES guinea_pigs (guinea_id)
);

CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    username TEXT,
    password TEXT
);

INSERT INTO guinea_pigs
  (guinea_name, guinea_colour, gender, here, room_num)
VALUES
  ('Fluffles', 'Ginger', 'F', '1', 101),
  ('Sparks', 'Brown', 'M', '1', 102),
  ('Spot', 'Black and white', 'M', '1', 205);


INSERT INTO rooms
  (
  room_num, occupied, guinea_id
  )
VALUES
  (101, '1', 1),
  (102, '1', 2),
  (103, '0', null),
  (104, '0', null),
  (105, '0', null),
  (201, '0', null),
  (202, '0', null),
  (203, '0', null),
  (204, '0', null),
  (205, '1', 3);

  INSERT INTO users
  (
  username, password
  )
VALUES
  ('testusername', '$2b$10$y2l5lzj0ZWVXDg7jDyBU9.EGW6NQ3zE17UjW.QCR3IdYR0nfF2ZUu');

COMMIT;