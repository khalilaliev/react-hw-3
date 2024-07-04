const Button = ({ title = "", handleClick }) => {
  return (
    <>
      <button
        className=" p-2  bg-slate-300 hover:bg-slate-400 transition-all duration-200 rounded-xl m-1 "
        onClick={handleClick}
      >
        {title}
      </button>
    </>
  );
};

export default Button;
