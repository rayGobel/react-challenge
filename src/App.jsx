import AddTodoToolbar from "./components/AddTodoToolbar";
import TodoList from "./components/TodoList";
import useTodo from "./resources/useTodo";
import "./App.css";

function LoadingComponent() {
  return (
    <article className="px-4 py-4">
      <p className="italic text-stone-400 font-semibold">Fetching Data...</p>
    </article>
  );
}

function ErrorToast(props) {
  const { error } = props;

  return (
    <article className="px-4 py-4">
      <p className="text-red-500 font-semibold">Error fetching data</p>
      <pre className="italic">{error.message || "--"}</pre>
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

  const canRenderTodoList = !isLoading && data && !error;

  return (
    <div className="App">
      <div className="App-container">
        <header>
          <h1 className="text-3xl font-semibold">TODO LIST</h1>
        </header>

        <AddTodoToolbar onAddTodo={handleAddTodo} />

        {error ? <ErrorToast error={error} /> : null}

        {isLoading ? <LoadingComponent /> : null}

        {canRenderTodoList ? (
          <TodoList todos={data} onDeleteTodo={handleDeleteTodo} />
        ) : null}
      </div>
    </div>
  );
}
