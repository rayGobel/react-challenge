import { useEffect } from "react";
import axios from "axios";
import { useQuery, useMutation } from "react-query";

function fetchTodos() {
  return axios.get("http://localhost:3001/tasks").then((res) => res.data);
}

function apiAddTodo(todo) {
  return axios.post("http://localhost:3001/tasks", { title: todo });
}

function apiDeleteTodo(todoId) {
  return axios.delete(`http://localhost:3001/tasks/${todoId}`);
}

function useTodo() {
  const {
    isLoading,
    error,
    data = [],
    refetch,
  } = useQuery("getTodos", fetchTodos);
  const { mutate: addTodo, isLoading: addTodoLoading } = useMutation((data) =>
    apiAddTodo(data)
  );

  const { mutate: deleteTodo, isLoading: deleteTodoLoading } = useMutation(
    (todoId) => apiDeleteTodo(todoId)
  );

  useEffect(() => {
    if (!addTodoLoading || !deleteTodoLoading) {
      refetch();
    }
  }, [addTodoLoading, deleteTodoLoading, refetch]);

  return {
    isLoading,
    error,
    data,
    addTodo,
    addTodoLoading,
    deleteTodo,
    deleteTodoLoading,
  };
}

export default useTodo;
