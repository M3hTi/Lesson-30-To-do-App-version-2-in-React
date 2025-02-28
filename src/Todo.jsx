import * as React from "react";

export function Todo({ todoObj, onDeleteTodo, onToggle }) {
  const { id, description, date, isCompelete } = todoObj;
  return (
    <li className={`todo-item ${isCompelete ? "line-through" : ""}`}>
      <span>
        <input
          type="checkbox"
          value={isCompelete}
          onChange={() => onToggle(id)}
        />
      </span>
      <span className="todo-description">{description}</span>
      <span className="todo-date">{date}</span>
      <span className="todo-status" onClick={() => onDeleteTodo(id)}>
        {!isCompelete ? "❌" : "✅"}
      </span>
    </li>
  );
}
