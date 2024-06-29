import TodosListItem from "./TodosListItem";

const TodoBox = ({ title = "", list = [], btns = [] }) => {
  return (
    <>
      {list.length ? (
        <div className="todo_container border border-gray-500 border-opacity-50 rounded-xl p-4 ">
          <h2 className="todo_title text-xl mb-2">
            {title}: {list.length}
          </h2>
          <ul className="todo_list">
            <TodosListItem list={list} btns={btns} />
          </ul>
        </div>
      ) : null}
    </>
  );
};

export default TodoBox;
