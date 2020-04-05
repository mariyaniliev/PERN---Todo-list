import React, { Fragment, useState } from 'react'

export default function EditTodo({todo}) {

  const [description, setDescription] = useState(todo.description)

  const updateDescription = async (id,description) => {
    // Update the selected todo description
    try {
      const body = { description }
      const response =  await fetch(`http://localhost:5000/todos/${id}`, {
        method:"PUT",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(body)
      });
      window.location = "/"

    } catch (error) {
      console.log(error.message)
    }
  }

  return <Fragment>
   <div className="container">
      <button 
        type="button" 
        className="btn btn-warning" 
        data-toggle="modal" 
        data-target={`#id${todo.todo_id}`}
      >
        Edit 
      </button>

      <div className="modal" id={`id${todo.todo_id}`}>
        <div className="modal-dialog">
          <div className="modal-content">
          
            <div className="modal-header">
              <h4 className="modal-title">Edit Todo</h4>
              <button type="button"  onClick={() => setDescription(todo.description)}  className="close" data-dismiss="modal">&times;</button>
            </div>
            
            <div className="modal-body">
              <input 
                type='text' 
                value={description} 
                onChange={ e => setDescription(e.target.value)} 
                className="form-control"
              />
            </div>

            <div className="modal-footer">
              <button 
                type="button" 
                onClick={() => updateDescription(todo.todo_id,description)} 
                className="btn btn-warning" 
                data-dismiss="modal"
              >
                Edit
              </button>
              
              <button 
                type="button" 
                onClick={() => setDescription(todo.description)} 
                className="btn btn-danger" 
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
            
          </div>
        </div>
      </div>
      
    </div>
  </Fragment>
}
