import "./index.css";
import AddTodoToolbar from "../AddTodoToolbar";
import Button from "../Button";

const mockTodo = [
  {
    id: "443e8ca0-6713-013b-7e71-1cb6d0b7bed5",
    title: "Do an interview",
    description: "We have an interview on 2am",
    status: "COMPLETE",
  },
  {
    id: "9f8982d0-6714-013b-7e72-1cb6d0b7bed5",
    title: "Do Laundry",
    description: "Need to do laundry by today",
    status: "INCOMPLETE",
  },
];

/**
 * TODO List
 */
export default function TodoList() {
  return (
    <div className="todolist">
      <header>
        <h1 className="text-3xl font-semibold">TODO LIST</h1>
      </header>

      <AddTodoToolbar onAddTodo={() => console.log("called!")} />

      <ul className="mt-8">
        {mockTodo.map((todo) => {
          const { id, title } = todo;

          return (
            <li className="flex justify-between items-center py-2" key={id}>
              <article>
                <p className="font-semibold">{title}</p>
              </article>
              <Button variant="primary-outline" size="small">
                Delete
              </Button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
