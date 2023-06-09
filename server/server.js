const PORT = process.env.PORT || 8000
const express = require('express')
const app = express()
const pool = require('./db')

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//get all todos
app.get('/todos', async (req, res) => {
  const userEmail = 'irina@test.com'

  try {
    const todos = await pool.query('SELECT * FROM todos WHERE user_email = $1', [userEmail]);
    res.json(todos.rows)
  } catch (err) {
    console.error(err.message)
  }
})

app.listen(PORT, () => `Server running on port ${PORT}`)