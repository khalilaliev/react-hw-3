import TodoBox from "./TodosBox";
import useTodos from "../../hooks/useTodos";
import Form from "../Form/Form";

const Todos = () => {
  const {
    todosBlock,
    handleCreateTodo,
    handleSort,
    handleButtonClick,
    priority,
  } = useTodos();

  return (
    <>
      <div className="container max-w-fit">
        <button
          className=" my-5 p-2  bg-slate-300 hover:bg-slate-400 transition-all duration-200 rounded-xl m-1 "
          onClick={handleButtonClick}
        >
          Set priority
        </button>
        <div className=" flex gap-5 ">
          <Form addTodo={handleCreateTodo} />
          {todosBlock.map((item, index) => (
            <TodoBox
              key={index}
              title={item.title}
              list={item.list}
              btns={item.btns}
              handleSort={() => handleSort(item.title)}
              priority={priority}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Todos;
