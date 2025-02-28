import * as React from "react";
import { Todo } from "./Todo";

export function List({ todos, onDeleteTodo, onToggle }) {
  return (
    <ul className="list">
      <h2 className="tasks-title">Tasks:</h2>
      {todos.map((todo) => (
        <Todo
          todoObj={todo}
          key={todo.id}
          onDeleteTodo={onDeleteTodo}
          onToggle={onToggle}
        />
      ))}
    </ul>
  );
}
