const PORT = process.env.PORT || 8000
const express = require('express')
const { v4: uuidv4 } = require('uuid');
const cors = require('cors')
const app = express()
const pool = require('./db')

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

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

app.listen(PORT, () => `Server running on port ${PORT}`)