
DROP TABLE IF EXISTS randonnee;

CREATE TABLE randonnee (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nom TEXT NOT NULL,
  depart TEXT NOT NULL,
  description_ TEXT NOT NULL,
  score INTEGER NOT NULL,
  photo TEXT NOT NULL



);
CREATE TABLE utilisateur (
  idUser INTEGER PRIMARY KEY AUTOINCREMENT,
  identifiant INTEGER NOT NULL,
  password_ TEXT NOT NULL ,
  nouveau BOOLEAN 

);

INSERT INTO randonnee (nom,depart,description_,score,photo) VALUES ('Randonnee1', 'TGM','a7la re7la',3,'/images/hike_1.jpeg');
INSERT INTO randonnee (nom,depart,description_,score,photo) VALUES ('Randonnee2', 'BEB 3LIWA','a7la re7la',3,'/images/hike_1.jpeg');
INSERT INTO randonnee (nom,depart,description_,score,photo) VALUES ('Randonnee3', 'BEB 3LIWA','a7la re7la',3,'/images/hike_1.jpeg');

INSERT INTO utilisateur (identifiant,password_,nouveau) VALUES ('00123', 'hello',true);
