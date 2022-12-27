import React from "react";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoList from "./index";

describe("<TodoList /> Component", () => {
  it("should correctly render todo component", () => {
    render(<TodoList />);

    const todoList = screen.getByTestId("todo-list-container");
    expect(todoList).toBeVisible();
  });

  it("should tell us if we don't have any todos", () => {
    render(<TodoList />);

    const todoList = screen.getByTestId("todo-list-container");
    expect(within(todoList).queryByText('No task available')).toBeInTheDocument()
  });

  it("should correctly render todo item", () => {
    const mockTodos = [
      {
        id: 1,
        title: 'Test stuff',
      }
    ]

    render(<TodoList todos={mockTodos} />);

    const todoList = screen.getByTestId("todo-list-container");
    expect(within(todoList).getByText('Test stuff')).toBeInTheDocument()
  });

  it("should correctly handle delete button on the task", async () => {
    const mockTodos = [
      {
        id: 1,
        title: 'Test stuff',
      }
    ]

    const mockFn = jest.fn()
    const user = userEvent.setup();

    render(<TodoList todos={mockTodos} onDeleteTodo={mockFn} />);

    const todoItem = screen.getByTestId("todo-item");
    const deleteButton = within(todoItem).getByText('Delete');
    expect(deleteButton).toBeVisible()

    user.click(deleteButton)

    await waitFor(() => {
      expect(mockFn).toBeCalled()
    })

    expect(mockFn).toBeCalledWith(expect.objectContaining({ id: 1 }))
  });
});
