CREATE TABLE `post` (
  `id`	TEXT,
  `title`	TEXT,
  `content`	TEXT,
  `author`	TEXT,
  `is_deleted`	TEXT,
  `insert_datetime`	TEXT,
  `update_datetime`	TEXT,
  PRIMARY KEY(`id`)
);

CREATE TABLE `comment` (
  `id`	TEXT,
  `content`	TEXT,
  `author`	TEXT,
  `post_id` TEXT,
  `is_deleted`	TEXT,
  `insert_datetime`	TEXT,
  `update_datetime`	TEXT,
  PRIMARY KEY(`id`)
);

CREATE TABLE `user` (
  `id`	TEXT,
  `nick_name`	TEXT,
  `real_name`	TEXT,
  `is_deleted`	TEXT,
  `insert_datetime`	TEXT,
  `update_datetime`	TEXT,
  PRIMARY KEY(`id`)
);
