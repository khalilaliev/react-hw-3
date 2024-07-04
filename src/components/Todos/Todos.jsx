import TodoBox from "./TodosBox";
import useTodos from "../../hooks/useTodos";
import Form from "../Form/Form";

const Todos = () => {
  const { todosBlock, handleCreateTodos } = useTodos();
  return (
    <>
      <div className="container max-w-fit">
        <div className=" flex gap-5 mt-10">
          <Form addTodo={handleCreateTodos} />
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
