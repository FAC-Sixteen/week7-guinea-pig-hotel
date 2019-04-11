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

INSERT INTO guinea_pigs
  (guinea_name, guinea_colour, gender, here, room_num)
VALUES
  ('Fluffles', 'Ginger', 'F', '1', 101),
  ('Sparks', 'Brown', 'M', '1', 102),
  ('Spot', 'Black and white', 'M', '1', 205);

COMMIT;