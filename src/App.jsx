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
  return (
    <div className="container">
      <h1 className="title">Todo List</h1>
      <Form onAddToDo={handleTodo} />
      <List todos={todos} />
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

function List({ todos }) {
  return (
    <ul className="list">
      {todos.map((todo) => (
        <Todo todoObj={todo} key={todo.id} />
      ))}
    </ul>
  );
}

function Todo({ todoObj }) {
  const { description, date, isCompelete } = todoObj;

  return (
    <li className="todo-item">
      <span className="todo-description">{description}</span>
      <span className="todo-date">{date}</span>
      <span className="todo-status">{!isCompelete && "❌"}</span>
    </li>
  );
}

export default App;
