import React from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { render, screen, act, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useTodo from "./useTodo";

const queryClient = new QueryClient();

const UsageComponent = () => {
  const {
    data,
    addTodo,
    deleteTodo,
  } = useTodo();

  return (
    <article>
      <p>useTodo usage</p>

      {data.map((todo) => {
        return <p key={todo.id}>{todo.title}</p>;
      })}

      <button onClick={() => addTodo("New Todo")} data-testid="add-todo">
        Add Todo
      </button>

      <button onClick={() => deleteTodo(1)} data-testid="delete-todo">
        Delete Todo
      </button>
    </article>
  );
};

const SystemUnderTest = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <UsageComponent />
    </QueryClientProvider>
  );
};

describe("useTodo() Hook usage", () => {
  it("should correctly render test component with hook", async () => {
    render(<SystemUnderTest />);

    await act(() => {
      const title = screen.getByText("useTodo usage");
      expect(title).toBeVisible();
    });
  });

  it("should correctly render todo item", async () => {
    render(<SystemUnderTest />);

    await act(() => {
      const todoItem = screen.getByText("Test Todo");
      expect(todoItem).toBeVisible();
    });
  });

  it("should correctly handle posting new todo", async () => {
    const user = userEvent.setup();
    render(<SystemUnderTest />);

    const addTodoBtn = screen.getByTestId("add-todo");

    await act(() => {
      expect(addTodoBtn).toBeVisible();
    });

    user.click(addTodoBtn);

    await waitFor(() => {
      expect(addTodoBtn).toBeVisible();
    });
  });

  it("should correctly handle deleting todo", async () => {
    const user = userEvent.setup();
    render(<SystemUnderTest />);

    const deleteTodoBtn = screen.getByTestId("delete-todo");

    await waitFor(() => {
      expect(deleteTodoBtn).toBeVisible();
    });

    user.click(deleteTodoBtn)

    await waitFor(() => {
      expect(deleteTodoBtn).toBeVisible();
    });
  });
});
