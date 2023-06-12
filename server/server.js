const PORT = process.env.PORT || 8000
const express = require('express')
const { v4: uuidv4 } = require('uuid');
const cors = require('cors')
const app = express()
const pool = require('./db')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.use(cors());
app.use(express.json());

//get all todos
app.get('/todos/:userEmail', async (req, res) => {
  // if you have one param, you can write this way:
  // const userEmail = req.params.userEmail;
  // if you have more than one param, you can write this way:
  const { userEmail } = req.params;

  try {
    const todos = await pool.query('SELECT * FROM todos WHERE user_email = $1', [userEmail]);
    res.json(todos.rows)
  } catch (err) {
    console.error(err.message)
  }
})

// create a new todo
app.post('/todos', async (req, res) => {
  const { user_email, title, progress, date } = req.body;
  console.log("here are req.body params: ", user_email, title, progress, date);

  const id = uuidv4();

  try { 
    const newToDo = await pool.query(`INSERT INTO todos(id, user_email, title, progress, date) VALUES ($1, $2, $3, $4, $5)`, [id, user_email, title, progress, date]);
    res.json(newToDo);
  } catch(err) {
    console.log(err);
  }
})

// edit a todo
app.put('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { user_email, title, progress, date } = req.body;
  try {
    const editToDo = await pool.query(`UPDATE todos SET user_email = $1, title = $2, progress = $3, date = $4 WHERE id = $5`, [user_email, title, progress, date, id]);
    res.json(editToDo);
  } catch(err) {
    console.log(err);
  }
})

// delete a todo by id
app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleteToDo = await pool.query(`DELETE FROM todos WHERE id = $1`, [id]);
    res.json(deleteToDo);
  } catch(err) {
   console.log(err)
  }
});

// signup
app.post('/signup', async (req, res) => {
  console.log("I received a signup request")
  const { email, password } = req.body;
  console.log("email: ", email, "password: ", password)
  // hash the password
  const salt = bcrypt.genSaltSync(10);
  console.log("salt: ", salt)
  const hashedPassword = bcrypt.hashSync(password, salt);

  try {
    const signUp = await pool.query('INSERT INTO users (email, hashed_password) VALUES ($1, $2)', [email, hashedPassword]);

    // create a token
    const token = jwt.sign({ email }, 'secret', { expiresIn: '1h' });
    // send back
    res.json({email, token})

  } catch (err) {
    console.error(err)
    res.json({detail: err.detail})
  }
});

// login
app.post('/login', async (req, res) => {
  const { email, password} = req.body;
  try {

  } catch (err) {
    console.error(err.message)
  }
});

app.listen(PORT, () => `Server running on port ${PORT}`)