import React from "react";
import { useState } from "react";

const TodoApp = () => {
  const [todos, setTodos] = useState([]); //printing the todos dynamically when user cretes todo
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

//   function to create todo
const addTodo=()=>{
    if(input.trim()){
        setTodos([...todos,{id:Date.now(),text:input,done:false}])
        setInput("")
    }
}

//   function to remove todo
const removeTodo=(id)=>{
    setTodos(todos.filter(todo=>todo.id!==id))
}

//   function to toggle todo
const toggleTodo=(id)=>{
    setTodos(todos.map(todo=>todo.id===id?{...todo,done:!todo.done}:todo))
}

//   function to edit todo
const startEdit=(id,text)=>{
    setEditId(id)
    setEditText(text)
}

//   function to save-edit todo
const saveEdit=(id)=>{
    setTodos(todos.map(todo=>todo.id===id?{...todo,text:editText}:todo))
    setEditId(null)
    setEditId("")
}

  return (
    <div>
        <h1 className="text-white text-center m-4" style={{fontFamily:"Roboto,sans-serif",fontWeight:"700"}}>Todo App</h1>
        <div className="container border border-warning rounded-3 w-25 p-2 text-center position-absolute top-50 start-50 translate-middle bg-dark">
            <div className="d-flex p-3">
                {/* input start */}
                <input
                className="form-control border border-success"
                type="text"
                value={input}
                placeholder="Enter Todo....."
                onChange={(e)=>setInput(e.target.value)}
                />
                {/* input end */}

                {/* add button start */}
                <button className="btn btn-success mx-3" onClick={(()=>{addTodo()})}>
                addtodo
                </button>
                {/* add button end */}
            </div>

            {/* Todo list items start */}
            <div className="">
                {todos.map((todo) => (
                <li key={todo.id} className="list-group-item p-1">
                    {/* editing the text */}
                    {
                        editId===todo.id?(
                            <input
                            className="form-control border border-danger"
                            type="text"
                            value={editText}
                            placeholder="Enter Todo....."
                            onChange={(e)=>setEditText(e.target.value)}
                            style={{ width: "170px", display: "inline-block", padding: "5px", fontSize: "14px" }}
                            />
                        ):(
                            <span className={todo.done?"text-decoration-line-through text-secondary":"text-white"}>{todo.text}</span>
                        )
                    }
                    {/* buttons */}
                    {
                        editId===todo.id?(
                                <button className="btn btn-success m-2" onClick={()=>saveEdit(todo.id)}>save</button>
                        ):(
                            <>
                                <button className="btn btn-primary mx-2" onClick={()=>startEdit(todo.id,todo.text)}>Edit</button>
                                <button className={`btn ${todo.done ? "btn-warning" : "btn-secondary"} mx-2`} onClick={()=>toggleTodo(todo.id)}>
                                    {todo.done ? "Undo" : "Done"}
                                </button>
                            </>
                        )
                    }
                    <button className="btn btn-danger mx-2" onClick={()=>removeTodo(todo.id)}>Delete</button>
                </li>
                ))}
            </div>
            {/* Todo list items end */}
        </div>
    </div>
    
  );
};

export default TodoApp;