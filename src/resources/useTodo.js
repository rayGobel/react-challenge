import axios from "axios";
import { useEffect } from "react";
import { useQuery, useMutation } from "react-query";

const BASE_URL = "http://localhost:3001";
const AXIOS_OPT = {
  timeout: 2000,
};

function fetchTodos() {
  return axios.get(`${BASE_URL}/tasks`, AXIOS_OPT).then((res) => res.data);
}

function apiAddTodo(todo) {
  return axios.post(`${BASE_URL}/tasks`, { title: todo }, AXIOS_OPT);
}

function apiDeleteTodo(todoId) {
  return axios.delete(`${BASE_URL}/tasks/${todoId}`);
}

function useTodo() {
  const {
    isLoading,
    error,
    data = [],
    refetch,
  } = useQuery("getTodos", fetchTodos);
  const { mutate: addTodo, isLoading: addTodoLoading } =
    useMutation(apiAddTodo);

  const { mutate: deleteTodo, isLoading: deleteTodoLoading } =
    useMutation(apiDeleteTodo);

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
