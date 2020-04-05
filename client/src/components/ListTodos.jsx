import React, {Fragment, useEffect, useState} from 'react'
import Edit from './EditTodo';

export default function ListTodos() {
  const [ todos, setTodos ] = useState([])
  
  // Delete todo
  const deleteTodo = async id => {
    // Delete todo in DB
    try {
      const response =  await fetch(`http://localhost:5000/todos/${id}`, {
        method:"DELETE",
      });
      const removeTodo = todos.filter(todo=> todo.todo_id === id )
      setTodos( todos.filter(todo => todo.todo_id !== id))
    } catch (error) {
      console.log('error',error.message)
    }
  }
  
  const getTodos = async () => {
    // Get all todos from DB
    try {
      const response =  await fetch("http://localhost:5000/todos");
      const jsonData = await response.json();

      console.log('response',jsonData)
      setTodos(jsonData)
    } catch (error) {
      console.log('error',error.message)
    }
  }

  useEffect(() => {
    getTodos();
  },[])


  return <Fragment>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          { todos.map(todo => (
              <tr key={todo.todo_id}>
                <td>{todo.description}</td>
                <td><Edit todo={todo}/></td>
                <td><button onClick={() => deleteTodo(todo.todo_id)} className="btn btn-danger">Delete</button></td>
            </tr>))
          }
        </tbody>
      </table>
  </Fragment>
}
