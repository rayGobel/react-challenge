import AddTodoToolbar from "./components/AddTodoToolbar";
import TodoList from "./components/TodoList";
import useTodo from "./resources/useTodo";
import "./App.css";

function LoadingComponent() {
  return (
    <article>
      <p>Fetching Data...</p>
    </article>
  );
}

function ErrorToast(props) {
  const { error } = props;

  return (
    <article>
      <p>Error fetching data</p>
      <pre>{error || "--"}</pre>
    </article>
  );
}

export default function App() {
  const { isLoading, error, data, addTodo, deleteTodo } = useTodo();

  const handleAddTodo = ({ todo }) => {
    addTodo(todo);
  };

  const handleDeleteTodo = ({ id }) => {
    deleteTodo(id);
  };

  return (
    <div className="App">
      <div className="App-container">
        <header>
          <h1 className="text-3xl font-semibold">TODO LIST</h1>
        </header>

        <AddTodoToolbar onAddTodo={handleAddTodo} />

        {isLoading ? <LoadingComponent /> : null}

        {error ? <ErrorToast error={error} /> : null}

        <TodoList todos={data} onDeleteTodo={handleDeleteTodo} />
      </div>
    </div>
  );
}
