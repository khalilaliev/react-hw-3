import { MdOutlineSort } from "react-icons/md";
import TodosListItem from "./TodosListItem";

const TodoBox = ({
  title = "",
  list = [],
  btns = [],
  handleSort,
  priority,
}) => {
  return (
    <>
      {list.length ? (
        <div className="todo_container border border-gray-500 border-opacity-50 rounded-xl p-4 ">
          <div className="  mb-3 flex justify-between items-center">
            <h2 className="todo_title text-xl">
              {title}: {list.length}
            </h2>
            <MdOutlineSort
              onClick={handleSort}
              className="text-2xl cursor-pointer"
            />
          </div>
          <ul className="todo_list">
            <TodosListItem list={list} btns={btns} priority={priority} />
          </ul>
        </div>
      ) : null}
    </>
  );
};

export default TodoBox;
