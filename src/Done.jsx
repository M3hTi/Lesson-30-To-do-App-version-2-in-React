import * as React from "react";

export function Done({ todos }) {
  const doneTodos = todos.filter((todo) => todo.isCompelete);
  return (
    <div className="done-section">
      <h2 className="done-title">Done tasks</h2>
      <ul className="done-list">
        {doneTodos.map((todo) => {
          const { id, description, date } = todo;
          return (
            <li key={id} className="done-item">
              <span className="todo-description">{description}</span>
              <span className="todo-date">{date}</span>
              <span className="todo-status">✅</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
