import { useEffect, useState } from "react";
import { status, title } from "../../constants/constants";
import TodoBox from "./TodosBox";
import service from "../../services/mock-service-api";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [todosTodo, setTodosTodo] = useState([]);
  const [todosProgress, setTodosProgress] = useState([]);
  const [todosDone, setTodosDone] = useState([]);

  const getTodos = async () => {
    const res = await service.get();
    setTodos(res);
  };

  useEffect(() => {
    getTodos();
  }, []);

  useEffect(() => {
    setTodosTodo(todos.filter((item) => item.status === status.TODO));
  }, [todos]);

  useEffect(() => {
    setTodosProgress(todos.filter((item) => item.status === status.PROGRESS));
  }, [todos]);

  useEffect(() => {
    setTodosDone(todos.filter((item) => item.status === status.DONE));
  }, [todos]);

  const handleItemStatus = async (id, status) => {
    try {
      const res = await service.put(id, { status });
      setTodos((prevState) =>
        prevState.map((item) => {
          if (item.id === res.id) {
            return { ...item, status };
          }
          return item;
        })
      );
    } catch (e) {
      console.error(e.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await service.delete(id);
      getTodos();
      // setTodos((prevState) => prevState.filter((item) => item.id !== id));
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
        // {
        //   title: title.ARCHIVE,
        //   handleClick: handleDelete,
        // },
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
  return (
    <>
      <div className="container max-w-fit">
        <div className=" flex gap-10 mt-10">
          {todosBlock.map((item, index) => (
            <TodoBox
              key={index}
              title={item.title}
              list={item.list}
              btns={item.btns}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Todos;
