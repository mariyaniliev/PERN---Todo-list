import React, {Fragment, useState} from 'react'

export default function InputTodo() {

  const [description, setDescription] = useState("")

  const onSubmitForm = async e => {
    // Add todo in DB
    e.preventDefault();
    try {
      const body = { description };
      const response =  await fetch("http://localhost:5000/todos", {
        method:"POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(body)
      });
      window.location = '/'
    } catch (error) {
      console.log('error',error.message)
    }
  }
  return (
    <Fragment>
      <h1 className="text-center mp-5">InputTodo</h1>
      <form onSubmit={onSubmitForm} className="d-flex mt-5">
        <input type="text" 
          className="form-control" 
          value={description} 
          onChange={ e => setDescription(e.target.value)}
        />
        <button type="submit" className="btn btn-success">Add</button>
      </form>
    </Fragment>
  )
}
