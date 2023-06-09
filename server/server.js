const PORT = process.env.PORT || 8000
const express = require('express')
const cors = require('cors')
const app = express()
const pool = require('./db')

app.use(cors());

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

app.listen(PORT, () => `Server running on port ${PORT}`)