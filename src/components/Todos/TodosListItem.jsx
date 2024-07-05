import "./style.css";
import Button from "../Button/Button";

const TodosListItem = ({ list = [], btns = [], priority }) => {
  return (
    <ul>
      {list.map((item, index) => (
        <li
          key={item.id}
          // className={item.priority ? "priority" : ""}
          className={`flex justify-between items-center ${
            priority && item.priority ? "priority" : ""
          }`}
        >
          {index + 1}. {item.title}{" "}
          {btns.map((btn) => (
            <Button
              key={item.id + btn.title}
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
