const express = require('express');
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); // get access to req.body

//ROUTES

// CREATE a todo
app.post("/todos", async (req,res) => {
  try{
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING * ",
      [description]
    );

    res.json(newTodo.rows[0]);

  } catch (err){
    res.json(err.message);
  }
})

// get all todo
app.get("/todos", async (req,res) => {
  try {
    const allTodos = await pool.query(
      "SELECT * from todo"
    )
    res.json(allTodos.rows)
  } catch (error) {
    res.json(err.message);
  }
})

// get a todo
app.get("/todos/:id", async (req,res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1",[id])

    res.json(todo.rows);
  } catch (error) {
    res.json(err.message);
  }  
})

// update a todo
app.put("/todos/:id", async (req,res) => {
  try {
    const {id} = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2",[description,id]);
    res.json('Todo has been updated')
  } catch (error) {
    res.json(err.message);
  }
})

// delete a todo
app.delete("/todos/:id", async (req,res) => {
  try {
    const { id } = req.params;
    const removeTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1",[id]);
    res.json('Todo has been removed')
  } catch (error) {
    res.json(error.message)
  }
})



app.listen(5000, ()=>{
  console.log('server has started on port 5000');
})


// postgreSQL comands

// \l - list all database in postgresql
// \c - move inside a database
// \dt - show table in database

// CREATE DATABASE perntodo - create a database called perntodo
// CREATE TABLE todo(...) - create a table called todo 