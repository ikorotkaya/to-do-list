  create database todo_app;

  create table todos (
    id VERCHAR(255) PRIMARY KEY,
    user_email VARCHAR(255),
    title VARCHAR(30),
    progress INT,
    date VARCHAR(300)
  );

  CREATE TABLE users (
    email VARCHAR(255) PRIMARY KEY,
    hashed_password VARCHAR(255)
  );

  Insert into todos(id, user_email, title, progress, date) values('0', 'irina@test.com', 'test', 0, '2021-01-01');