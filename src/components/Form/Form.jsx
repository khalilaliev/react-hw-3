import { useState } from "react";
import Button from "../Button/Button";
import { status } from "../../constants/constants";

const Form = ({ addTodo }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) {
      addTodo({
        id: Math.floor(Math.random() * 10000),
        title: value,
        status: status.TODO,
        priority: false,
      });
      setValue("");
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <form
        className="p-4 text-center border border-gray-500 border-opacity-50 rounded-xl"
        onSubmit={handleSubmit}
      >
        <input
          className=" focus:outline-none m-2 border border-gray-500 border-opacity-50 p-2 rounded-lg"
          type="text"
          value={value}
          placeholder="Create a todo"
          onChange={handleChange}
        />
        <Button title="Create" />
      </form>
    </>
  );
};

export default Form;
