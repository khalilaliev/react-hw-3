import "./style.css";
import Button from "../Button/Button";

const TodosListItem = ({ list = [], btns = [] }) => {
  return (
    <ul>
      {list.map((item, index) => (
        <li
          key={item.id}
          className=" flex justify-between items-center" //* className={item.priority ? "priority" : ""}
        >
          {index + 1}: {item.title}{" "}
          {btns.map((btn, index) => (
            <Button
              key={index}
              handleClick={() => btn.handleClick(item.id, btn.status)}
              title={btn.title}
            />
          ))}
        </li>
      ))}
    </ul>
  );
};

export default TodosListItem;
