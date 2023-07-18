const Input = ({
  className,
  name,
  type = "text",
  placeholder,
  required = true,
  autoComplete = "off",
  onChange,
}) => {
  return (
    <input
      className={className}
      name={name}
      type={type}
      placeholder={placeholder}
      required={required}
      autoComplete={autoComplete}
      onChange={onChange}
    />
  );
};

export default Input;