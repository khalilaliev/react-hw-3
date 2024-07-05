import { useEffect, useState } from "react";
import service from "../services/mock-service-api";
import { status, title } from "../constants/constants";

export const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [todosTodo, setTodosTodo] = useState([]);
  const [todosProgress, setTodosProgress] = useState([]);
  const [todosDone, setTodosDone] = useState([]);
  const [isSorted, setIsSorted] = useState({});
  const [priority, setPriority] = useState(false);

  const handleButtonClick = () => {
    console.log("clicked");
    setPriority((prevState) => !prevState);
  };

  const getTodos = async () => {
    try {
      const res = await service.get();
      setTodos(res);
    } catch (e) {
      console.error(e.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  useEffect(() => {
    setTodosTodo(todos.filter((item) => item.status === status.TODO));
    setTodosProgress(todos.filter((item) => item.status === status.PROGRESS));
    setTodosDone(todos.filter((item) => item.status === status.DONE));
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

  const handleSort = (status) => {
    setIsSorted((prevState) => ({
      ...prevState,
      [status]: !prevState[status],
    }));

    switch (status) {
      case title.TODO:
        setTodosTodo((prevList) =>
          [...prevList].sort((a, b) =>
            isSorted[status] ? b.priority - a.priority : a.priority - b.priority
          )
        );
        break;
      case title.PROGRESS:
        setTodosProgress((prevList) =>
          [...prevList].sort((a, b) =>
            isSorted[status] ? b.priority - a.priority : a.priority - b.priority
          )
        );
        break;
      case title.DONE:
        setTodosDone((prevList) =>
          [...prevList].sort((a, b) =>
            isSorted[status] ? b.priority - a.priority : a.priority - b.priority
          )
        );
        break;
      default:
        break;
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

  return {
    todosBlock,
    handleCreateTodo,
    handleSort,
    isSorted,
    handleButtonClick,
    priority,
  };
};

export default useTodos;
