const Button = ({
  text,
  onClick,
  bgColor = "bg-sky-600",
  hoverBgColor = "hover:bg-sky-700",
  color = "text-white",
}) => {
  return (
    <button
      className={`${bgColor} ${color} ${hoverBgColor} rounded-md py-2 px-4 uppercase transition duration-100 ease-in`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
