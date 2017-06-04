CREATE TABLE user(
  id INTEGER PRIMARY KEY,
  email TEXT,
  username TEXT,
  realname TEXT,
  is_deleted INTEGER,
  insert_datetime TEXT,
  update_datetime TEXT
);

CREATE TABLE backlog(
  id INTEGER PRIMARY KEY,
  title TEXT,
  importance INTEGER,
  stakeholders TEXT,
  is_deleted INTEGER,
  insert_datetime TEXT,
  update_datetime TEXT
);

CREATE TABLE sprint(
  id INTEGER PRIMARY KEY,
  goal TEXT,
  is_deleted INTEGER,
  insert_datetime TEXT,
  update_datetime TEXT
);

CREATE TABLE story(
  id INTEGER PRIMARY KEY,
  sprint_id INTEGER,
  title TEXT,
  importance INTEGER,
  how_to_demo TEXT,
  status TEXT,
  is_deleted INTEGER,
  insert_datetime TEXT,
  update_datetime TEXT
);

CREATE TABLE task(
  id INTEGER PRIMARY KEY,
  story_id INTEGER,
  title TEXT,
  importance INTEGER,
  estimated_cost INTEGER,
  actual_cost INTEGER,
  owner INTEGER,
  status TEXT,
  is_deleted INTEGER,
  insert_datetime TEXT,
  update_datetime TEXT
);
