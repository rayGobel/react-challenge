import "./index.css";
import Button from "../Button";

/**
 * TODO List
 */
export default function TodoList(props) {
  const { todos = [], onDeleteTodo } = props;

  const emptyTodos = todos.length === 0;

  const handleDeleteClick = (id) => {
    if (onDeleteTodo) {
      onDeleteTodo({ id });
    }
  };

  const todoList = todos.map((todo) => {
    const { id, title } = todo;

    return (
      <li
        className="flex justify-between items-center py-2"
        key={id}
        data-testid="todo-item"
      >
        <article>
          <p className="font-semibold">{title}</p>
        </article>
        <Button
          variant="primary-outline"
          size="small"
          onClick={() => handleDeleteClick(id)}
        >
          Delete
        </Button>
      </li>
    );
  });

  return (
    <div className="todolist" data-testid="todo-list-container">
      <ul className="mt-8">
        {emptyTodos ? <p>No task available</p> : todoList}
      </ul>
    </div>
  );
}
