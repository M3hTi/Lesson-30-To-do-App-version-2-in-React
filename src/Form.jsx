import { nanoid } from "nanoid";
import * as React from "react";

export function Form({ onAddToDo }) {
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
