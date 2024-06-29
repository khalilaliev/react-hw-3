import TodoBox from "./TodosBox";
import useTodos from "../../hooks/useTodos";

const Todos = () => {
  const { todosBlock } = useTodos();
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
