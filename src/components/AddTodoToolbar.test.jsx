import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddTodoToolbar from "./AddTodoToolbar";

describe("<AddTodoToolbar /> Component", () => {
  it("should correctly render component", () => {
    render(<AddTodoToolbar />);

    const taskNameLabel = screen.getByLabelText("Task Name");
    expect(taskNameLabel).toBeVisible();

    const taskNameInput = screen.getByTestId("todo-input");
    expect(taskNameInput).toBeVisible();

    const taskAddBtn = screen.getByTestId("todo-add-btn");
    expect(taskAddBtn).toBeVisible();
  });

  it("should correctly handle on add todo event: Cook Dinner", async () => {
    const addTodoHandler = jest.fn();
    const user = userEvent.setup();

    render(<AddTodoToolbar onAddTodo={addTodoHandler} />);

    const taskNameInput = screen.getByTestId("todo-input");
    const taskAddBtn = screen.getByTestId("todo-add-btn");

    user.type(taskNameInput, "Cook Dinner");

    await waitFor(() => {
      expect(taskNameInput).toHaveValue('Cook Dinner')
    })

    user.click(taskAddBtn);

    await waitFor(() => {
      expect(addTodoHandler).toBeCalled();
    });

    expect(addTodoHandler).toBeCalledWith(
      expect.objectContaining({ todo: expect.stringMatching("Cook Dinner") })
    );
  });

  it("should correctly handle on add todo event Fix Motorcycle", async () => {
    const addTodoHandler = jest.fn();
    const user = userEvent.setup();

    render(<AddTodoToolbar onAddTodo={addTodoHandler} />);

    const taskNameInput = screen.getByTestId("todo-input");

    const taskAddBtn = screen.getByTestId("todo-add-btn");

    user.type(taskNameInput, "Fix Motorcycle");

    await waitFor(() => {
      expect(taskNameInput).toHaveValue('Fix Motorcycle')
    })

    user.click(taskAddBtn);

    await waitFor(() => {
      expect(addTodoHandler).toBeCalled();
    });

    expect(addTodoHandler).toBeCalledWith(
      expect.objectContaining({ todo: expect.stringMatching("Fix Motorcycle") })
    );
  });

  it('should have the add button disabled with empty todo', () => {
    render(<AddTodoToolbar />);
    const taskAddBtn = screen.getByTestId("todo-add-btn");
    expect(taskAddBtn).toBeDisabled()
  })

  it('should not call any handler, clicking disabled button', async () => {
    const addTodoHandler = jest.fn();
    const user = userEvent.setup();

    render(<AddTodoToolbar onAddTodo={addTodoHandler} />);

    const taskAddBtn = screen.getByTestId("todo-add-btn");

    expect(taskAddBtn).toBeDisabled()

    user.click(taskAddBtn)

    await waitFor(() => {
      expect(addTodoHandler).not.toBeCalled()
    })

    const taskNameInput = screen.getByTestId("todo-input");

    user.type(taskNameInput, 'something')

    await waitFor(() => {
      expect(taskAddBtn).not.toBeDisabled()
    })

    user.click(taskAddBtn)

    await waitFor(() => {
      expect(addTodoHandler).toBeCalled()
    })
  })
});
