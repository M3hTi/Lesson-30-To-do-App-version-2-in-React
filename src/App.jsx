import * as React from "react";

import "./App.css";
import { Form } from "./Form";
import { List } from "./List";
import { Done } from "./Done";

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

  function handleToggleTodo(id) {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompelete: !todo.isCompelete } : todo
      )
    );
  }
  return (
    <div className="container">
      <h1 className="title">Todo List</h1>
      <Form onAddToDo={handleTodo} />
      <List
        todos={todos}
        onDeleteTodo={handleDeleteTodo}
        onToggle={handleToggleTodo}
      />
      <Done todos={todos} />
    </div>
  );
}

export default App;
