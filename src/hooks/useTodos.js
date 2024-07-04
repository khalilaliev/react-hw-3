import { useEffect, useState } from "react";
import service from "../services/mock-service-api";
import { STORAGE_KEY, status, title } from "../constants/constants";

export const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [todosTodo, setTodosTodo] = useState([]);
  const [todosProgress, setTodosProgress] = useState([]);
  const [todosDone, setTodosDone] = useState([]);
  const [loading, setLoading] = useState(true);

  const saveTodosToLocalStorage = (todos) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  };

  const loadTodosFromLocalStorage = () => {
    const storedTodos = localStorage.getItem(STORAGE_KEY);
    return storedTodos ? JSON.parse(storedTodos) : [];
  };

  const getTodos = async () => {
    try {
      const res = await service.get();
      setTodos(res);
      saveTodosToLocalStorage(res);
    } catch (e) {
      console.error(e.message);
    }
  };

  useEffect(() => {
    const localTodos = loadTodosFromLocalStorage();
    if (localTodos.length) {
      setTodos(localTodos);
      setLoading(false);
    } else {
      getTodos().finally(() => setLoading(false));
    }
  }, []);

  useEffect(() => {
    setTodosTodo(todos.filter((item) => item.status === status.TODO));
    setTodosProgress(todos.filter((item) => item.status === status.PROGRESS));
    setTodosDone(todos.filter((item) => item.status === status.DONE));
    saveTodosToLocalStorage(todos);
  }, [todos]);

  const handleItemStatus = async (id, newStatus) => {
    try {
      const res = await service.put(id, { status: newStatus });
      setTodos((prevState) =>
        prevState.map((item) =>
          item.id === res.id ? { ...item, status: newStatus } : item
        )
      );
    } catch (e) {
      console.error(e.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await service.delete(id);
      setTodos((prevState) => prevState.filter((item) => item.id !== id));
    } catch (e) {
      console.error(e.message);
    }
  };

  const handleCreateTodo = async (newTodo) => {
    try {
      const res = await service.post(newTodo);
      setTodos((prevState) => [...prevState, res]);
    } catch (e) {
      console.error(e.message);
    }
  };

  const todosBlock = [
    {
      title: title.TODO,
      list: todosTodo,
      btns: [
        {
          title: title.PROGRESS,
          status: status.PROGRESS,
          handleClick: handleItemStatus,
        },
      ],
    },
    {
      title: title.PROGRESS,
      list: todosProgress,
      btns: [
        {
          title: title.TODO,
          status: status.TODO,
          handleClick: handleItemStatus,
        },
        {
          title: title.DONE,
          status: status.DONE,
          handleClick: handleItemStatus,
        },
      ],
    },
    {
      title: title.DONE,
      list: todosDone,
      btns: [
        {
          title: title.ARCHIVE,
          handleClick: handleDelete,
        },
      ],
    },
  ];

  return { todosBlock, handleCreateTodo, loading };
};

export default useTodos;
