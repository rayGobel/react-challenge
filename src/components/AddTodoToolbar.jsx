import React, { useState } from "react";
import Button from "./Button";

export default function AddTodoToolbar(props) {
  const { onAddTodo } = props;
  const [todo, setTodo] = useState("");

  const handleAddTodo = () => {
    if (onAddTodo) {
      onAddTodo({ todo });
    }
  };

  const disableAddTodoBtn = !todo;

  return (
    <article className="flex justify-center items-end gap-x-2">
      <label htmlFor="todo-input" className="flex flex-col items-start">
        <p className="text-sm">Task Name</p>
        <input
          id="todo-input"
          className="border-solid border border-stone-900 px-3 py-2"
          type="text"
          placeholder="task name"
          data-testid="todo-input"
          value={todo}
          onChange={(ev) => setTodo(ev.target.value)}
        />
      </label>
      <Button
        disabled={disableAddTodoBtn}
        onClick={handleAddTodo}
        dataTestid="todo-add-btn"
      >
        Add
      </Button>
    </article>
  );
}
