BEGIN;

  DROP TABLE IF EXISTS guinea_pigs, rooms
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

INSERT INTO guinea_pigs
  (guinea_name, guinea_colour, gender, here, room_num)
VALUES
  ('Fluffles', 'Ginger', 'F', '1', 101),
  ('Sparks', 'Brown', 'M', '1', 102),
  ('Spot', 'Black and white', 'M', '1', 205);


INSERT INTO rooms
  (
  room_num, occupied
  )
VALUES
  (101, '1'),
  (102, '1'),
  (103, '0'),
  (104, '0'),
  (105, '0'),
  (201, '0'),
  (202, '0'),
  (203, '0'),
  (204, '0'),
  (205, '1');

COMMIT;