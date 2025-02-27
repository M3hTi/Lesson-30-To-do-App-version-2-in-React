import { nanoid } from "nanoid";
import * as React from "react";

import "./App.css";

// const todos = [
//   {
//     id: nanoid(),
//     description: "make a dinner",
//     date: new Date(),
//     isCompelete: false,
//   },
//   {
//     id: nanoid(),
//     description: "wash dishes",
//     date: new Date(),
//     isCompelete: false,
//   },
// ];

function App() {
  const [todos, setTodos] = React.useState([]);

  function handleTodo(item) {
    setTodos((todos) => [...todos, item]);
  }

  function handleDeleteTodo(id) {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  }

  function handleToggleTodo(id){
    setTodos(todos => todos.map(todo => todo.id === id ? {...todo, isCompelete: !todo.isCompelete} : todo))
  }
  return (
    <div className="container">
      <h1 className="title">Todo List</h1>
      <Form onAddToDo={handleTodo} />
      <List todos={todos} onDeleteTodo={handleDeleteTodo} onToggle={handleToggleTodo} />
    </div>
  );
}

function Form({ onAddToDo }) {
  const [inputTerm, setInputTerm] = React.useState("");
  const [date, setDate] = React.useState(
    new Date().toISOString().split("T")[0]
  );

  function handleForm(e) {
    e.preventDefault();

    if (!inputTerm) return;

    const newTodo = {
      id: nanoid(),
      description: inputTerm,
      date: date,
      isCompelete: false,
    };
    onAddToDo(newTodo);
    setInputTerm("");
  }
  return (
    <form onSubmit={handleForm} className="form">
      <input
        type="text"
        value={inputTerm}
        onChange={(e) => setInputTerm(e.target.value)}
        placeholder="Add a new task..."
        className="input"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="input"
      />
      <button className="btn">ADD</button>
    </form>
  );
}

function List({ todos, onDeleteTodo, onToggle }) {
  return (
    <ul className="list">
      {todos.map((todo) => (
        <Todo todoObj={todo} key={todo.id} onDeleteTodo={onDeleteTodo} onToggle={onToggle} />
      ))}
    </ul>
  );
}

function Todo({ todoObj, onDeleteTodo, onToggle }) {
  const { id, description, date, isCompelete } = todoObj;
  return (
    <li className={`todo-item ${isCompelete ? 'line-through' : ''}`}>
      <span>
        <input type="checkbox" checked={isCompelete} onChange={() => onToggle(id)}/>
      </span>
      <span className="todo-description">{description}</span>
      <span className="todo-date">{date}</span>
      <span className="todo-status"  onClick={() => onDeleteTodo(id)}>
        {!isCompelete ? "❌" : '✅'}
      </span>
    </li>
  );
}

export default App;
