const ButtonDelete = ({
    text,
    onClick,
    bgColor = "bg-red-500",
    hoverBgColor = "hover:bg-red-700",
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
  
  export default ButtonDelete;
  